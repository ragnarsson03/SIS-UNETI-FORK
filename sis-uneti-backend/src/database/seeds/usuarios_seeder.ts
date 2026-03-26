import { DataSource } from 'typeorm';
import { Usuario } from '../../entities/usuario.entity.js'; // Ajusta la ruta si es necesario
import * as bcrypt from 'bcryptjs';

export async function runSeeder(dataSource: DataSource) {
  const usuarioRepo = dataSource.getRepository(Usuario);

  // Verificar si ya existen usuarios para no duplicar datos
  const count = await usuarioRepo.count();
  if (count > 0) {
    console.log('Seeder: Usuarios ya existen en la base de datos, saltando...');
    return;
  }

  const salt = await bcrypt.genSalt(10);
  const passwordPlana = 'Uneti2026*';
  const passwordHash = await bcrypt.hash(passwordPlana, salt);

  // Definición de usuarios para cada rol del sistema
  const demoUsers = [
    {
      cedula: 'V11111111',
      email: 'admin@uneti.edu.ve',
      nombres: 'Admin',
      apellidos: 'SIS-UNETI',
      rol: 'ADMINISTRADOR',
    },
    {
      cedula: 'V22222222',
      email: 'estudiante@uneti.edu.ve',
      nombres: 'Estudiante',
      apellidos: 'Demo',
      rol: 'ESTUDIANTE',
    },
    {
      cedula: 'V33333333',
      email: 'docente@uneti.edu.ve',
      nombres: 'Docente',
      apellidos: 'Demo',
      rol: 'DOCENTE',
    },
    {
      cedula: 'V44444444',
      email: 'coordinador@uneti.edu.ve',
      nombres: 'Coordinador',
      apellidos: 'Demo',
      rol: 'COORDINADOR',
    },
    {
      cedula: 'V55555555',
      email: 'secre@uneti.edu.ve',
      nombres: 'Secretaria',
      apellidos: 'Academica',
      rol: 'SECRETARIA',
    },
    {
      cedula: 'V66666666',
      email: 'auditor@uneti.edu.ve',
      nombres: 'Auditor',
      apellidos: 'Demo',
      rol: 'AUDITOR',
    },
  ];

  for (const userData of demoUsers) {
    const user = usuarioRepo.create({
      ...userData,
      passwordHash,
      salt,
      activo: true,            // Asegura que esté activo
      estadoUsuario: 'ACTIVO'  // Forza el estado solicitado
    });
    await usuarioRepo.save(user);
    console.log(`Usuario creado: ${user.rol} - ${user.cedula}`);
  }

  // Mensajes de confirmación finales solicitados
  console.log('✅ Seed finalizado: Se crearon usuarios para todos los roles.');
  console.log(`🔑 Contraseña universal de prueba: ${passwordPlana}`);
}