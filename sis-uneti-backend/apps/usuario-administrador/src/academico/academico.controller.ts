import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AcademicoService } from './academico.service';
import { JwtAuthGuard } from '../common/guardias/jwt-auth.guard';

@ApiTags('Catalogos Academicos')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller('academico')
export class AcademicoController {
  constructor(private readonly academicoService: AcademicoService) {}

  @Get('pnf')
  @ApiOperation({ summary: 'Listar todos los PNFs disponibles' })
  listarPnfs() {
    return this.academicoService.listarPnfs();
  }

  @Get('cohorte')
  @ApiOperation({ summary: 'Listar todas las Cohortes disponibles' })
  listarCohortes() {
    return this.academicoService.listarCohortes();
  }
}
