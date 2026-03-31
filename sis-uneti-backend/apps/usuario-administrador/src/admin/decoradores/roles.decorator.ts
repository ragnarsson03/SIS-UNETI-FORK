import { SetMetadata } from '@nestjs/common';
import { Roles } from 'src/common/enums/roles.enum';

/**
 * Clave para almacenar los roles requeridos en los metadatos
 */
export const ROLES_KEY = 'roles';

/**
 * Decorador para definir qué roles tienen acceso a un endpoint
 * 
 * Este decorador se utiliza en conjunto con el RolesGuard para
 * proteger endpoints según el rol del usuario autenticado.
 * 
 * @param roles - Lista de roles permitidos para acceder al endpoint
 * 
 * @example
 * @Roles(Role.ADMINISTRADOR)
 * @Post('crear')
 * async crearUsuario() { ... }
 * 
 * @example
 * @Roles(Role.ADMINISTRADOR, Role.COORDINADOR)
 * @Get('reportes')
 * async obtenerReportes() { ... }
 */
export const Rol = (...roles: Roles[]) => SetMetadata(ROLES_KEY, roles);