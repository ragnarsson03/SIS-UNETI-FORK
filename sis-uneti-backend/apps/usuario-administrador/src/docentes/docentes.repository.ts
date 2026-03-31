import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Docente } from './entidades/docente.entity';

@Injectable()
export class DocentesRepository {
constructor(
    @InjectRepository(Docente)
    private readonly docenteRepository: Repository<Docente>,
) {}

async crear(datos: Partial<Docente>): Promise<Docente> {
    const docente = this.docenteRepository.create(datos);
    return this.docenteRepository.save(docente);
}

async buscarPorUsuarioId(usuarioId: string): Promise<Docente | null> {
    return this.docenteRepository.findOne({ where: { usuarioId } });
}
}