import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsOptional } from 'class-validator';
import { CrearUsuarioBaseDto } from '../../common/dto/crear-usuario-base.dto';
import { Roles } from '../../common/enums/roles.enum';
import { EmptyToUndefined } from '../../common/decoradores/empty-to-undefined.decorator';

export class CrearCoordinadorDto extends CrearUsuarioBaseDto {
    @ApiProperty({ description: 'ID del PNF que coordina (opcional)', example: 'uuid-del-pnf', required: false })
    @IsOptional()
    @EmptyToUndefined()
    @IsUUID('4', { message: 'pnfId debe ser un UUID v4 válido' })
    pnfId?: string;

    @ApiProperty({ description: 'Rol del usuario (siempre COORDINADOR)', default: Roles.COORDINADOR })
    rol: Roles = Roles.COORDINADOR;
}