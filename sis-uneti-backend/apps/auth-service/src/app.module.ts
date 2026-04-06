import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';  // ← Agregar esta importación
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Usuario } from '../../usuario-administrador/src/usuarios/entidades/usuario.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'db',
      port: 5432,
      username: process.env.POSTGRES_USER || 'postgres',
      password: process.env.POSTGRES_PASSWORD || '1234',
      database: process.env.POSTGRES_DB || 'data_soberana',
      entities: [Usuario],
      synchronize: false,
    }),
    TypeOrmModule.forFeature([Usuario]),
    // ✅ Agregar JwtModule
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'super-secret-key',
      signOptions: { expiresIn: '15m' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AppModule {}