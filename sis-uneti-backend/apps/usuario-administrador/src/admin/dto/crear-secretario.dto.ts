import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { CrearUsuarioBaseDto } from '@app/common/common/dto/crear-usuario-base.dto';
import { Roles } from '@app/common/common/enums/roles.enum';

export class CrearSecretarioDto extends CrearUsuarioBaseDto {
@ApiProperty({ description: 'Unidad administrativa', example: 'Control de Estudios', required: false })
@IsOptional()
@IsString()
unidad_administrativa?: string;

@ApiProperty({ description: 'Rol del usuario (siempre SECRETARIO)', default: Roles.SECRETARIO })
rol: Roles = Roles.SECRETARIO;
}