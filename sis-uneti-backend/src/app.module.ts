import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Usuario } from './entities/usuario.entity.js';
import { AuthGatewayController } from './gateway/auth.gateway.controller.js';
import { AuthModule } from './microservices/auth/auth.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5433'),
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASS || 'postgres',
      database: process.env.DB_NAME || 'data_soberana',
      entities: [Usuario],
      synchronize: true,
      extra: {
        max: 10,
        connectionTimeoutMillis: 2000,
      }
    }),
    // Registro global de TypeORM para Usuario
    TypeOrmModule.forFeature([Usuario]),
    // Cliente Redis para comunicación
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.REDIS,
        options: {
          host: process.env.REDIS_HOST || 'localhost',
          port: parseInt(process.env.REDIS_PORT || '6379'),
        },
      },
    ]),
    AuthModule, // Importar el módulo de autenticación
  ],
  controllers: [AuthGatewayController],
  providers: [],
})
export class AppModule {}