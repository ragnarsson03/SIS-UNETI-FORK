import { Controller, Post, Body, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { CrearCoordinadorDto } from './dto/crear-coordinador.dto';
import { CrearSecretarioDto } from './dto/crear-secretario.dto';
import { CrearDocenteDto } from './dto/crear-docente.dto';
import { CrearEstudianteDto } from './dto/crear-estudiante.dto';
import { Rolees } from '../common/decoradores/roles.decorator';
import { Roles } from '../common/enums/roles.enum';
import { JwtAuthGuard } from '../common/guardias/jwt-auth.guard';
import { RolesGuard } from '../common/guardias/roles.guard';

@ApiTags('Administración de Usuarios')
@Controller('admin/usuarios')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth('access-token')
export class AdminController {
constructor(private readonly adminService: AdminService) {}

@Post('coordinador')
@Roles(Roles.ADMINISTRADOR)
@HttpCode(HttpStatus.CREATED)
@ApiOperation({ summary: 'Crear un nuevo Coordinador de Carrera' })
@ApiResponse({ status: 201, description: 'Coordinador creado exitosamente' })
@ApiResponse({ status: 409, description: 'Cédula o email ya registrado' })
async crearCoordinador(@Body() dto: CrearCoordinadorDto) {
    return this.adminService.crearCoordinador(dto);
}

@Post('secretario')
@Roles(Roles.ADMINISTRADOR)
@HttpCode(HttpStatus.CREATED)
@ApiOperation({ summary: 'Crear un nuevo Secretario de Control de Estudios' })
async crearSecretario(@Body() dto: CrearSecretarioDto) {
    return this.adminService.crearSecretario(dto);
}

@Post('docente')
@Roles(Roles.ADMINISTRADOR)
@HttpCode(HttpStatus.CREATED)
@ApiOperation({ summary: 'Crear un nuevo Docente' })
async crearDocente(@Body() dto: CrearDocenteDto) {
    return this.adminService.crearDocente(dto);
}

@Post('estudiante')
@Roles(Roles.ADMINISTRADOR)
@HttpCode(HttpStatus.CREATED)
@ApiOperation({ summary: 'Crear un nuevo Estudiante' })
async crearEstudiante(@Body() dto: CrearEstudianteDto) {
    return this.adminService.crearEstudiante(dto);
}
}