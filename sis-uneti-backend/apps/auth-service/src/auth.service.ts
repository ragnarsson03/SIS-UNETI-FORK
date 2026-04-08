import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { Usuario } from '../../usuario-administrador/src/usuarios/entidades/usuario.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Usuario)
        private readonly usuarioRepo: Repository<Usuario>,
        private readonly dataSource: DataSource,
        private readonly jwtService: JwtService,  // ← Inyectar JwtService
    ) { }

    async validarCredenciales(dto: { cedula: string; clave: string }) {
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

        if (!usuario || !(await bcrypt.compare(dto.clave, usuario.passwordHash))) {
            return {
                success: false,
                message: 'Cédula o contraseña incorrecta'
            };
        }

        // ✅ Generar JWT real
        const payload = {
            sub: usuario.id,
            cedula: usuario.cedula,
            rol: usuario.rol ?? 'ESTUDIANTE',
        };

        const accessToken = this.jwtService.sign(payload);

        return {
            success: true,
            user: {
                id: usuario.id,
                cedula: usuario.cedula,
                rol: usuario.rol ?? 'ESTUDIANTE',
                nombre: `${usuario.nombre} ${usuario.apellido}`
            },
            accessToken  // ← Cambiado de "token" a "accessToken"
        };
    }
}