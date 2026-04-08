import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity({ schema: 'academico', name: 'cohortes' })
export class Cohorte {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'pnf_id', type: 'uuid' })
  pnfId!: string;

  @Column({ name: 'codigo_cohorte', unique: true })
  codigoCohorte!: string;

  @Column({ name: 'estado_cohorte', length: 20, default: 'ACTIVA' })
  estado_cohorte!: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  created_at!: Date;
}
