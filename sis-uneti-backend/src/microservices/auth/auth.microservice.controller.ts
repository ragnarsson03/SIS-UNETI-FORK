import { Controller, Inject } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from './auth.service.js';

@Controller()
export class AuthMicroserviceController {
  constructor(
    @Inject(AuthService) private readonly authService: AuthService, // 👈 Forzar inyección
  ) {
    console.log('========================================');
    console.log('🎮 [AuthMicroserviceController] Constructor ejecutado');
    console.log(`📦 AuthService disponible? ${!!this.authService}`);
    console.log('========================================');
  }

  @MessagePattern({ cmd: 'auth.login' })
  async handleLogin(@Payload() data: { cedula: string; clave: string }) {
    console.log('========================================');
    console.log(`🔐 [Microservice] Login para cédula: ${data.cedula}`);
    console.log(`🔐 [Microservice] AuthService disponible? ${!!this.authService}`);
    
    if (!this.authService) {
      console.error('❌ [Microservice] AuthService NO inyectado');
      console.log('========================================');
      return { 
        success: false, 
        message: 'Error de configuración del servidor' 
      };
    }
    
    try {
      console.log(`🔐 [Microservice] Llamando a validarCredenciales...`);
      const resultado = await this.authService.validarCredenciales(data);
      console.log(`🔐 [Microservice] Resultado: ${resultado.success ? '✅ ÉXITO' : '❌ FALLÓ'}`);
      console.log('========================================');
      return resultado;
    } catch (error: any) {
      console.error('❌ [Microservice] Error capturado:', error?.message || error);
      console.error('❌ Stack:', error?.stack);
      console.log('========================================');
      return { 
        success: false, 
        message: 'Error interno del servidor al procesar la autenticación' 
      };
    }
  }
}