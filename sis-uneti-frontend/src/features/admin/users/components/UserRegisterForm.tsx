import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Esquema de validación estricto (Pilar de Seguridad Frontend)
const userSchema = z.object({
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

type UserFormData = z.infer<typeof userSchema>;

interface UserRegisterFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function UserRegisterForm({ onSuccess, onCancel }: UserRegisterFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
  });

  const onSubmit = async (data: UserFormData) => {
    setIsLoading(true);
    setServerError(null);

    try {
      // Aquí conectaremos con el servicio del backend de Fernando más adelante
      console.log('Datos validados por Zod listos para enviar:', data);
      
      // Simulación de petición
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (onSuccess) onSuccess();
    } catch (error) {
      setServerError('Ocurrió un error al intentar registrar el usuario. Verifica la conexión con el servidor.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold text-slate-800 mb-6">Registro de Nuevo Usuario</h2>
      
      {serverError && (
        <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r-md">
          <p className="text-sm font-medium">{serverError}</p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Nombres */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Nombres</label>
            <input 
              {...register('nombres')} 
              className={`w-full p-2.5 border rounded-lg outline-none focus:ring-2 focus:ring-primary/20 transition-all ${errors.nombres ? 'border-red-500 focus:border-red-500' : 'border-slate-300 focus:border-primary'}`} 
            />
            {errors.nombres && <span className="text-red-500 text-xs font-medium mt-1 block">{errors.nombres.message}</span>}
          </div>

          {/* Apellidos */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Apellidos</label>
            <input 
              {...register('apellidos')} 
              className={`w-full p-2.5 border rounded-lg outline-none focus:ring-2 focus:ring-primary/20 transition-all ${errors.apellidos ? 'border-red-500 focus:border-red-500' : 'border-slate-300 focus:border-primary'}`} 
            />
            {errors.apellidos && <span className="text-red-500 text-xs font-medium mt-1 block">{errors.apellidos.message}</span>}
          </div>

          {/* Cédula */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Cédula</label>
            <input 
              {...register('cedula')} 
              className={`w-full p-2.5 border rounded-lg outline-none focus:ring-2 focus:ring-primary/20 transition-all ${errors.cedula ? 'border-red-500 focus:border-red-500' : 'border-slate-300 focus:border-primary'}`} 
            />
            {errors.cedula && <span className="text-red-500 text-xs font-medium mt-1 block">{errors.cedula.message}</span>}
          </div>

          {/* Teléfono */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Teléfono</label>
            <input 
              {...register('telefono')} 
              className={`w-full p-2.5 border rounded-lg outline-none focus:ring-2 focus:ring-primary/20 transition-all ${errors.telefono ? 'border-red-500 focus:border-red-500' : 'border-slate-300 focus:border-primary'}`} 
            />
            {errors.telefono && <span className="text-red-500 text-xs font-medium mt-1 block">{errors.telefono.message}</span>}
          </div>

          {/* Email Principal */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-slate-700 mb-1">Correo Electrónico Principal</label>
            <input 
              type="email"
              {...register('email')} 
              className={`w-full p-2.5 border rounded-lg outline-none focus:ring-2 focus:ring-primary/20 transition-all ${errors.email ? 'border-red-500 focus:border-red-500' : 'border-slate-300 focus:border-primary'}`} 
            />
            {errors.email && <span className="text-red-500 text-xs font-medium mt-1 block">{errors.email.message}</span>}
          </div>

          {/* Contraseña */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-slate-700 mb-1">Contraseña de Acceso</label>
            <input 
              type="password"
              {...register('password')} 
              className={`w-full p-2.5 border rounded-lg outline-none focus:ring-2 focus:ring-primary/20 transition-all ${errors.password ? 'border-red-500 focus:border-red-500' : 'border-slate-300 focus:border-primary'}`} 
            />
            {errors.password && <span className="text-red-500 text-xs font-medium mt-1 block">{errors.password.message}</span>}
          </div>
        </div>

        {/* Botones de acción */}
        <div className="flex justify-end gap-3 pt-6 border-t border-slate-100">
          <button
            type="button"
            onClick={onCancel}
            className="px-5 py-2 border border-slate-300 rounded-lg text-slate-700 font-medium hover:bg-slate-50 active:scale-95 transition-all"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="px-5 py-2 bg-primary text-white font-medium rounded-lg hover:bg-blue-600 shadow-md shadow-primary/20 active:scale-95 transition-all disabled:opacity-50 disabled:pointer-events-none flex items-center"
          >
            {isLoading ? 'Comprobando...' : 'Registrar de forma segura'}
          </button>
        </div>
      </form>
    </div>
  );
}
