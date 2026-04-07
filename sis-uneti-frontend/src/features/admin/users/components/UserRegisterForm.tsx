import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { userRegisterSchema, type UserRegisterFormData } from '../model/userSchema';
import { registerUserByRole } from '../api/registerUser';
import { useAuth } from '@/context/AuthContext';
import { useAcademicData } from '../hooks/useAcademicData';

interface UserRegisterFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function UserRegisterForm({ onSuccess, onCancel }: UserRegisterFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const { user } = useAuth();
  const { pnfs, cohortes, isLoading: catalogsLoading } = useAcademicData();

  const { register, handleSubmit, watch, formState: { errors } } = useForm<UserRegisterFormData>({
    resolver: zodResolver(userRegisterSchema),
    mode: 'onTouched',
    reValidateMode: 'onSubmit',
    defaultValues: {
      rol: 'estudiante'
    }
  });

  const selectedRol = watch('rol');

  const onSubmit = async (data: UserRegisterFormData) => {
    setIsLoading(true);
    setServerError(null);

    try {
      // Delegamos la verificación del token y extracción al servicio (registerUserByRole)
      // pasándole lo que tenga el AuthContext o dejando que el servicio use el fallback de localStorage
      await registerUserByRole(data, user?.token || '');
      
      // Reseteamos el formulario temporalmente ante el éxito
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

      <form autoComplete="off" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        
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
              autoComplete="off"
              {...register('nombres')} 
              className={`w-full p-2.5 border rounded-lg outline-none focus:ring-2 focus:ring-primary/20 transition-all ${errors.nombres ? 'border-red-500 focus:border-red-500' : 'border-slate-300 focus:border-primary'}`} 
            />
            {errors.nombres && <span className="text-red-500 text-xs font-medium mt-1 block">{errors.nombres.message}</span>}
          </div>

          {/* Apellidos */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Apellidos</label>
            <input 
              autoComplete="off"
              {...register('apellidos')} 
              className={`w-full p-2.5 border rounded-lg outline-none focus:ring-2 focus:ring-primary/20 transition-all ${errors.apellidos ? 'border-red-500 focus:border-red-500' : 'border-slate-300 focus:border-primary'}`} 
            />
            {errors.apellidos && <span className="text-red-500 text-xs font-medium mt-1 block">{errors.apellidos.message}</span>}
          </div>

          {/* Cédula */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Cédula</label>
            <input 
              autoComplete="off"
              {...register('cedula')} 
              className={`w-full p-2.5 border rounded-lg outline-none focus:ring-2 focus:ring-primary/20 transition-all ${errors.cedula ? 'border-red-500 focus:border-red-500' : 'border-slate-300 focus:border-primary'}`} 
            />
            {errors.cedula && <span className="text-red-500 text-xs font-medium mt-1 block">{errors.cedula.message}</span>}
          </div>

          {/* Teléfono */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Teléfono</label>
            <input 
              autoComplete="off"
              {...register('telefono')} 
              className={`w-full p-2.5 border rounded-lg outline-none focus:ring-2 focus:ring-primary/20 transition-all ${errors.telefono ? 'border-red-500 focus:border-red-500' : 'border-slate-300 focus:border-primary'}`} 
            />
            {errors.telefono && <span className="text-red-500 text-xs font-medium mt-1 block">{errors.telefono.message}</span>}
          </div>

          {/* Email Principal */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-slate-700 mb-1">Correo Electrónico Principal</label>
            <input 
              autoComplete="off"
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

        {/* --- CATÁLOGOS DINÁMICOS POR ROL --- */}
        {selectedRol === 'estudiante' && (
          <div className="bg-blue-50/50 p-5 rounded-lg border border-blue-100/50 space-y-4">
            <h3 className="text-sm font-bold text-blue-900 mb-3 border-b border-blue-100 pb-2">Información Académica del Estudiante</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">PNF a Cursar</label>
                <select
                  {...register('pnfId', { required: 'Debes seleccionar un PNF' })}
                  disabled={catalogsLoading || (!catalogsLoading && pnfs.length === 0)}
                  className="w-full p-2 border rounded-lg bg-white outline-none focus:ring-2 focus:ring-primary/20 text-sm disabled:opacity-60"
                >
                  {catalogsLoading ? (
                    <option value="">Cargando datos académicos...</option>
                  ) : pnfs.length === 0 ? (
                    <option value="">No hay PNFs activos. Contacte administrador</option>
                  ) : (
                    <>
                      <option value="">Selecciona un PNF...</option>
                      {pnfs.map(opt => <option key={opt.id} value={opt.id}>{opt.nombre}</option>)}
                    </>
                  )}
                </select>
                {errors.pnfId && <span className="text-red-500 text-xs mt-1 block">{errors.pnfId.message}</span>}
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Cohorte Asignada</label>
                <select
                  {...register('cohorteId', { required: 'Debes seleccionar una Cohorte' })}
                  disabled={catalogsLoading || (!catalogsLoading && cohortes.length === 0)}
                  className="w-full p-2 border rounded-lg bg-white outline-none focus:ring-2 focus:ring-primary/20 text-sm disabled:opacity-60"
                >
                  {catalogsLoading ? (
                    <option value="">Cargando datos académicos...</option>
                  ) : cohortes.length === 0 ? (
                    <option value="">No hay cohortes activas. Contacte al administrador</option>
                  ) : (
                    <>
                      <option value="">Selecciona una Cohorte...</option>
                      {cohortes.map(opt => <option key={opt.id} value={opt.id}>{opt.nombre}</option>)}
                    </>
                  )}
                </select>
                {errors.cohorteId && <span className="text-red-500 text-xs mt-1 block">{errors.cohorteId.message}</span>}
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Tipo de Ingreso</label>
                <select {...register('tipo_ingreso')} className="w-full p-2 border rounded-lg bg-white outline-none focus:ring-2 focus:ring-primary/20 text-sm">
                  <option value="OPSU">Asignación OPSU</option>
                  <option value="CONGRESO">Ingreso por Congreso</option>
                  <option value="CONVENIO">Ingreso por Convenio</option>
                  <option value="PARTICULAR">Ingreso Particular</option>
                  <option value="TRASLADO">Traslado de Universidad</option>
                  <option value="REINGRESO">Reingreso</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Fecha de Ingreso</label>
                <input type="date" {...register('fecha_ingreso')} defaultValue={new Date().toISOString().split('T')[0]} className="w-full p-2 border rounded-lg bg-white outline-none focus:ring-2 focus:ring-primary/20 text-sm" />
              </div>
            </div>
          </div>
        )}

        {selectedRol === 'docente' && (
          <div className="bg-indigo-50/50 p-5 rounded-lg border border-indigo-100/50 space-y-4">
            <h3 className="text-sm font-bold text-indigo-900 mb-3 border-b border-indigo-100 pb-2">Clasificación Docente</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Categoría Académica</label>
                <select {...register('categoria_academica')} className="w-full p-2 border rounded-lg bg-white outline-none focus:ring-2 focus:ring-primary/20 text-sm">
                  <option value="INSTRUCTOR">Instructor</option>
                  <option value="ASISTENTE">Asistente</option>
                  <option value="AGREGADO">Agregado</option>
                  <option value="ASOCIADO">Asociado</option>
                  <option value="TITULAR">Titular</option>
                  <option value="JUBILADO">Jubilado</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Dedicación Horaria</label>
                <select {...register('dedicacion')} className="w-full p-2 border rounded-lg bg-white outline-none focus:ring-2 focus:ring-primary/20 text-sm">
                  <option value="TIEMPO_COMPLETO">Tiempo Completo</option>
                  <option value="MEDIO_TIEMPO">Medio Tiempo</option>
                  <option value="TIEMPO_HORARIO">Tiempo Horario (TC)</option>
                  <option value="INVITADO">Profesor Invitado</option>
                </select>
              </div>
            </div>
          </div>
        )}

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
