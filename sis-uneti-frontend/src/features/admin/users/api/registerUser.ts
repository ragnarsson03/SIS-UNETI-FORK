import { UserRegisterFormData } from '../model/userSchema';

export const registerUserByRole = async (data: UserRegisterFormData, token: string) => {
  // Mapeamos el rol visual al endpoint de Fernando
  const endpoints: Record<string, string> = {
    estudiante: 'estudiante',
    docente: 'docente',
    coordinador: 'coordinador',
    secretario: 'secretario'
  };

  const endpoint = endpoints[data.rol];

  if (!endpoint) {
    throw new Error('Rol no reconocido por el sistema');
  }

  // Preparamos payload incluyendo el rol en mayúsculas como espera el DTO
  const { rol, ...basePayload } = data;
  let payload: Record<string, any> = {
    ...basePayload,
    rol: rol.toUpperCase() // Garantiza 'ESTUDIANTE' en lugar de 'estudiante'
  };

  // Interceptor dinámico de Token (previene asincronía de React State)
  const finalToken = token || localStorage.getItem('sis_uneti_token');
  if (!finalToken) {
    throw new Error('No estás autenticado o la sesión expiró (Falta Token).');
  }

  // DEBUG SENIOR: Volcamos el payload para auditar que el DTO sea 100% perfecto
  console.log('📦 PAYLOAD A ENVIAR:', payload);

  // Realizamos petición a API Gateway con Token Bearer
  const response = await fetch(`http://localhost:3000/api/usuarios/${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${finalToken}`
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    let errorMessage = 'Error al registrar en el servidor';
    try {
      const errorData = await response.json();
      if (errorData.message) {
        errorMessage = Array.isArray(errorData.message) ? errorData.message.join(', ') : errorData.message;
      }
    } catch (e) {
      // Ignorar si no es parseable el JSON
    }
    throw new Error(errorMessage);
  }

  return response.json();
};
