import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { DocentesModule } from '../docentes/docentes.module';
import { EstudiantesModule } from '../estudiantes/estudiantes.module';
import { AcademicoModule } from '../academico/academico.module';

@Module({
  imports: [UsuariosModule, DocentesModule, EstudiantesModule, AcademicoModule],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}