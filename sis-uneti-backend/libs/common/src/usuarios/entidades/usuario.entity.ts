import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity({ schema: 'seguridad', name: 'usuarios' })
export class Usuario {
@PrimaryGeneratedColumn('uuid')
id: string;

@Column({ unique: true, length: 20 })
cedula: string;

@Column({ type: 'citext', unique: true })
email: string;

@Column({ type: 'citext', nullable: true })
email_alternativo: string;

@Column({ name: 'password_hash', length: 255 })
@Exclude()
password_hash: string;

@Column({ length: 255 })
@Exclude()
salt: string;

@Column({ length: 100 })
nombres: string;

@Column({ length: 100 })
apellidos: string;

@Column({ name: 'nombre_completo', insert: false, select: false })
nombre_completo: string;

@Column({ type: 'date', nullable: true })
fecha_nacimiento: Date;

@Column({ length: 20, nullable: true })  // ✅ Añadir nullable: true
telefono_principal: string;

@Column({ length: 20, nullable: true })  // ✅ Añadir nullable: true
telefono_emergencia: string;

@Column({ type: 'text', nullable: true })  // ✅ Añadir nullable: true
direccion: string;

@Column({ default: true })
activo: boolean;

@Column({ name: 'estado_usuario', default: 'ACTIVO' })
estado_usuario: string;

@Column({ type: 'text', nullable: true })
motivo_bloqueo: string;

@Column({ name: 'ultimo_login_at', type: 'timestamptz', nullable: true })
ultimo_login_at: Date;

@Column({ name: 'ultimo_login_ip', type: 'inet', nullable: true })
ultimo_login_ip: string;

@Column({ name: 'intentos_fallidos', default: 0 })
intentos_fallidos: number;

@Column({ name: 'fecha_bloqueo', type: 'timestamptz', nullable: true })
fecha_bloqueo: Date;

@Column({ name: 'debe_cambiar_password', default: false })
debe_cambiar_password: boolean;

@Column({ name: 'fecha_expiracion_password', type: 'timestamptz', nullable: true })
fecha_expiracion_password: Date;

@CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
created_at: Date;

@UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
updated_at: Date;

@Column({ name: 'created_by', type: 'uuid', nullable: true })
created_by: string;

@Column({ name: 'updated_by', type: 'uuid', nullable: true })
updated_by: string;
}