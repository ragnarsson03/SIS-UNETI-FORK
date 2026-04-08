import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AcademicoController } from './academico.controller';
import { AcademicoService } from './academico.service';
import { PnfCarrera } from './entidades/pnf.entity';
import { Cohorte } from './entidades/cohorte.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PnfCarrera, Cohorte])],
  controllers: [AcademicoController],
  providers: [AcademicoService],
  exports: [AcademicoService],
})
export class AcademicoModule {}
