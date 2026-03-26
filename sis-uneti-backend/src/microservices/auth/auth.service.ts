import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../../entities/usuario.entity.js';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepo: Repository<Usuario>,
    @Inject('JWT_SERVICE_CUSTOM') private readonly jwtService: JwtService,
  ) {
    console.log('========================================');
    console.log('🏗️ [AuthService] Constructor Ejecutado');
    console.log(`📦 usuarioRepo disponible? ${!!this.usuarioRepo}`);
    console.log(`🔑 jwtService disponible? ${!!this.jwtService}`);
    console.log('========================================');
  }

  async validarCredenciales(dto: { cedula: string; clave: string }) {
    console.log(`🔍 [AuthService] Validando credenciales para: ${dto.cedula}`);
    
    if (!this.jwtService) {
      console.error(`❌ CRÍTICO: jwtService es undefined`);
      throw new Error('JwtService no está disponible');
    }
    
    try {
      const usuario = await this.usuarioRepo.findOne({
        where: { 
          cedula: dto.cedula, 
          activo: true 
        },
        select: ['id', 'cedula', 'passwordHash', 'rol', 'nombres', 'apellidos', 'email']
      });

      if (!usuario) {
        console.log(`❌ Usuario no encontrado: ${dto.cedula}`);
        return { success: false, message: 'Cédula o contraseña incorrecta' };
      }

      console.log(`✅ Usuario encontrado: ${usuario.cedula}, Rol: ${usuario.rol}`);

      const passwordValida = await bcrypt.compare(dto.clave, usuario.passwordHash);
      
      if (!passwordValida) {
        console.log(`❌ Contraseña incorrecta para: ${dto.cedula}`);
        return { success: false, message: 'Cédula o contraseña incorrecta' };
      }

      console.log(`✅ Contraseña válida`);
      console.log(`🎫 Generando token JWT...`);
      
      const payload = {
        sub: usuario.id,
        cedula: usuario.cedula,
        rol: usuario.rol,
        nombre: `${usuario.nombres} ${usuario.apellidos}`
      };

      const token = this.jwtService.sign(payload);
      console.log(`✅ Token generado exitosamente`);

      return {
        success: true,
        user: { 
          id: usuario.id, 
          cedula: usuario.cedula, 
          rol: usuario.rol,
          nombre: `${usuario.nombres} ${usuario.apellidos}`,
          email: usuario.email
        },
        token
      };
      
    } catch (error: any) {
      console.error(`❌ Error en validarCredenciales:`, error?.message || error);
      throw error;
    }
  }
}