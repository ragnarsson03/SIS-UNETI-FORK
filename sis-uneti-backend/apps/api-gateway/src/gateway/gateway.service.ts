import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { RedisService } from 'apps/usuario-administrador/src/common/redis/redis.service';
import { v4 as uuidv4 } from 'uuid';

/**
 * Servicio del API Gateway que maneja la comunicación con microservicios vía Redis
 * 
 * Patrón: Request-Reply con Redis
 * 
 * Flujo:
 * 1. Gateway recibe request HTTP
 * 2. Genera un ID único y un canal de respuesta
 * 3. Publica mensaje en Redis con el comando y el canal de respuesta
 * 4. Espera respuesta del microservicio
 * 5. Responde al cliente HTTP
 */
@Injectable()
export class GatewayService {
private readonly logger = new Logger(GatewayService.name);
private readonly TIMEOUT_MS = 30000; // 30 segundos de timeout
private respuestasPendientes: Map<string, { resolve: Function; reject: Function; timeout: NodeJS.Timeout }> = new Map();

constructor(private readonly redisService: RedisService) {
    // Suscribirse al canal de respuestas global
    this.redisService.subscribe('gateway.respuestas', (message) => {
    const { id, error, data } = message;
    const pending = this.respuestasPendientes.get(id);
    
    if (pending) {
        clearTimeout(pending.timeout);
        this.respuestasPendientes.delete(id);
        
        if (error) {
        pending.reject(new Error(error));
        } else {
        pending.resolve(data);
        }
    }
    });
}

/**
 * Envía un comando a un microservicio vía Redis
 * @param comando - Nombre del comando (ej: 'admin.crear-coordinador')
 * @param payload - Datos del comando
 * @returns Respuesta del microservicio
 */
async enviarComando(comando: string, payload: any): Promise<any> {
    const id = uuidv4();
    const replyTo = `gateway.respuestas`;
    
    this.logger.debug(`📤 Enviando comando: ${comando}, id: ${id}`);

    // Crear promesa que se resolverá cuando llegue la respuesta
    const respuestaPromise = new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
        this.respuestasPendientes.delete(id);
        reject(new BadRequestException(`Timeout: El microservicio no respondió en ${this.TIMEOUT_MS}ms`));
    }, this.TIMEOUT_MS);

    this.respuestasPendientes.set(id, { resolve, reject, timeout });
    });

    // Publicar mensaje en Redis
    await this.redisService.publish(comando, {
    id,
    replyTo,
    payload,
    timestamp: new Date().toISOString(),
    });

    this.logger.debug(`📨 Esperando respuesta para comando: ${comando}, id: ${id}`);

    return respuestaPromise;
}
}