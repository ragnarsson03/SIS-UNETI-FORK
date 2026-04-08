import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PnfCarrera } from './entidades/pnf.entity';
import { Cohorte } from './entidades/cohorte.entity';

@Injectable()
export class AcademicoService {
  constructor(
    @InjectRepository(PnfCarrera)
    private readonly pnfRepo: Repository<PnfCarrera>,
    @InjectRepository(Cohorte)
    private readonly cohorteRepo: Repository<Cohorte>,
  ) {}

  async listarPnfs() {
    const pnfs = await this.pnfRepo.find({ order: { nombre: 'ASC' } });
    return pnfs.map(p => ({ id: p.id, nombre: p.nombre, codigo: p.codigo, tipo_programa: p.tipo_programa }));
  }

  async listarCohortes() {
    const cohortes = await this.cohorteRepo.find({ order: { created_at: 'DESC' } });
    return cohortes.map(c => ({
      id: c.id,
      nombre: c.codigoCohorte,       // e.g. "COH-2026-I-INF"
      codigo_cohorte: c.codigoCohorte,
      pnfId: c.pnfId,
      estado_cohorte: c.estado_cohorte,
    }));
  }
}
