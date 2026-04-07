import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity({ schema: 'academico', name: 'pnf_carreras' })
export class PnfCarrera {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ length: 20, unique: true })
  codigo!: string;

  @Column({ length: 150 })
  nombre!: string;

  @Column({ name: 'tipo_programa', length: 20 })
  tipo_programa!: string;

  @Column({ name: 'duracion_trayectos', type: 'int' })
  duracion_trayectos!: number;

  @Column({ name: 'resolucion_autorizacion', length: 50, nullable: true })
  resolucion_autorizacion?: string;

  @Column({ name: 'fecha_autorizacion', type: 'date', nullable: true })
  fecha_autorizacion?: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  created_at!: Date;
}
