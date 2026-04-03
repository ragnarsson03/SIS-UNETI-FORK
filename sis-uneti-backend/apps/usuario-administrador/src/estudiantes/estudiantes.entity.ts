import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({ schema: 'estudiantes', name: 'estudiantes' })
export class Estudiante {
@PrimaryGeneratedColumn('uuid')
id!: string;

@Column({ name: 'usuario_id', type: 'uuid', unique: true })
usuarioId!: string;

@Column({ name: 'cohorte_id', type: 'uuid' })
cohorteId!: string;

@Column({ name: 'pnf_id', type: 'uuid' })
pnfId!: string;

@Column({ name: 'tipo_ingreso', length: 20 })
tipo_ingreso!: string;

@Column({ name: 'fecha_ingreso', type: 'date' })
fecha_ingreso!: Date;

@CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
created_at!: Date;

@UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
updated_at!: Date;
}