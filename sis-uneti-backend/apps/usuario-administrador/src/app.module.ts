import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from './admin/admin.module';
import { RedisModule } from '@app/common/common/redis/redis.module';

import { Usuario, Docente, Estudiante } from '@app/common';

@Module({
  imports: [
    // Carga variables de entorno
    ConfigModule.forRoot({ isGlobal: true }),

    // Conexión a PostgreSQL
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.getOrThrow<string>('DB_HOST'),
        port: config.get<number>('DB_PORT', 5432),
        username: config.getOrThrow<string>('DB_USERNAME'),
        password: config.getOrThrow<string>('DB_PASSWORD'),
        database: config.getOrThrow<string>('DB_DATABASE'),
        entities: [Usuario, Docente, Estudiante],
        synchronize: false, // NUNCA true en producción
        schema: 'public',
      }),
    }),

    // Redis Pub/Sub (global, disponible en toda la app)
    RedisModule,

    // Módulo de administración de usuarios
    AdminModule,
  ],
})
export class AppModule {}
