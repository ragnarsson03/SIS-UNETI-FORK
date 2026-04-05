import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsString, IsDateString, IsOptional, IsInt, Min, Max, IsIn, IsBoolean } from 'class-validator';
import { CrearUsuarioBaseDto } from '@app/common/common/dto/crear-usuario-base.dto';
import { Roles } from '@app/common/common/enums/roles.enum';

export class CrearEstudianteDto extends CrearUsuarioBaseDto {
@ApiProperty({ description: 'ID de la cohorte', example: 'uuid-de-la-cohorte' })
@IsUUID()
cohorteId: string;

@ApiProperty({ description: 'ID del PNF (carrera)', example: 'uuid-del-pnf' })
@IsUUID()
pnfId: string;

@ApiProperty({ description: 'Tipo de ingreso', enum: ['OPSU', 'CONGRESO', 'CONVENIO', 'PARTICULAR', 'TRASLADO', 'REINGRESO'] })
@IsString()
@IsIn(['OPSU', 'CONGRESO', 'CONVENIO', 'PARTICULAR', 'TRASLADO', 'REINGRESO'])
tipo_ingreso: string;

@ApiProperty({ description: 'Convenio empresa (si aplica)', required: false })
@IsOptional()
@IsString()
convenio_empresa?: string;

@ApiProperty({ description: 'Código OPSU (si aplica)', required: false })
@IsOptional()
@IsString()
codigo_opsu?: string;

@ApiProperty({ description: 'Título de bachiller', required: false })
@IsOptional()
@IsString()
titulo_bachiller_tipo?: string;

@ApiProperty({ description: 'Año de título de bachiller', required: false })
@IsOptional()
@IsInt()
@Min(1970)
@Max(2030)
titulo_bachiller_ano?: number;

@ApiProperty({ description: 'Institución de procedencia', required: false })
@IsOptional()
@IsString()
institucion_procedencia?: string;

@ApiProperty({ description: 'Fecha de ingreso', example: '2026-03-01' })
@IsDateString()
fecha_ingreso: string;

@ApiProperty({ description: 'Nivel socioeconómico', required: false })
@IsOptional()
@IsString()
nivel_socioeconomico?: string;

@ApiProperty({ description: 'Recibe beca', default: false })
@IsOptional()
@IsBoolean()
recibe_beca?: boolean;

@ApiProperty({ description: 'Rol del usuario (siempre ESTUDIANTE)', default: Roles.ESTUDIANTE })
rol: Roles = Roles.ESTUDIANTE;
}