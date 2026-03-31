import { Controller, Post, Body, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { GatewayService } from './gateway.service';
import { CrearUsuarioBaseDto } from 'apps/usuario-administrador/src/common/dto/crear-usuario-base.dto';
import { Rol, ROLES_KEY } from 'apps/usuario-administrador/src/admin/decoradores/roles.decorator';
import { Roles } from 'apps/usuario-administrador/src/common/enums/roles.enum';
import { JwtAuthGuard } from 'apps/usuario-administrador/src/common/guardias/jwt-auth.guard';
import { RolesGuard } from 'apps/usuario-administrador/src/common/guardias/roles.guard';

@ApiTags('Gateway - Administración')
@Controller('api/usuarios')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth('access-token')
export class GatewayController {
constructor(private readonly gatewayService: GatewayService) {}

@Post('coordinador')
@Rol(Roles.ADMINISTRADOR)
@HttpCode(HttpStatus.CREATED)
@ApiOperation({ summary: 'Crear coordinador (vía Gateway → Redis → Admin MS)' })
async crearCoordinador(@Body() dto: CrearUsuarioBaseDto) {
    return this.gatewayService.enviarComando('admin.crear-coordinador', dto);
}

@Post('secretario')
@Rol(Roles.ADMINISTRADOR)
@HttpCode(HttpStatus.CREATED)
async crearSecretario(@Body() dto: CrearUsuarioBaseDto) {
    return this.gatewayService.enviarComando('admin.crear-secretario', dto);
}

@Post('docente')
@Rol(Roles.ADMINISTRADOR)
@HttpCode(HttpStatus.CREATED)
async crearDocente(@Body() dto: CrearUsuarioBaseDto) {
    return this.gatewayService.enviarComando('admin.crear-docente', dto);
}

@Post('estudiante')
@Rol(Roles.ADMINISTRADOR)
@HttpCode(HttpStatus.CREATED)
async crearEstudiante(@Body() dto: CrearUsuarioBaseDto) {
    return this.gatewayService.enviarComando('admin.crear-estudiante', dto);
}
}