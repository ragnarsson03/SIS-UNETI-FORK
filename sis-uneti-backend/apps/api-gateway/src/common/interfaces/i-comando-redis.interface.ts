/**
 * Interfaz que define la estructura de un comando enviado a través de Redis
 * 
 * Esta interfaz se utiliza para tipar los mensajes que el API Gateway
 * publica en Redis y que los microservicios consumen.
 * 
 * Patrón: Request-Reply con Redis
 * 
 * @example
 * const comando: IComandoRedis = {
 *   id: '123e4567-e89b-12d3-a456-426614174000',
 *   replyTo: 'gateway.respuestas',
 *   comando: 'admin.crear-docente',
 *   payload: {
 *     cedula: 'V-12345678',
 *     email: 'docente@uneti.edu.ve',
 *     nombres: 'María',
 *     apellidos: 'González'
 *   },
 *   timestamp: '2026-03-30T10:00:00.000Z'
 * };
 */
export interface IComandoRedis {
/** Identificador único del comando (UUID) */
id: string;

/** Canal al que el microservicio debe publicar la respuesta */
replyTo: string;

/** Nombre del comando a ejecutar (ej: 'admin.crear-docente') */
comando?: string;

/** Datos del comando (payload con la información necesaria) */
payload: any;

/** Timestamp de creación del comando */
timestamp: string;
}

/**
 * Interfaz que define la estructura de una respuesta a través de Redis
 */
export interface IRespuestaRedis {
/** Identificador único del comando original (UUID) */
id: string;

/** Datos de la respuesta (si fue exitosa) */
data?: any;

/** Mensaje de error (si ocurrió) */
error?: string;

/** Timestamp de la respuesta */
timestamp?: string;
}