import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Estudiante } from './entidades/estudiante.entity';

@Injectable()
export class EstudiantesRepository {
constructor(
    @InjectRepository(Estudiante)
    private readonly estudianteRepository: Repository<Estudiante>,
) {}

async crear(datos: Partial<Estudiante>): Promise<Estudiante> {
    const estudiante = this.estudianteRepository.create(datos);
    return this.estudianteRepository.save(estudiante);
}

async buscarPorUsuarioId(usuarioId: string): Promise<Estudiante | null> {
    return this.estudianteRepository.findOne({ where: { usuarioId } });
}

async buscarPorCedula(cedula: string): Promise<Estudiante | null> {
    return this.estudianteRepository
    .createQueryBuilder('e')
    .innerJoinAndSelect('e.usuario', 'u')
    .where('u.cedula = :cedula', { cedula })
    .getOne();
}
}