import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from '../enums/roles.enum';
import { ROLES_KEY } from '../../admin/decoradores/roles.decorator';
import { IUsuarioAutenticado } from '../decoradores/usuario-autenticado.interface';
/**
 * Guardia de autorización basada en roles
 * 
 * Este guard verifica que el usuario autenticado tenga al menos uno
 * de los roles requeridos por el decorador @Roles().
 * 
 * Si el endpoint no tiene el decorador @Roles(), se permite el acceso.
 * Si el usuario no tiene el rol requerido, se lanza una excepción 403.
 */
@Injectable()
export class RolesGuard implements CanActivate {
constructor(private reflector: Reflector) {}

canActivate(context: ExecutionContext): boolean {
    // Obtener los roles requeridos del decorador @Roles()
    const requiredRoles = this.reflector.getAllAndOverride<Roles[]>(ROLES_KEY, [
    context.getHandler(),
    context.getClass(),
    ]);

    // Si no hay roles requeridos, permitir acceso
    if (!requiredRoles) {
    return true;
    }

    // Obtener el usuario del request (colocado por JwtAuthGuard)
    const { user } = context.switchToHttp().getRequest();
    const usuario = user as IUsuarioAutenticado;

    if (!usuario) {
    throw new ForbiddenException('Usuario no autenticado');
    }

    // Verificar si el usuario tiene al menos uno de los roles requeridos
    const hasRole = requiredRoles.some((role) => usuario.rol === role);

    if (!hasRole) {
    throw new ForbiddenException(
        `Acceso denegado. Se requiere uno de los siguientes roles: ${requiredRoles.join(', ')}`,
    );
    }

    return true;
}
}