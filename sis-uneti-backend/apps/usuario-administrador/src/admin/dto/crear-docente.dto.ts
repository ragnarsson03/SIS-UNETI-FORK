import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsInt, Min, Max, IsString } from 'class-validator';
import { CrearUsuarioBaseDto } from '../../common/dto/crear-usuario-base.dto';
import { Roles } from '../../common/enums/roles.enum';

export class CrearDocenteDto extends CrearUsuarioBaseDto {
@ApiProperty({ description: 'Categoría académica', enum: ['INSTRUCTOR', 'ASISTENTE', 'AGREGADO', 'ASOCIADO', 'TITULAR', 'JUBILADO'] })
@IsString()
categoria_academica: string;

@ApiProperty({ description: 'Dedicación', enum: ['TIEMPO_COMPLETO', 'MEDIO_TIEMPO', 'TIEMPO_HORARIO', 'INVITADO'] })
@IsString()
dedicacion: string;

@ApiProperty({ description: 'Escalafón', example: 'I', required: false })
@IsOptional()
@IsString()
escalafon?: string;

@ApiProperty({ description: 'Horas máximas semanales', default: 20 })
@IsOptional()
@IsInt()
@Min(1)
@Max(40)
horas_maximas_semanales?: number;

@ApiProperty({ description: 'Área de especialización', required: false })
@IsOptional()
@IsString()
area_especializacion?: string;

@ApiProperty({ description: 'Rol del usuario (siempre DOCENTE)', default: Roles.DOCENTE })
rol: Roles = Roles.DOCENTE;
}