import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Docente } from './docente.entity';

@Injectable()
export class DocentesRepository {
constructor(
    @InjectRepository(Docente)
    private readonly repo: Repository<Docente>,
) {}

async crear(datos: Partial<Docente>): Promise<Docente> {
    const docente = this.repo.create(datos);
    return this.repo.save(docente);
}
}