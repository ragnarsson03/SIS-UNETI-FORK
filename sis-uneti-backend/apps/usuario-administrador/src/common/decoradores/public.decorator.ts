import { SetMetadata } from '@nestjs/common';

/**
 * Clave para marcar rutas como públicas
 */
export const IS_PUBLIC_KEY = 'isPublic';

/**
 * Decorador para marcar rutas como públicas (sin autenticación)
 * 
 * Este decorador se utiliza para indicar que un endpoint no requiere
 * autenticación JWT. Es utilizado por el JwtAuthGuard.
 * 
 * @example
 * @Public()
 * @Post('login')
 * async login() { ... }
 * 
 * @example
 * @Public()
 * @Get('health')
 * async healthCheck() { ... }
 */
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);