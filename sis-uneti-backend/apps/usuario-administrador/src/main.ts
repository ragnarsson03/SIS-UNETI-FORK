import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  // Servidor HTTP (opcional, para pruebas directas)
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT || 3002);
  console.log(`🚀 HTTP corriendo en puerto ${process.env.PORT || 3002}`);

  // Microservicio Redis (para comunicación con Gateway)
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.REDIS,
    options: {
      host: process.env.REDIS_HOST || 'redis',
      port: 6379,
    },
  });
  await app.startAllMicroservices();
  console.log('📡 Microservicio Redis escuchando');
}
bootstrap();