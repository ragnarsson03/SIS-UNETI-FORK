import "reflect-metadata"; 
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { DataSource } from 'typeorm'; // Importado para el seeder
import { AppModule } from './src/app.module.js';
import { runSeeder } from './src/database/seeds/usuarios_seeder.js'; // Importación del seeder
import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import * as dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT || 3000;

  // --- EJECUCIÓN DEL SEEDER DE USUARIOS ---
  const dataSource = app.get(DataSource);
  await runSeeder(dataSource); // Llama al proceso de carga inicial

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('SIS-UNETI API')
    .setDescription('Documentación de la API del Sistema de Gestión UNETI')
    .setVersion('1.0')
    .addTag('auth')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  // Configuración de Microservicios (Redis)
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.REDIS,
    options: {
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT || '6379'),
      retryAttempts: 5,
      retryDelay: 3000,
    },
  });

  await app.startAllMicroservices();

  // Integración con Vite para el Frontend
  const expressApp = app.getHttpAdapter().getInstance();
  
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      root: path.join(__dirname, '../sis-uneti-frontend'),
      appType: 'spa',
    });
    expressApp.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'sis-uneti-frontend/dist');
    expressApp.use(express.static(distPath));
    expressApp.get('*', (req: express.Request, res: express.Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  await app.listen(PORT, '0.0.0.0');
  console.log(`Application is running on: http://localhost:${PORT}`);
  console.log(`Swagger documentation: http://localhost:${PORT}/api/docs`);
}

bootstrap().catch((err) => {
  console.error('Error starting application:', err);
});