import { Controller, Post, Body, UnauthorizedException, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Controller('auth')
export class AuthController {
  constructor(@Inject('AUTH_SERVICE') private readonly redisClient: ClientProxy) {}

  @Post('login')
  async login(@Body() body: { cedula: string; clave: string }) {
    const { cedula, clave } = body;

    // Enviamos la petición a través de Redis
    const response = await lastValueFrom(
      this.redisClient.send({ cmd: 'auth.login' }, { cedula, clave })
    );

    if (!response.success) {
      throw new UnauthorizedException(response.message);
    }

    return response;
  }
}
