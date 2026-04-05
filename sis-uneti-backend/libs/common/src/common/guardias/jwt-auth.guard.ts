import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decoradores/public.decorator';

/**
 * Guardia de autenticación JWT
 * 
 * Este guard protege los endpoints que requieren autenticación.
 * Si la ruta está marcada con @Public(), se permite el acceso sin token.
 * De lo contrario, se valida el token JWT del header Authorization.
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
constructor(private reflector: Reflector) {
    super();
}

canActivate(context: ExecutionContext) {
    // Verificar si la ruta está marcada como pública
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
    context.getHandler(),
    context.getClass(),
    ]);

    if (isPublic) {
    return true;
    }

    return super.canActivate(context);
}

handleRequest(err: any, user: any, info: any) {
    if (err || !user) {
    throw err || new UnauthorizedException('No autenticado. Se requiere token JWT.');
    }
    return user;
}
}