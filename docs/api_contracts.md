## API Contracts

### 1. Crear Administrador

**Endpoint:** `POST /api/usuarios/administrador`

**Request:**

```json
{
  "cedula": "12345678",
  "email": "[EMAIL_ADDRESS]",
  "password": "password",
  "nombres": "Juan",
  "apellidos": "Perez",
  "telefono_principal": "1234567890",
  "direccion": "Calle 123"
}
```

**Response:**

```json
{
  "id": "uuid",
  "cedula": "12345678",
  "email": "[EMAIL_ADDRESS]",
  "rol": "ADMINISTRADOR",
  "mensaje": "Administrador creado exitosamente."
}
```

### 2. Crear Coordinador

**Endpoint:** `POST /api/usuarios/coordinador`

**Request:**

```json
{
  "cedula": "12345678",
  "email": "[EMAIL_ADDRESS]",
  "password": "password",
  "nombres": "Juan",
  "apellidos": "Perez",
  "telefono_principal": "1234567890",
  "direccion": "Calle 123",
  "pnfId": "uuid"
}
```

**Response:**

```json
{
  "id": "uuid",
  "cedula": "12345678",
  "email": "[EMAIL_ADDRESS]",
  "nombres": "Juan",
  "apellidos": "Perez",
  "rol": "COORDINADOR",
  "pnfId": "uuid",
  "mensaje": "Coordinador creado exitosamente. Se ha enviado un correo con las credenciales temporales."
}
```

### 3. Crear Secretario

**Endpoint:** `POST /api/usuarios/secretario`

**Request:**

```json
{
  "cedula": "12345678",
  "email": "[EMAIL_ADDRESS]",
  "password": "password",
  "nombres": "Juan",
  "apellidos": "Perez",
  "telefono_principal": "1234567890",
  "direccion": "Calle 123",
  "unidad_administrativa": "Control de Estudios"
}
```

**Response:**

```json
{
  "id": "uuid",
  "cedula": "12345678",
  "email": "[EMAIL_ADDRESS]",
  "nombres": "Juan",
  "apellidos": "Perez",
  "rol": "SECRETARIO",
  "unidad_administrativa": "Control de Estudios",
  "mensaje": "Secretario creado exitosamente."
}
```

### 4. Crear Docente

**Endpoint:** `POST /api/usuarios/docente`

**Request:**

```json
{
  "cedula": "12345678",
  "email": "[EMAIL_ADDRESS]",
  "password": "password",
  "nombres": "Juan",
  "apellidos": "Perez",
  "telefono_principal": "1234567890",
  "direccion": "Calle 123",
  "categoria_academica": "Profesor",
  "dedicacion": "Tiempo Completo",
  "escalafon": "1",
  "horas_maximas_semanales": 20,
  "area_especializacion": "Matemáticas"
}
```

**Response:**

```json
{
  "id": "uuid",
  "cedula": "12345678",
  "email": "[EMAIL_ADDRESS]",
  "nombres": "Juan",
  "apellidos": "Perez",
  "rol": "DOCENTE",
  "categoria_academica": "Profesor",
  "dedicacion": "Tiempo Completo",
  "mensaje": "Docente creado exitosamente."
}
```

### 5. Crear Estudiante

**Endpoint:** `POST /api/usuarios/estudiante`

**Request:**

```json
{
  "cedula": "12345678",
  "email": "[EMAIL_ADDRESS]",
  "password": "password",
  "nombres": "Juan",
  "apellidos": "Perez",
  "telefono_principal": "1234567890",
  "direccion": "Calle 123",
  "pnfId": "uuid",
  "cohorteId": "uuid",
  "numero_lista": "123"
}
```

**Response:**

```json
{
  "id": "uuid",
  "cedula": "12345678",
  "email": "[EMAIL_ADDRESS]",
  "nombres": "Juan",
  "apellidos": "Perez",
  "rol": "ESTUDIANTE",
  "pnfId": "uuid",
  "cohorteId": "uuid",
  "numero_lista": "123",
  "mensaje": "Estudiante creado exitosamente."
}
```