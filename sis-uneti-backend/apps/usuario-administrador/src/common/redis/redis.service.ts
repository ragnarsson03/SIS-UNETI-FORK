import { Injectable, Logger, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(RedisService.name);
  private publisher: Redis | null = null;
  private subscriber: Redis | null = null;

  async onModuleInit() {
    const redisUrl = process.env.REDIS_URL || 'redis://redis:6379';
    
    this.publisher = new Redis(redisUrl);
    this.subscriber = new Redis(redisUrl);
    
    this.logger.log(`✅ Conectado a Redis: ${redisUrl}`);
  }

  async onModuleDestroy() {
    if (this.publisher) {
      await this.publisher.quit();
    }
    if (this.subscriber) {
      await this.subscriber.quit();
    }
    this.logger.log('🔌 Desconectado de Redis');
  }

  async publish(channel: string, message: any): Promise<void> {
    if (!this.publisher) {
      this.logger.warn('⚠️ Redis no disponible, no se pudo publicar');
      return;
    }
    const serialized = typeof message === 'string' ? message : JSON.stringify(message);
    await this.publisher.publish(channel, serialized);
    this.logger.debug(`📤 Mensaje publicado en ${channel}`);
  }

  async subscribe(channel: string, callback: (message: any) => void): Promise<void> {
    if (!this.subscriber) {
      this.logger.warn('⚠️ Redis no disponible, no se pudo suscribir');
      return;
    }
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

  async reply(replyTo: string, message: any): Promise<void> {
    await this.publish(replyTo, message);
  }
}