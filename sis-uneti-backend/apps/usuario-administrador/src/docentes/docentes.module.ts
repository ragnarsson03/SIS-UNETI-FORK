import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Docente } from './docente.entity';
import { DocentesRepository } from './docentes.repository';

@Module({
imports: [TypeOrmModule.forFeature([Docente])],
providers: [DocentesRepository],
exports: [DocentesRepository],
})
export class DocentesModule {}