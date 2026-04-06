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

  // Preparamos payload sin el campo de rol
  const { rol, ...payload } = data;

  // Realizamos petición a API Gateway con Token Bearer
  const response = await fetch(`http://localhost:3000/api/usuarios/${endpoint}`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
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
