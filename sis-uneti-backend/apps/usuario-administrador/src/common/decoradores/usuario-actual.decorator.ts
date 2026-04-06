import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IUsuarioAutenticado } from './usuario-autenticado.interface';
/**
 * Decorador para extraer el usuario autenticado del objeto Request
 * 
 * Este decorador facilita el acceso a los datos del usuario que
 * ha sido autenticado por el JwtStrategy y colocado en req.user.
 * 
 * @param data - (Opcional) Si se especifica una propiedad, retorna solo esa propiedad
 * @param ctx - Contexto de ejecución de NestJS
 * @returns El usuario autenticado completo o una propiedad específica
 * 
 * @example
 * // Obtener el usuario completo
 * async miMetodo(@UsuarioActual() usuario: IUsuarioAutenticado) {
 *   console.log(usuario.id);
 * }
 * 
 * @example
 * // Obtener solo el ID del usuario
 * async miMetodo(@UsuarioActual('id') usuarioId: string) {
 *   console.log(usuarioId);
 * }
 */
export const UsuarioActual = createParamDecorator(
(data: keyof IUsuarioAutenticado | undefined, ctx: ExecutionContext): IUsuarioAutenticado | any => {
    const request = ctx.switchToHttp().getRequest();
    const usuario = request.user as IUsuarioAutenticado;

    if (!usuario) {
    return null;
    }

    // Si se especifica una propiedad, devolver solo esa
    if (data) {
    return usuario[data];
    }

    return usuario;
},
);