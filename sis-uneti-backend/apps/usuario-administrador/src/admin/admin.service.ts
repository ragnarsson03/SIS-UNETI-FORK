import { Injectable, Logger, ConflictException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsuariosRepository } from '../usuarios/usuarios.repository';
import { DocentesRepository } from '../docentes/docentes.repository';
import { EstudiantesRepository } from '../estudiantes/estudiantes.repository';
import { CrearCoordinadorDto } from './dto/crear-coordinador.dto';
import { CrearSecretarioDto } from './dto/crear-secretario.dto';
import { CrearDocenteDto } from './dto/crear-docente.dto';
import { CrearEstudianteDto } from './dto/crear-estudiante.dto';

@Injectable()
export class AdminService {
    private readonly logger = new Logger(AdminService.name);

    constructor(
        private readonly usuariosRepository: UsuariosRepository,
        private readonly docentesRepository: DocentesRepository,
        private readonly estudiantesRepository: EstudiantesRepository,
    ) { }

    async crearCoordinador(dto: CrearCoordinadorDto) {
        this.logger.log(`Creando coordinador: ${dto.email}`);

        const usuario = await this.usuariosRepository.crear({
            cedula: dto.cedula,
            email: dto.email,
            password: dto.password,
            nombres: dto.nombres,
            apellidos: dto.apellidos,
            telefono_principal: dto.telefono_principal,
            direccion: dto.direccion,
        });

        const rolId = await this.usuariosRepository.obtenerIdRolPorCodigo('COORDINADOR');
        if (rolId) await this.usuariosRepository.asignarRol(usuario.id, rolId);

        return { id: usuario.id, email: usuario.email, rol: 'COORDINADOR', mensaje: 'Creado exitosamente' };
    }

    async crearSecretario(dto: CrearSecretarioDto) {
        this.logger.log(`Creando secretario: ${dto.email}`);

        const usuario = await this.usuariosRepository.crear({
            cedula: dto.cedula,
            email: dto.email,
            password: dto.password,
            nombres: dto.nombres,
            apellidos: dto.apellidos,
            telefono_principal: dto.telefono_principal,
            direccion: dto.direccion,
        });

        const rolId = await this.usuariosRepository.obtenerIdRolPorCodigo('SECRETARIO');
        if (rolId) await this.usuariosRepository.asignarRol(usuario.id, rolId);

        return { id: usuario.id, email: usuario.email, rol: 'SECRETARIO', mensaje: 'Creado exitosamente' };
    }

    async crearDocente(dto: CrearDocenteDto) {
        this.logger.log(`Creando docente: ${dto.email}`);

        const usuario = await this.usuariosRepository.crear({
            cedula: dto.cedula,
            email: dto.email,
            password: dto.password,
            nombres: dto.nombres,
            apellidos: dto.apellidos,
            telefono_principal: dto.telefono_principal,
            direccion: dto.direccion,
        });

        const rolId = await this.usuariosRepository.obtenerIdRolPorCodigo('DOCENTE');
        if (rolId) await this.usuariosRepository.asignarRol(usuario.id, rolId);

        await this.docentesRepository.crear({
            usuarioId: usuario.id,
            categoria_academica: dto.categoria_academica,
            dedicacion: dto.dedicacion,
            horas_maximas_semanales: dto.horas_maximas_semanales || 20,
        });

        return { id: usuario.id, email: usuario.email, rol: 'DOCENTE', mensaje: 'Creado exitosamente' };
    }

    async crearEstudiante(dto: CrearEstudianteDto) {
        this.logger.log(`Creando estudiante: ${dto.email}`);

        const usuario = await this.usuariosRepository.crear({
            cedula: dto.cedula,
            email: dto.email,
            password: dto.password,
            nombres: dto.nombres,
            apellidos: dto.apellidos,
            telefono_principal: dto.telefono_principal,
            direccion: dto.direccion,
        });

        const rolId = await this.usuariosRepository.obtenerIdRolPorCodigo('ESTUDIANTE');
        if (rolId) await this.usuariosRepository.asignarRol(usuario.id, rolId);

        await this.estudiantesRepository.crear({
            usuarioId: usuario.id,
            cohorteId: dto.cohorteId,
            pnfId: dto.pnfId,
            tipo_ingreso: dto.tipo_ingreso,
            fecha_ingreso: new Date(dto.fecha_ingreso),
        });

        return { id: usuario.id, email: usuario.email, rol: 'ESTUDIANTE', mensaje: 'Creado exitosamente' };
    }

    async findAllUsers() {
        this.logger.log('Listando todos los usuarios del sistema...');
        return this.usuariosRepository.findAll();
    }
}