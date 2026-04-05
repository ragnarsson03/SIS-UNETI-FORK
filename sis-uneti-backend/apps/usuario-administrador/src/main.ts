import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { RedisService } from '@app/common/common/redis/redis.service';
import { AdminService } from './admin/admin.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  // Puerto para healthcheck (no necesario para el microservicio puro)
  const port = process.env.PORT || 3002;
  await app.listen(port);

  console.log(`🚀 Admin Microservicio corriendo en puerto: ${port}`);

  // Obtener servicios del contenedor DI de NestJS
  const redisService = app.get(RedisService);
  const adminService = app.get(AdminService);

  // ── Suscribirse a comandos de administración ──────────────────────────────

  await redisService.subscribe('admin.crear-administrador', async (message) => {
    const { id, replyTo, payload } = message;
    try {
      const resultado = await adminService.crearAdministrador(payload);
      await redisService.publish(replyTo, { id, data: resultado });
    } catch (error) {
      await redisService.publish(replyTo, { id, error: error.message });
    }
  });

  await redisService.subscribe('admin.crear-coordinador', async (message) => {
    const { id, replyTo, payload } = message;
    try {
      const resultado = await adminService.crearCoordinador(payload);
      await redisService.publish(replyTo, { id, data: resultado });
    } catch (error) {
      await redisService.publish(replyTo, { id, error: error.message });
    }
  });

  await redisService.subscribe('admin.crear-secretario', async (message) => {
    const { id, replyTo, payload } = message;
    try {
      const resultado = await adminService.crearSecretario(payload);
      await redisService.publish(replyTo, { id, data: resultado });
    } catch (error) {
      await redisService.publish(replyTo, { id, error: error.message });
    }
  });

  await redisService.subscribe('admin.crear-docente', async (message) => {
    const { id, replyTo, payload } = message;
    try {
      const resultado = await adminService.crearDocente(payload);
      await redisService.publish(replyTo, { id, data: resultado });
    } catch (error) {
      await redisService.publish(replyTo, { id, error: error.message });
    }
  });

  await redisService.subscribe('admin.crear-estudiante', async (message) => {
    const { id, replyTo, payload } = message;
    try {
      const resultado = await adminService.crearEstudiante(payload);
      await redisService.publish(replyTo, { id, data: resultado });
    } catch (error) {
      await redisService.publish(replyTo, { id, error: error.message });
    }
  });

  console.log('📡 Admin Microservicio suscrito a comandos vía Redis');
}
bootstrap();