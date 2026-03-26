import { Controller, Post, Body, Inject, UnauthorizedException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('auth')

@Controller('auth')
export class AuthGatewayController {
  constructor(
    @Inject('AUTH_SERVICE') private readonly redisClient: ClientProxy,
  ) {}

  @Post('login')
  @ApiOperation({ summary: 'Iniciar sesión en el sistema' })
  @ApiResponse({ status: 200, description: 'Login exitoso' })
  @ApiResponse({ status: 401, description: 'Credenciales inválidas' })
  async login(@Body() body: { cedula: string; clave: string }) {
    const { cedula, clave } = body;
    
    // Enviamos la petición a través de Redis al microservicio de Auth
    const response = await lastValueFrom(
      this.redisClient.send({ cmd: 'auth.login' }, { cedula, clave })
    );

    if (!response.success) {
      throw new UnauthorizedException(response.message);
    }

    return response;
  }
}
