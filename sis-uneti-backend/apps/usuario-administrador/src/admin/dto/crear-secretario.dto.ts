import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { CrearUsuarioBaseDto } from '../../common/dto/crear-usuario-base.dto';
import { Roles } from '../../common/enums/roles.enum';

export class CrearSecretarioDto extends CrearUsuarioBaseDto {
@ApiProperty({ description: 'Unidad administrativa', example: 'Control de Estudios', required: false })
@IsOptional()
unidad_administrativa?: string;

@ApiProperty({ description: 'Rol del usuario (siempre SECRETARIO)', default: Roles.SECRETARIO })
rol: Roles = Roles.SECRETARIO;
}