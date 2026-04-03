import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { DocentesModule } from '../docentes/docentes.module';
import { EstudiantesModule } from '../estudiantes/estudiantes.module';

@Module({
  imports: [UsuariosModule, DocentesModule, EstudiantesModule],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}