// apps/auth-service/src/auth.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Usuario } from '../../libs/common/src/usuarios/entidades/usuario.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Usuario)
        private readonly usuarioRepo: Repository<Usuario>,
        private readonly dataSource: DataSource,
    ) { }

    async validarCredenciales(dto: { cedula: string; clave: string }) {
        // Buscamos el usuario con JOIN a roles para obtener el código de rol
        // sin depender de una columna 'rol' inexistente en seguridad.usuarios
        const resultado = await this.dataSource.query(
            `SELECT
                u.id,
                u.cedula,
                u.password_hash AS "passwordHash",
                u.nombres AS nombre,
                u.apellidos AS apellido,
                r.codigo AS rol
            FROM seguridad.usuarios u
            LEFT JOIN seguridad.usuario_roles ur ON ur.usuario_id = u.id
            LEFT JOIN seguridad.roles r ON r.id = ur.rol_id
            WHERE u.cedula = $1
            AND u.activo = true
            LIMIT 1`,
            [dto.cedula]
        );

        const usuario = resultado[0];

        // Validación de existencia y hash de contraseña
        if (!usuario || !(await bcrypt.compare(dto.clave, usuario.passwordHash))) {
            return {
                success: false,
                message: 'Cédula o contraseña incorrecta'
            };
        }

        // Retorno de datos para el Gateway
        return {
            success: true,
            user: {
                id: usuario.id,
                cedula: usuario.cedula,
                rol: usuario.rol ?? 'ESTUDIANTE', // fallback si no tiene rol asignado
                nombre: `${usuario.nombre} ${usuario.apellido}`
            },
            token: 'JWT_GENERADO_SIS_UNETI'
        };
    }
}
