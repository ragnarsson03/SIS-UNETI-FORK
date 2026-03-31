import { IsEmail, IsString, MinLength, MaxLength, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Roles } from '../enums/roles.enum';

/**
 * DTO base para creación de cualquier tipo de usuario
 * Contiene los campos comunes a todos los roles
 */
export class CrearUsuarioBaseDto {
@ApiProperty({ description: 'Cédula de identidad', example: 'V-12345678', required: true })
@IsString()
@MinLength(6)
@MaxLength(20)
cedula: string;

@ApiProperty({ description: 'Correo electrónico institucional', example: 'juan.perez@uneti.edu.ve', required: true })
@IsEmail()
email: string;

@ApiProperty({ description: 'Contraseña temporal', example: 'Temporal123', required: true })
@IsString()
@MinLength(8)
password: string;

@ApiProperty({ description: 'Nombres completos', example: 'Juan Carlos', required: true })
@IsString()
@MinLength(2)
nombres: string;

@ApiProperty({ description: 'Apellidos completos', example: 'Pérez González', required: true })
@IsString()
@MinLength(2)
apellidos: string;

@ApiProperty({ description: 'Teléfono principal', example: '0412-1234567', required: true })
@IsOptional()
@IsString()
telefono_principal?: string;

@ApiProperty({ description: 'Dirección de residencia', required: true })
@IsOptional()
@IsString()
direccion?: string;

@ApiProperty({ description: 'Rol a asignar', enum: Roles })
rol: Roles;
}