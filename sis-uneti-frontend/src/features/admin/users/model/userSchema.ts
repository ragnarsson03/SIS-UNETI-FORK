import { z } from 'zod';

export const userRegisterSchema = z.object({
  rol: z.enum(['estudiante', 'docente', 'coordinador', 'secretario'], {
    message: 'Debes seleccionar un rol válido'
  }),
  cedula: z.string()
    .min(6, 'La cédula debe tener al menos 6 caracteres')
    .max(20, 'La cédula no puede exceder 20 caracteres'),
  email: z.string()
    .email('Formato de email inválido')
    .max(100, 'El email no puede exceder 100 caracteres'),
  email_alternativo: z.string()
    .email('Formato de email inválido')
    .max(100, 'El email no puede exceder 100 caracteres')
    .optional()
    .or(z.literal('')), // Permite que esté vacío
  password: z.string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .max(255, 'La contraseña no puede exceder 255 caracteres'),
  nombres: z.string()
    .min(2, 'Los nombres son requeridos')
    .max(100, 'Los nombres no pueden exceder 100 caracteres'),
  apellidos: z.string()
    .min(2, 'Los apellidos son requeridos')
    .max(100, 'Los apellidos no pueden exceder 100 caracteres'),
  telefono: z.string()
    .min(10, 'El teléfono debe tener al menos 10 caracteres')
    .max(20, 'El teléfono no puede exceder 20 caracteres')
    .optional()
    .or(z.literal('')),
  
  // -- Tipos requeridos por el backend (Endpoint Estudiantes) -- 
  // Opcionales en el frontend por ahora ya que serán inyectados como mock
  pnfId: z.string().uuid('UUID inválido para PNF').optional(),
  cohorteId: z.string().uuid('UUID inválido para Cohorte').optional(),
  tipo_ingreso: z.enum(['OPSU', 'CONGRESO', 'CONVENIO', 'PARTICULAR', 'TRASLADO', 'REINGRESO']).optional(),
  fecha_ingreso: z.string().optional(),
  
  // -- Tipos requeridos por el backend (Endpoint Docentes) --
  categoria_academica: z.enum(['INSTRUCTOR', 'ASISTENTE', 'AGREGADO', 'ASOCIADO', 'TITULAR', 'JUBILADO']).optional(),
  dedicacion: z.enum(['TIEMPO_COMPLETO', 'MEDIO_TIEMPO', 'TIEMPO_HORARIO', 'INVITADO']).optional(),
});

export type UserRegisterFormData = z.infer<typeof userRegisterSchema>;
