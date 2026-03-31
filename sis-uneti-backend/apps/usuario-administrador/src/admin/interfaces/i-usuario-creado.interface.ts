import { Roles } from "src/common/enums/roles.enum";

/**
 * Interfaz que define la estructura de respuesta después de crear un usuario
 * 
 * Esta interfaz se utiliza para tipar la respuesta que el microservicio
 * devuelve al API Gateway después de procesar la creación de un usuario.
 * 
 * @example
 * const respuesta: IUsuarioCreado = {
 *   id: '123e4567-e89b-12d3-a456-426614174000',
 *   cedula: 'V-12345678',
 *   email: 'juan.perez@uneti.edu.ve',
 *   nombres: 'Juan Carlos',
 *   apellidos: 'Pérez González',
 *   rol: Role.DOCENTE,
 *   mensaje: 'Usuario creado exitosamente'
 * };
 */
export interface IUsuarioCreado {
/** Identificador único del usuario en el sistema (UUID) */
id: string;

/** Cédula de identidad del usuario */
cedula: string;

/** Correo electrónico institucional */
email: string;

/** Nombres completos del usuario */
nombres: string;

/** Apellidos completos del usuario */
apellidos: string;

/** Rol asignado al usuario */
rol: Roles;

/** Campos adicionales específicos según el tipo de usuario */
[key: string]: any;

/** Mensaje informativo sobre la operación */
mensaje?: string;
}