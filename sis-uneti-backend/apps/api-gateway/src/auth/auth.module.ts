import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './estrategias/jwt.strategy';
import { JwtAuthGuard } from '../../../usuario-administrador/src/common/guardias/jwt-auth.guard';

@Module({
  imports: [
    // ✅ Para autenticación JWT
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'super-secret-key',
      signOptions: { expiresIn: '1h' },
    }),
    // ✅ Para comunicación con Auth Service vía Redis
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.REDIS,
        options: {
          host: process.env.REDIS_HOST || 'redis',
          port: 6379,
        },
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [JwtStrategy, JwtAuthGuard],  // ← Registrar la estrategia y el guard
  exports: [JwtAuthGuard],                 // ← Exportar para usar en otros módulos
})
export class AuthModule { }