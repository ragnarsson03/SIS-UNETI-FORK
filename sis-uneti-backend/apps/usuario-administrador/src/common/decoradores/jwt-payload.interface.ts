import { Roles } from "../enums/roles.enum";
/**
 * Interfaz que define la estructura del payload del token JWT
 * 
 * Este payload se utiliza tanto para firmar el token como para
 * validarlo en las estrategias de Passport.
 * 
 * Los campos iat (issued at) y exp (expiration) son añadidos
 * automáticamente por el JwtService al firmar.
 */
export interface IJwtPayload {
/** ID del usuario (subject) */
sub: string;

/** Cédula de identidad */
cedula: string;

/** Correo electrónico */
email: string;

/** Rol principal del usuario */
rol: Roles;

/** Lista de permisos granulares */
permisos: string[];

/** Timestamp de emisión (autogenerado por JWT) */
iat?: number;

/** Timestamp de expiración (autogenerado por JWT) */
exp?: number;
}