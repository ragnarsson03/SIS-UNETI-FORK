import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { userRegisterSchema, type UserRegisterFormData } from '../model/userSchema';
import { registerUserByRole } from '../api/registerUser';
import { useAuth } from '@/context/AuthContext';

interface UserRegisterFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function UserRegisterForm({ onSuccess, onCancel }: UserRegisterFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const { user } = useAuth();

  const { register, handleSubmit, formState: { errors } } = useForm<UserRegisterFormData>({
    resolver: zodResolver(userRegisterSchema),
    mode: 'onTouched',
    reValidateMode: 'onSubmit',
    defaultValues: {
      rol: 'estudiante'
    }
  });

  const onSubmit = async (data: UserRegisterFormData) => {
    setIsLoading(true);
    setServerError(null);

    try {
      if (!user?.token) {
        throw new Error('Sesión no detectada. Por seguridad, reingresa al Portal SIS-UNETI.');
      }
      await registerUserByRole(data, user.token);
      if (onSuccess) onSuccess();
    } catch (error: any) {
      setServerError(error.message || 'Ocurrió un error al intentar registrar el usuario. Verifica la conexión con el servidor.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-800">Registro de Nuevo Usuario</h2>
        <p className="text-sm text-slate-500 mt-1">Acople de datos hacia el Gateway bajo estándar FSD</p>
      </div>
      
      {serverError && (
        <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r-md">
          <p className="text-sm font-medium">{serverError}</p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        
        {/* Selector de Rol Modularizado */}
        <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
          <label className="block text-sm font-semibold text-primary-dark mb-2">Rol dentro del Sistema UNETI</label>
          <select 
            {...register('rol')}
            className={`w-full p-2.5 bg-white border rounded-lg outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium text-slate-700 ${errors.rol ? 'border-red-500 focus:border-red-500' : 'border-slate-300 focus:border-primary'}`}
          >
            <option value="estudiante">Estudiante Académico</option>
            <option value="docente">Docente / Profesor</option>
            <option value="coordinador">Coordinador de PNF</option>
            <option value="secretario">Secretariado Académico</option>
          </select>
          {errors.rol && <span className="text-red-500 text-xs font-medium mt-1 block">{errors.rol.message}</span>}
        </div>

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
              autoComplete="new-password"
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
            {isLoading ? 'Registrando en Gateway...' : 'Registrar Usuario'}
          </button>
        </div>
      </form>
    </div>
  );
}
