import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { Usuario } from './usuario.entity';

/**
 * Entidad que mapea la tabla docentes.docentes
 * Almacena datos profesionales específicos de docentes
 */
@Entity({ schema: 'docentes', name: 'docentes' })
export class Docente {
@PrimaryGeneratedColumn('uuid')
id: string;

@Column({ name: 'usuario_id', type: 'uuid', unique: true })
usuarioId: string;

@OneToOne(() => Usuario)
@JoinColumn({ name: 'usuario_id' })
usuario: Usuario;

@Column({ name: 'categoria_academica', length: 30, nullable: true })
categoria_academica: string;

@Column({ length: 20, nullable: true })
dedicacion: string;

@Column({ length: 20, nullable: true })
escalafon: string;

@Column({ name: 'horas_maximas_semanales', default: 20 })
horas_maximas_semanales: number;

@Column({ name: 'horas_asignadas_actual', default: 0 })
horas_asignadas_actual: number;

@Column({ name: 'area_especializacion', length: 100, nullable: true })
area_especializacion: string;

@Column({ name: 'titulos_academicos', type: 'jsonb', default: [] })
titulos_academicos: any[];

@Column({ name: 'lineas_investigacion', type: 'text', array: true, nullable: true })
lineas_investigacion: string[];

@Column({ name: 'estado_docente', default: 'ACTIVO' })
estado_docente: string;

@Column({ name: 'fecha_ingreso_institucion', type: 'date', nullable: true })
fecha_ingreso_institucion: Date;

@CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
created_at: Date;

@UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
updated_at: Date;
}