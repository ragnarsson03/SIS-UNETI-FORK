import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({ schema: 'seguridad', name: 'usuarios' })
export class Usuario {
@PrimaryGeneratedColumn('uuid')
id!: string;

@Column({ unique: true, length: 20 })
cedula!: string;

@Column({ name: 'correo_principal', type: 'citext', unique: true })
email!: string;

@Column({ name: 'password_hash', length: 255 })
password_hash!: string;

@Column({ length: 255 })
salt!: string;

@Column({ length: 100 })
nombres!: string;

@Column({ length: 100 })
apellidos!: string;

@Column({ length: 20, nullable: true })
telefono_principal!: string;

@Column({ type: 'text', nullable: true })
direccion!: string;

@Column({ default: true })
activo!: boolean;

@Column({ name: 'estado_usuario', default: 'ACTIVO' })
estado_usuario!: string;

@Column({ name: 'intentos_fallidos', default: 0 })
intentos_fallidos!: number;

@CreateDateColumn({ name: 'creado', type: 'timestamptz' })
  creado!: Date;

  @UpdateDateColumn({ name: 'actualizado', type: 'timestamptz' })
  actualizado!: Date;

@Column({
    type: 'enum',
    enum: [
      'ESTUDIANTES',
      'DOCENTES',
      'ANALISTA',
      'COORDINADOR_CARRERA',
      'COORDINADOR_CE',
      'ADMINISTRADOR',
      'AUDITOR',
    ],
    default: 'ESTUDIANTES',
    name: 'rol_usuario',
  })
  rol!: string;
}