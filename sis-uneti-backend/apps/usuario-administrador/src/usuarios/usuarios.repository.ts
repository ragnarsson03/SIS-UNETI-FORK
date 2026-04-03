import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Usuario } from './entidades/usuario.entity';

@Injectable()
export class UsuariosRepository {
constructor(
    @InjectRepository(Usuario)
    private readonly repo: Repository<Usuario>,
) {}

async crear(datos: {
    cedula: string;
    email: string;
    password: string;
    nombres: string;
    apellidos: string;
    telefono_principal?: string;
    direccion?: string;
}): Promise<Usuario> {
    const existe = await this.repo.findOne({ where: [{ cedula: datos.cedula }, { email: datos.email }] });
    if (existe) throw new ConflictException('Cédula o email ya registrado');

    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(datos.password, salt);

    const usuario = this.repo.create({
    cedula: datos.cedula,
    email: datos.email,
    password_hash,
    salt,
    nombres: datos.nombres,
    apellidos: datos.apellidos,
    telefono_principal: datos.telefono_principal,
    direccion: datos.direccion,
    activo: true,
    estado_usuario: 'ACTIVO',
    });

    return this.repo.save(usuario);
}

async obtenerIdRolPorCodigo(codigo: string): Promise<string | null> {
    const result = await this.repo.query(`SELECT id FROM seguridad.roles WHERE codigo = $1`, [codigo]);
    return result[0]?.id || null;
}

async asignarRol(usuarioId: string, rolId: string): Promise<void> {
    await this.repo.query(
    `INSERT INTO seguridad.usuario_roles (usuario_id, rol_id) VALUES ($1, $2) ON CONFLICT DO NOTHING`,
    [usuarioId, rolId],
    );
}
}