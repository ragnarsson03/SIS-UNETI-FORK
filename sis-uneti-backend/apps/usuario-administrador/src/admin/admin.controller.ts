// apps/usuario-administrador/src/admin/admin.controller.ts
import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AdminService } from './admin.service';
import { AcademicoService } from '../academico/academico.service';
import { CrearCoordinadorDto } from './dto/crear-coordinador.dto';
import { CrearSecretarioDto } from './dto/crear-secretario.dto';
import { CrearDocenteDto } from './dto/crear-docente.dto';
import { CrearEstudianteDto } from './dto/crear-estudiante.dto';

@Controller('admin/usuarios')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly academicoService: AcademicoService,
  ) {}

  // ============================
  // COORDINADOR
  // ============================
  @Post('coordinador')
  @HttpCode(HttpStatus.CREATED)
  async crearCoordinadorHttp(@Body() dto: CrearCoordinadorDto) {
    return this.adminService.crearCoordinador(dto);
  }

  @MessagePattern('admin.crear-coordinador')
  async crearCoordinadorMq(@Payload() dto: CrearCoordinadorDto) {
    return this.adminService.crearCoordinador(dto);
  }

  // ============================
  // SECRETARIO
  // ============================
  @Post('secretario')
  @HttpCode(HttpStatus.CREATED)
  async crearSecretarioHttp(@Body() dto: CrearSecretarioDto) {
    return this.adminService.crearSecretario(dto);
  }

  @MessagePattern('admin.crear-secretario')
  async crearSecretarioMq(@Payload() dto: CrearSecretarioDto) {
    return this.adminService.crearSecretario(dto);
  }

  // ============================
  // DOCENTE
  // ============================
  @Post('docente')
  @HttpCode(HttpStatus.CREATED)
  async crearDocenteHttp(@Body() dto: CrearDocenteDto) {
    return this.adminService.crearDocente(dto);
  }

  @MessagePattern('admin.crear-docente')
  async crearDocenteMq(@Payload() dto: CrearDocenteDto) {
    return this.adminService.crearDocente(dto);
  }

  // ============================
  // ESTUDIANTE
  // ============================
  @Post('estudiante')
  @HttpCode(HttpStatus.CREATED)
  async crearEstudianteHttp(@Body() dto: CrearEstudianteDto) {
    return this.adminService.crearEstudiante(dto);
  }

  @MessagePattern('admin.crear-estudiante')
  async crearEstudianteMq(@Payload() dto: CrearEstudianteDto) {
    return this.adminService.crearEstudiante(dto);
  }

  // ============================
  // CATÁLOGOS ACADÉMICOS
  // ============================
  @MessagePattern('academico.listar-pnfs')
  async listarPnfsMq() {
    return this.academicoService.listarPnfs();
  }

  @MessagePattern('academico.listar-cohortes')
  async listarCohortesMq() {
    return this.academicoService.listarCohortes();
  }
}