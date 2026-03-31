import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Estudiante } from './entidades/estudiante.entity';
import { EstudiantesRepository } from './estudiantes.repository';

@Module({
imports: [TypeOrmModule.forFeature([Estudiante])],
providers: [EstudiantesRepository],
exports: [EstudiantesRepository],
})
export class EstudiantesModule {}