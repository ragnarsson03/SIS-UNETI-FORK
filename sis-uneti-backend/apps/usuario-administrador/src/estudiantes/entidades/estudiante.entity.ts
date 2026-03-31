import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { Usuario } from '../../usuarios/entidades/usuario.entity';

/**
 * Entidad que mapea la tabla estudiantes.estudiantes
 * Almacena datos académicos específicos de estudiantes
 */
@Entity({ schema: 'estudiantes', name: 'estudiantes' })
export class Estudiante {
@PrimaryGeneratedColumn('uuid')
id: string;

@Column({ name: 'usuario_id', type: 'uuid', unique: true })
usuarioId: string;

@OneToOne(() => Usuario)
@JoinColumn({ name: 'usuario_id' })
usuario: Usuario;

@Column({ name: 'cohorte_id', type: 'uuid' })
cohorteId: string;

@Column({ name: 'pnf_id', type: 'uuid' })
pnfId: string;

@Column({ name: 'tipo_ingreso', length: 20 })
tipo_ingreso: string;

@Column({ name: 'convenio_empresa', length: 50, nullable: true })
convenio_empresa: string;

@Column({ name: 'codigo_opsu', length: 50, nullable: true })
codigo_opsu: string;

@Column({ name: 'titulo_bachiller_tipo', length: 50, nullable: true })
titulo_bachiller_tipo: string;

@Column({ name: 'titulo_bachiller_ano', nullable: true })
titulo_bachiller_ano: number;

@Column({ name: 'institucion_procedencia', length: 150, nullable: true })
institucion_procedencia: string;

@Column({ name: 'trayecto_actual', default: 0 })
trayecto_actual: number;

@Column({ name: 'creditos_acumulados', default: 0 })
creditos_acumulados: number;

@Column({ name: 'indice_academico', type: 'numeric', precision: 4, scale: 2, default: 0 })
indice_academico: number;

@Column({ name: 'estado_academico', default: 'ACTIVO' })
estado_academico: string;

@Column({ name: 'nivel_socioeconomico', length: 10, nullable: true })
nivel_socioeconomico: string;

@Column({ name: 'recibe_beca', default: false })
recibe_beca: boolean;

@Column({ name: 'tipo_beca', length: 50, nullable: true })
tipo_beca: string;

@Column({ name: 'porcentaje_beca', nullable: true })
porcentaje_beca: number;

@Column({ name: 'fecha_ingreso', type: 'date' })
fecha_ingreso: Date;

@Column({ name: 'fecha_egreso', type: 'date', nullable: true })
fecha_egreso: Date;

@Column({ name: 'fecha_titulacion', type: 'date', nullable: true })
fecha_titulacion: Date;

@CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
created_at: Date;

@UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
updated_at: Date;
}