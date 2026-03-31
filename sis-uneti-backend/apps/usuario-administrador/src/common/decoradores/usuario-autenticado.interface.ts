import { Roles } from "../enums/roles.enum";
/**
 * Interfaz que define la estructura del usuario autenticado
 * 
 * Esta interfaz representa los datos que se adjuntan al objeto Request
 * después de que el JwtStrategy valida el token y extrae el usuario.
 * 
 * No contiene información sensible como password_hash o salt.
 */
export interface IUsuarioAutenticado {
/** ID único del usuario en el sistema */
id: string;

/** Cédula de identidad */
cedula: string;

/** Correo electrónico institucional */
email: string;

/** Nombres completos */
nombres: string;

/** Apellidos completos */
apellidos: string;

/** Rol principal del usuario */
rol: Roles;

/** Lista de permisos granulares asignados al usuario */
permisos: string[];

/** Fecha del último login (opcional) */
ultimoLoginAt?: Date;

/** Dirección IP del último login (opcional) */
ultimoLoginIp?: string;
}