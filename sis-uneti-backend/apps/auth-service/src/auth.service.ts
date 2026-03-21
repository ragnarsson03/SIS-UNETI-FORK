// apps/auth-service/src/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Usuario)
        private readonly usuarioRepo: Repository<Usuario>,
    ) { }

    async validarCredenciales(dto: { cedula: string; clave: string }) {
        // Buscamos exclusivamente por cédula
        const usuario = await this.usuarioRepo.findOne({
            where: {
                cedula: dto.cedula,
                activo: true
            },
            select: ['id', 'cedula', 'passwordHash', 'rol', 'nombre', 'apellido']
        });

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
                rol: usuario.rol,
                nombre: `${usuario.nombre} ${usuario.apellido}`
            },
            token: 'JWT_GENERADO_SIS_UNETI' // Aquí iría la lógica de sign del JwtService
        };
    }
}
