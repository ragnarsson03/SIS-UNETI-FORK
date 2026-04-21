import { z } from 'zod';

// ---- Enums del backend ----
export const TIPO_INGRESO = ['OPSU', 'CONGRESO', 'CONVENIO', 'PARTICULAR', 'TRASLADO', 'REINGRESO'] as const;
export const CATEGORIA_ACADEMICA = ['INSTRUCTOR', 'ASISTENTE', 'AGREGADO', 'ASOCIADO', 'TITULAR', 'JUBILADO'] as const;
export const DEDICACION = ['TIEMPO_COMPLETO', 'MEDIO_TIEMPO', 'TIEMPO_HORARIO', 'INVITADO'] as const;

// ---- Schema base (todos los roles) ----
const baseSchema = z.object({
  cedula: z.string().min(6, 'Requerida').max(20),
  email: z.string().email('Correo inválido'),
  password: z.string().min(8, 'Mínimo 8'),
  nombres: z.string().min(2, 'Requerido'),
  apellidos: z.string().min(2, 'Requerido'),
  telefono: z.string().optional(),
  rol: z.enum(['estudiante', 'docente', 'coordinador', 'secretario']),
});

// ---- Schema estudiante ----
const estudianteSchema = baseSchema.extend({
  rol: z.literal('estudiante'),
  pnfId: z.string().uuid('Debe ser un UUID'),
  cohorteId: z.string().uuid('Debe ser un UUID'),
  tipo_ingreso: z.enum(TIPO_INGRESO, { error: 'Requerido' }),
  fecha_ingreso: z.string().min(1, 'Requerido'),
});

// ---- Schema docente ----
const docenteSchema = baseSchema.extend({
  rol: z.literal('docente'),
  categoria_academica: z.enum(CATEGORIA_ACADEMICA, { error: 'Requerida' }),
  dedicacion: z.enum(DEDICACION, { error: 'Requerida' }),
});

// ---- Schema coordinador (puede llevar pnfId opcional) ----
const coordinadorSchema = baseSchema.extend({
  rol: z.literal('coordinador'),
  pnfId: z.preprocess(
    (val) => (val === "" || val === null ? undefined : val),
    z.string().uuid("Debe ser un UUID válido").nullable().optional()
  ),
});

// ---- Schema secretario (solo base) ----
const secretarioSchema = baseSchema.extend({
  rol: z.literal('secretario'),
});

export const userRegisterSchema = z.discriminatedUnion('rol', [
  estudianteSchema,
  docenteSchema,
  coordinadorSchema,
  secretarioSchema,
]);

export type UserRegisterFormData = z.infer<typeof userRegisterSchema>;
