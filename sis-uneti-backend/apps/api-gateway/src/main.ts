import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Validación global de DTOs
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  // 🛡️ Habilitar CORS para peticiones desde el Frontend
  app.enableCors({
    origin: '*', // Permitir llamadas desde localhost:5173 / localhost:5174 (Vite)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`🚀 API Gateway corriendo en puerto: ${port}`);
}
bootstrap();
