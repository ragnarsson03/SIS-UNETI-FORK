import { Controller } from '@nestjs/common';
import { AdminService } from './admin.service';

/**
 * AdminController — solo existe como punto de entrada NestJS.
 * La lógica real se recibe desde Redis (suscripción en main.ts).
 * No expone endpoints HTTP directos (la seguridad la gestiona el api-gateway).
 */
@Controller()
export class AdminController {
  constructor(private readonly adminService: AdminService) {}
}