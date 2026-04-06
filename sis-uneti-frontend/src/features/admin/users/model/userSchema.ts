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
});

export type UserRegisterFormData = z.infer<typeof userRegisterSchema>;
