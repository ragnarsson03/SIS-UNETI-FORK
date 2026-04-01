1. Frontend hace POST a: http://localhost:3000/api/usuarios/coordinador
                            ↓
2. API Gateway recibe, genera UUID, publica en Redis:
   Channel: admin.crear-coordinador
   Message: { id, replyTo: 'gateway.respuestas', payload }
                            ↓
3. Admin Microservicio (suscrito) recibe y procesa:
   - Crea usuario en seguridad.usuarios
   - Asigna rol en seguridad.usuario_roles
   - Registra datos específicos (si aplica)
   - Publica respuesta en 'gateway.respuestas'
                            ↓
4. API Gateway recibe respuesta y la envía al Frontend