import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({ schema: 'docentes', name: 'docentes' })
export class Docente {
@PrimaryGeneratedColumn('uuid')
id!: string;

@Column({ name: 'usuario_id', type: 'uuid', unique: true })
usuarioId!: string;

@Column({ name: 'categoria_academica', length: 30, nullable: true })
categoria_academica!: string;

@Column({ length: 20, nullable: true })
dedicacion!: string;
    
@Column({ name: 'horas_maximas_semanales', default: 20 })
horas_maximas_semanales!: number;

@CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
created_at!: Date;

@UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
updated_at!: Date;
}