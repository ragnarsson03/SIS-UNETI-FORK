import { Test, TestingModule } from '@nestjs/testing';
import { AdminService } from './admin.service';
import { UsuariosRepository } from '../usuarios/usuarios.repository';
import { DocentesRepository } from '../docentes/docentes.repository';
import { EstudiantesRepository } from '../estudiantes/estudiantes.repository';

describe('AdminService', () => {
  let service: AdminService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        AdminService,
        { provide: UsuariosRepository, useValue: {} },
        { provide: DocentesRepository, useValue: {} },
        { provide: EstudiantesRepository, useValue: {} },
      ],
    }).compile();

    service = app.get<AdminService>(AdminService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
