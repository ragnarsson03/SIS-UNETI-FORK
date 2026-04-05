import { Injectable, Logger, BadRequestException, ConflictException } from '@nestjs/common';
import { UsuariosRepository } from '../usuarios/usuarios.repository';
import { DocentesRepository } from '../docentes/docentes.repository';
import { EstudiantesRepository } from '../estudiantes/estudiantes.repository';
import { CrearCoordinadorDto } from './dto/crear-coordinador.dto';
import { CrearSecretarioDto } from './dto/crear-secretario.dto';
import { CrearDocenteDto } from './dto/crear-docente.dto';
import { CrearEstudianteDto } from './dto/crear-estudiante.dto';
import { CrearUsuarioBaseDto } from '@app/common/common/dto/crear-usuario-base.dto';
import { Roles } from '@app/common/common/enums/roles.enum';

@Injectable()
export class AdminService {
private readonly logger = new Logger(AdminService.name);

constructor(
    private readonly usuariosRepository: UsuariosRepository,
    private readonly docentesRepository: DocentesRepository,
    private readonly estudiantesRepository: EstudiantesRepository,
) {}

/**
 * Crea un usuario con rol COORDINADOR
 */
async crearCoordinador(dto: CrearCoordinadorDto): Promise<any> {
    this.logger.log(`Creando coordinador: ${dto.email}`);

    // 1. Crear usuario base
    const usuario = await this.usuariosRepository.crearUsuario({
    cedula: dto.cedula,
    email: dto.email,
    password: dto.password,
    nombres: dto.nombres,
    apellidos: dto.apellidos,
    telefono_principal: dto.telefono_principal,
    direccion: dto.direccion,
    });

    // 2. Asignar rol COORDINADOR
    const rolId = await this.usuariosRepository.obtenerIdRolPorCodigo(Roles.COORDINADOR);
    if (rolId) {
    await this.usuariosRepository.asignarRol(usuario.id, rolId);
    }

    // 3. Registrar en tabla de coordinadores? (opcional, según necesidad)
    // Por ahora, solo asignamos rol

    this.logger.log(`✅ Coordinador creado: ${usuario.id}`);

    return {
    id: usuario.id,
    cedula: usuario.cedula,
    email: usuario.email,
    nombres: usuario.nombres,
    apellidos: usuario.apellidos,
    rol: Roles.COORDINADOR,
    pnfId: dto.pnfId,
    mensaje: 'Coordinador creado exitosamente. Se ha enviado un correo con las credenciales temporales.',
    };
}

/**
 * Crea un usuario con rol ADMINISTRADOR
 */
async crearAdministrador(dto: CrearUsuarioBaseDto): Promise<any> {
    this.logger.log(`Creando administrador: ${dto.email}`);

    const usuario = await this.usuariosRepository.crearUsuario({
    cedula: dto.cedula,
    email: dto.email,
    password: dto.password,
    nombres: dto.nombres,
    apellidos: dto.apellidos,
    telefono_principal: dto.telefono_principal,
    direccion: dto.direccion,
    });

    const rolId = await this.usuariosRepository.obtenerIdRolPorCodigo(Roles.ADMINISTRADOR);
    if (rolId) {
    await this.usuariosRepository.asignarRol(usuario.id, rolId);
    }

    return {
    id: usuario.id,
    cedula: usuario.cedula,
    email: usuario.email,
    rol: Roles.ADMINISTRADOR,
    mensaje: 'Administrador creado exitosamente.',
    };
}

/**
 * Crea un usuario con rol SECRETARIO
 */
async crearSecretario(dto: CrearSecretarioDto): Promise<any> {
    this.logger.log(`Creando secretario: ${dto.email}`);

    const usuario = await this.usuariosRepository.crearUsuario({
    cedula: dto.cedula,
    email: dto.email,
    password: dto.password,
    nombres: dto.nombres,
    apellidos: dto.apellidos,
    telefono_principal: dto.telefono_principal,
    direccion: dto.direccion,
    });

    const rolId = await this.usuariosRepository.obtenerIdRolPorCodigo(Roles.SECRETARIO);
    if (rolId) {
    await this.usuariosRepository.asignarRol(usuario.id, rolId);
    }

    return {
    id: usuario.id,
    cedula: usuario.cedula,
    email: usuario.email,
    nombres: usuario.nombres,
    apellidos: usuario.apellidos,
    rol: Roles.SECRETARIO,
    unidad_administrativa: dto.unidad_administrativa,
    mensaje: 'Secretario creado exitosamente.',
    };
}

/**
 * Crea un usuario con rol DOCENTE y registra sus datos profesionales
 */
async crearDocente(dto: CrearDocenteDto): Promise<any> {
    this.logger.log(`Creando docente: ${dto.email}`);

    const usuario = await this.usuariosRepository.crearUsuario({
    cedula: dto.cedula,
    email: dto.email,
    password: dto.password,
    nombres: dto.nombres,
    apellidos: dto.apellidos,
    telefono_principal: dto.telefono_principal,
    direccion: dto.direccion,
    });

    // Asignar rol DOCENTE
    const rolId = await this.usuariosRepository.obtenerIdRolPorCodigo(Roles.DOCENTE);
    if (rolId) {
    await this.usuariosRepository.asignarRol(usuario.id, rolId);
    }

    // Registrar datos profesionales en docentes.docentes
    await this.docentesRepository.crear({
    usuarioId: usuario.id,
    categoria_academica: dto.categoria_academica,
    dedicacion: dto.dedicacion,
    escalafon: dto.escalafon,
    horas_maximas_semanales: dto.horas_maximas_semanales || 20,
    area_especializacion: dto.area_especializacion,
    });

    return {
    id: usuario.id,
    cedula: usuario.cedula,
    email: usuario.email,
    nombres: usuario.nombres,
    apellidos: usuario.apellidos,
    rol: Roles.DOCENTE,
    categoria_academica: dto.categoria_academica,
    dedicacion: dto.dedicacion,
    mensaje: 'Docente creado exitosamente.',
    };
}

/**
 * Crea un usuario con rol ESTUDIANTE y registra sus datos académicos
 */
async crearEstudiante(dto: CrearEstudianteDto): Promise<any> {
    this.logger.log(`Creando estudiante: ${dto.email}`);

    // Validar que la cohorte existe (pendiente implementación)
    // Validar que el PNF existe (pendiente implementación)

    const usuario = await this.usuariosRepository.crearUsuario({
    cedula: dto.cedula,
    email: dto.email,
    password: dto.password,
    nombres: dto.nombres,
    apellidos: dto.apellidos,
    telefono_principal: dto.telefono_principal,
    direccion: dto.direccion,
    });

    // Asignar rol ESTUDIANTE
    const rolId = await this.usuariosRepository.obtenerIdRolPorCodigo(Roles.ESTUDIANTE);
    if (rolId) {
    await this.usuariosRepository.asignarRol(usuario.id, rolId);
    }

    // Registrar datos académicos en estudiantes.estudiantes
    await this.estudiantesRepository.crear({
    usuarioId: usuario.id,
    cohorteId: dto.cohorteId,
    pnfId: dto.pnfId,
    tipo_ingreso: dto.tipo_ingreso,
    convenio_empresa: dto.convenio_empresa,
    codigo_opsu: dto.codigo_opsu,
    titulo_bachiller_tipo: dto.titulo_bachiller_tipo,
    titulo_bachiller_ano: dto.titulo_bachiller_ano,
    institucion_procedencia: dto.institucion_procedencia,
    fecha_ingreso: new Date(dto.fecha_ingreso),
    nivel_socioeconomico: dto.nivel_socioeconomico,
    recibe_beca: dto.recibe_beca || false,
    });

    return {
    id: usuario.id,
    cedula: usuario.cedula,
    email: usuario.email,
    nombres: usuario.nombres,
    apellidos: usuario.apellidos,
    rol: Roles.ESTUDIANTE,
    cohorteId: dto.cohorteId,
    pnfId: dto.pnfId,
    tipo_ingreso: dto.tipo_ingreso,
    mensaje: 'Estudiante creado exitosamente. Se ha enviado un correo con las credenciales temporales.',
    };
}
}