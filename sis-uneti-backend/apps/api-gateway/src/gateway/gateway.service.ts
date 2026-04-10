import { Injectable, Logger, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class GatewayService {
  private readonly logger = new Logger(GatewayService.name);

  constructor(
    @Inject('ADMIN_SERVICE') private readonly adminClient: ClientProxy,
  ) {}

  /**
   * Envía un comando al microservicio de administración vía Redis
   * @param pattern - Patrón del comando (ej: 'admin.crear-coordinador')
   * @param data - Datos a enviar
   */
  async enviarComando(pattern: string, data: any): Promise<any> {
    this.logger.log(`📤 Enviando comando a Redis: ${pattern}`);
    try {
      const response = await lastValueFrom(this.adminClient.send(pattern, data));
      return response;
    } catch (error: any) {
      this.logger.error(`❌ Error en comando ${pattern}:`, error);
      
      // Si el microservicio envió un HttpException serializado (status + message)
      if (error && error.status) {
        throw new HttpException(
          error.response || error.message || 'Error en el microservicio', 
          error.status
        );
      }
      
      // Si es un error desconocido
      throw new HttpException(
        'Error interno en la comunicación de microservicios',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}