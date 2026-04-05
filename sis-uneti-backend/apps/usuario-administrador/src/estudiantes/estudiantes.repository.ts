import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Estudiante } from './estudiantes.entity';
@Injectable()
export class EstudiantesRepository {
constructor(
    @InjectRepository(Estudiante)
    private readonly repo: Repository<Estudiante>,
) {}

async crear(datos: Partial<Estudiante>): Promise<Estudiante> {
    const estudiante = this.repo.create(datos);
    return this.repo.save(estudiante);
}
}