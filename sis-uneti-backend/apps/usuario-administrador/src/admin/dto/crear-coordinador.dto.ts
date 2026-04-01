import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsOptional } from 'class-validator';
import { CrearUsuarioBaseDto } from '@app/common/common/dto/crear-usuario-base.dto';
import { Roles } from '@app/common/common/enums/roles.enum';

export class CrearCoordinadorDto extends CrearUsuarioBaseDto {
@ApiProperty({ description: 'ID del PNF que coordina', example: 'uuid-del-pnf' })
@IsUUID()
pnfId: string;

@ApiProperty({ description: 'Rol del usuario (siempre COORDINADOR)', default: Roles.COORDINADOR })
rol: Roles = Roles.COORDINADOR;
}