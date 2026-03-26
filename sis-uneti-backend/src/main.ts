import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module.js'; // Verifica que la extensión coincida (.js)
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Main');
  const app = await NestFactory.create(AppModule);

  // Configuración del Microservicio (Escucha a Redis)
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.REDIS,
    options: {
      host: 'localhost',
      port: 6379,
    },
  });

  app.setGlobalPrefix('api');
  app.enableCors(); // Permite que React se comunique sin bloqueos

  await app.startAllMicroservices();
  await app.listen(3000);
  
  logger.log('🚀 Gateway HTTP corriendo en: http://localhost:3000/api');
  logger.log('📡 Microservicio Auth conectado a Redis y listo.');
}
bootstrap();