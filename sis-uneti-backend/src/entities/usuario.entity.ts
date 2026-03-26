import { 
  Entity, 
  Column, 
  PrimaryGeneratedColumn, 
  CreateDateColumn, 
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate
} from 'typeorm';
import * as crypto from 'crypto'; // Módulo nativo de Node.js

@Entity({ schema: 'seguridad', name: 'usuarios' })
export class Usuario {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 20, unique: true })
  cedula!: string;

  @Column({ type: 'varchar', length: 100, unique: true, name: 'email' })
  email!: string;

  @Column({ type: 'varchar', length: 255, name: 'password_hash', select: false })
  passwordHash!: string;

  @Column({ type: 'varchar', length: 255, select: false })
  salt!: string;

  @Column({ type: 'varchar', length: 100 })
  nombres!: string;

  @Column({ type: 'varchar', length: 100 })
  apellidos!: string;

  @Column({
    type: 'enum',
    enum: ['ESTUDIANTE', 'DOCENTE', 'SECRETARIA', 'COORDINADOR', 'ADMINISTRADOR', 'AUDITOR'],
    default: 'ESTUDIANTE',
    name: 'rol_usuario'
  })
  rol!: string;

  @Column({ type: 'boolean', default: true })
  activo!: boolean;

  @Column({
    type: 'varchar',
    length: 20,
    default: 'ACTIVO',
    name: 'estado_usuario'
  })
  estadoUsuario!: string;

  // CAMBIO: Ahora es una columna estándar de varchar
  @Column({ type: 'varchar', length: 255, name: 'hash_integridad', nullable: true })
  hashIntegridad!: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt!: Date;

  // Lógica de aplicación para generar el hash de integridad
  @BeforeInsert()
  @BeforeUpdate()
  generarHashIntegridad() {
    const dataToHash = `${this.cedula}${this.email}${this.rol}`;
    this.hashIntegridad = crypto
      .createHash('md5')
      .update(dataToHash)
      .digest('hex');
  }
}