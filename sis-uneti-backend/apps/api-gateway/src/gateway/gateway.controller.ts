import { Controller, Post, Body, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { GatewayService } from './gateway.service';
import { CrearUsuarioBaseDto } from '@app/common/common/dto/crear-usuario-base.dto';
import { CrearCoordinadorDto } from 'apps/usuario-administrador/src/admin/dto/crear-coordinador.dto';
import { CrearSecretarioDto } from 'apps/usuario-administrador/src/admin/dto/crear-secretario.dto';
import { CrearDocenteDto } from 'apps/usuario-administrador/src/admin/dto/crear-docente.dto';
import { CrearEstudianteDto } from 'apps/usuario-administrador/src/admin/dto/crear-estudiante.dto';
import { Rol, ROLES_KEY } from '@app/common/admin/decoradores/roles.decorator';
import { Roles } from '@app/common/common/enums/roles.enum';
import { JwtAuthGuard } from '@app/common/common/guardias/jwt-auth.guard';
import { RolesGuard } from '@app/common/common/guardias/roles.guard';

@ApiTags('Gateway - Administración')
@Controller('api/usuarios')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth('access-token')
export class GatewayController {
constructor(private readonly gatewayService: GatewayService) {}

@Post('administrador')
@Rol(Roles.ADMINISTRADOR)
@HttpCode(HttpStatus.CREATED)
@ApiOperation({ summary: 'Crear administrador (vía Gateway → Redis → Admin MS)' })
async crearAdministrador(@Body() dto: CrearUsuarioBaseDto) {
    return this.gatewayService.enviarComando('admin.crear-administrador', dto);
}

@Post('coordinador')
@Rol(Roles.ADMINISTRADOR)
@HttpCode(HttpStatus.CREATED)
@ApiOperation({ summary: 'Crear coordinador (vía Gateway → Redis → Admin MS)' })
async crearCoordinador(@Body() dto: CrearCoordinadorDto) {
    return this.gatewayService.enviarComando('admin.crear-coordinador', dto);
}

@Post('secretario')
@Rol(Roles.ADMINISTRADOR)
@HttpCode(HttpStatus.CREATED)
async crearSecretario(@Body() dto: CrearSecretarioDto) {
    return this.gatewayService.enviarComando('admin.crear-secretario', dto);
}

@Post('docente')
@Rol(Roles.ADMINISTRADOR)
@HttpCode(HttpStatus.CREATED)
async crearDocente(@Body() dto: CrearDocenteDto) {
    return this.gatewayService.enviarComando('admin.crear-docente', dto);
}

@Post('estudiante')
@Rol(Roles.ADMINISTRADOR)
@HttpCode(HttpStatus.CREATED)
async crearEstudiante(@Body() dto: CrearEstudianteDto) {
    return this.gatewayService.enviarComando('admin.crear-estudiante', dto);
}
}