import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthMicroserviceController } from './auth.microservice.controller.js';
import { AuthService } from './auth.service.js';
import { Usuario } from '../../entities/usuario.entity.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([Usuario]),
    JwtModule.register({
      secret: 'jwt_secret_key_2026',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthMicroserviceController],
  providers: [
    AuthService,
    {
      provide: 'JWT_SERVICE_CUSTOM',
      useFactory: (jwtService: JwtService) => {
        console.log('🔧 [Factory] Creando JWT_SERVICE_CUSTOM');
        return jwtService;
      },
      inject: [JwtService],
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}
