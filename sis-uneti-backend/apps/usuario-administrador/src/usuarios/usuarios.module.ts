// usuarios/usuarios.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entidades/usuario.entity';
import { UsuariosRepository } from './usuarios.repository';

@Module({
imports: [TypeOrmModule.forFeature([Usuario])], // ← Necesario
providers: [UsuariosRepository],
exports: [UsuariosRepository],
})
export class UsuariosModule {}