import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // El API Gateway escucha en el puerto 3000 por defecto
  await app.listen(3000);
}
bootstrap();
