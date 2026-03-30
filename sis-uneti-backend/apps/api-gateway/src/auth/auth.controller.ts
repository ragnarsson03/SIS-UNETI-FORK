import {
  Controller, Post, Body,
  UnauthorizedException, Inject,
  ServiceUnavailableException, GatewayTimeoutException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom, timeout, catchError, throwError } from 'rxjs';
import { TimeoutError } from 'rxjs';

@Controller('auth')
export class AuthController {
  constructor(@Inject('AUTH_SERVICE') private readonly redisClient: ClientProxy) {}

  @Post('login')
  async login(@Body() body: { cedula: string; clave: string }) {
    const { cedula, clave } = body;

    let response: any;
    try {
      // Enviamos la petición a través de Redis con timeout de 5 segundos
      response = await lastValueFrom(
        this.redisClient.send({ cmd: 'auth.login' }, { cedula, clave }).pipe(
          timeout(5000),
          catchError((err) => {
            if (err instanceof TimeoutError) {
              // Auth-service no responde → 504 al frontend
              return throwError(
                () => new GatewayTimeoutException(
                  'El servicio de autenticación no responde. Verifique que auth-service está corriendo.'
                )
              );
            }
            // Cualquier otro error de transporte → 503
            return throwError(
              () => new ServiceUnavailableException(
                'Servicio de autenticación no disponible. Intente más tarde.'
              )
            );
          }),
        )
      );
    } catch (httpException) {
      // Re-throw HttpExceptions (504, 503) directamente
      throw httpException;
    }

    if (!response?.success) {
      throw new UnauthorizedException(response?.message || 'Credenciales incorrectas.');
    }

    return response;
  }
}

