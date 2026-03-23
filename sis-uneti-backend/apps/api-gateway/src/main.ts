import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // 🛡️ Habilitar CORS para permitir peticiones desde el Frontend / Navegadores de forma segura.
  app.enableCors({
    origin: '*', // Permitir llamadas desde localhost:5173 / localhost:5174 (Vite)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // El API Gateway escucha en el puerto 3000 
  await app.listen(3000);
}
bootstrap();
