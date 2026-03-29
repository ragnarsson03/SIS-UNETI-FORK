// apps/auth-service/src/entities/usuario.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({ schema: 'seguridad', name: 'usuarios' })
export class Usuario {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', unique: true, length: 20 })
    cedula: string;

    @Column({ name: 'nombres', type: 'varchar', length: 100 })
    nombre: string;

    @Column({ name: 'apellidos', type: 'varchar', length: 100 })
    apellido: string;

    @Column({ type: 'varchar', unique: true, length: 100, nullable: true })
    email: string;

    @Column({ name: 'password_hash', type: 'varchar', select: false })
    passwordHash: string;

    @Column({ name: 'salt', type: 'varchar' })
    salt: string;

    // rol: NO existe en seguridad.usuarios — se obtiene via JOIN con seguridad.roles
    // Ver auth.service.ts -> validarCredenciales()

    @Column({ type: 'boolean', default: true })
    activo: boolean;

    @Column({ name: 'estado_usuario', type: 'varchar', default: 'ACTIVO' })
    estadoUsuario: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
