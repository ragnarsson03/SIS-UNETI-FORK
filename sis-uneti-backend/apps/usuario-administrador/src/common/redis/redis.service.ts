import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import Redis from 'ioredis';

/**
 * Servicio de Redis para comunicación entre microservicios
 * 
 * Este servicio actúa como:
 * - Message Broker: Publica y suscribe mensajes entre servicios
 * - Cache: Almacenamiento temporal (opcional)
 * 
 * Patrón: Pub/Sub para comunicación asíncrona
 */
@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
private readonly logger = new Logger(RedisService.name);
private publisher: Redis;
private subscriber: Redis;

async onModuleInit() {
    const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';
    
    this.publisher = new Redis(redisUrl);
    this.subscriber = new Redis(redisUrl);
    
    this.logger.log(`✅ Conectado a Redis: ${redisUrl}`);
}

async onModuleDestroy() {
    await this.publisher.quit();
    await this.subscriber.quit();
    this.logger.log('🔌 Desconectado de Redis');
}

/**
 * Publica un mensaje en un canal de Redis
 * @param channel - Canal donde publicar (ej: 'admin.crear-usuario')
 * @param message - Mensaje a enviar (será stringificado automáticamente)
 */
async publish(channel: string, message: any): Promise<void> {
    const serialized = typeof message === 'string' ? message : JSON.stringify(message);
    await this.publisher.publish(channel, serialized);
    this.logger.debug(`📤 Mensaje publicado en ${channel}`);
}

/**
 * Suscribe a un canal y ejecuta callback por cada mensaje
 * @param channel - Canal a suscribir
 * @param callback - Función a ejecutar al recibir mensaje
 */
async subscribe(channel: string, callback: (message: any) => void): Promise<void> {
    await this.subscriber.subscribe(channel);
    
    this.subscriber.on('message', (receivedChannel, message) => {
    if (receivedChannel === channel) {
        try {
        const parsed = JSON.parse(message);
        callback(parsed);
        } catch {
        callback(message);
        }
    }
    });
    
    this.logger.log(`📥 Suscrito al canal: ${channel}`);
}

/**
 * Envía una respuesta a un canal específico (patrón request-reply)
 * @param replyTo - Canal de respuesta
 * @param message - Mensaje de respuesta
 */
async reply(replyTo: string, message: any): Promise<void> {
    await this.publish(replyTo, message);
}

/**
 * Obtiene un valor del caché
 * @param key - Clave del caché
 */
async get(key: string): Promise<string | null> {
    return this.publisher.get(key);
}

/**
 * Almacena un valor en caché con expiración
 * @param key - Clave del caché
 * @param value - Valor a almacenar
 * @param ttl - Tiempo de vida en segundos (opcional)
 */
async set(key: string, value: string, ttl?: number): Promise<void> {
    if (ttl) {
    await this.publisher.setex(key, ttl, value);
    } else {
    await this.publisher.set(key, value);
    }
}
}