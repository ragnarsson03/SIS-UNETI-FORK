import { Injectable, ConflictException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Usuario } from './entidades/usuario.entity';

@Injectable()
export class UsuariosRepository {
private readonly logger = new Logger(UsuariosRepository.name);

constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
) {}

/**
 * Busca un usuario por su correo electrónico
 */
async buscarPorEmail(email: string): Promise<Usuario | null> {
    return this.usuarioRepository.findOne({
    where: { email: email as any }, // TypeORM requiere tipado específico
    });
}

/**
 * Busca un usuario por su cédula
 */
async buscarPorCedula(cedula: string): Promise<Usuario | null> {
    return this.usuarioRepository.findOne({
    where: { cedula: cedula as any },
    });
}

/**
 * Busca un usuario por su ID
 */
async buscarPorId(id: string): Promise<Usuario | null> {
    return this.usuarioRepository.findOne({
    where: { id: id as any },
    });
}

/**
 * Crea un nuevo usuario en la base de datos
 */
async crearUsuario(datos: {
    cedula: string;
    email: string;
    password: string;
    nombres: string;
    apellidos: string;
    telefono_principal?: string;
    direccion?: string;
}): Promise<Usuario> {
    // Verificar unicidad de cédula
    const existeCedula = await this.buscarPorCedula(datos.cedula);
    if (existeCedula) {
    throw new ConflictException(`Ya existe un usuario con cédula: ${datos.cedula}`);
    }

    // Verificar unicidad de email
    const existeEmail = await this.buscarPorEmail(datos.email);
    if (existeEmail) {
    throw new ConflictException(`Ya existe un usuario con email: ${datos.email}`);
    }

    // Generar salt y hash de contraseña
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(datos.password, salt);

    // Crear la instancia del usuario (sin usar create con objeto parcial problemático)
    const usuario = new Usuario();
    
    // Asignar propiedades manualmente
    usuario.cedula = datos.cedula;
    usuario.email = datos.email;
    usuario.password_hash = password_hash;
    usuario.salt = salt;
    usuario.nombres = datos.nombres;
    usuario.apellidos = datos.apellidos;
    usuario.telefono_principal = datos.telefono_principal || '';
    usuario.direccion = datos.direccion || '';
    usuario.activo = true;
    usuario.estado_usuario = 'ACTIVO';
    usuario.debe_cambiar_password = true;
    usuario.fecha_expiracion_password = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000);
    usuario.intentos_fallidos = 0;

    this.logger.log(`✅ Creando usuario: ${datos.email}`);
    
    // Guardar en base de datos
    return this.usuarioRepository.save(usuario);
}

/**
 * Asigna un rol a un usuario
 */
async asignarRol(usuarioId: string, rolId: string, asignadoPor?: string): Promise<void> {
    await this.usuarioRepository.query(
    `INSERT INTO seguridad.usuario_roles (usuario_id, rol_id, asignado_por)
    VALUES ($1, $2, $3)
    ON CONFLICT (usuario_id, rol_id) DO NOTHING`,
    [usuarioId, rolId, asignadoPor || null],
    );
    this.logger.debug(`Rol ${rolId} asignado a usuario ${usuarioId}`);
}

/**
 * Obtiene el ID de un rol por su código
 */
async obtenerIdRolPorCodigo(codigo: string): Promise<string | null> {
    const resultado = await this.usuarioRepository.query(
    `SELECT id FROM seguridad.roles WHERE codigo = $1`,
    [codigo],
    );
    return resultado[0]?.id || null;
}
}