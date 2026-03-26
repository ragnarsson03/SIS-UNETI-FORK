import { registerAs } from '@nestjs/config';

export default registerAs('audit', () => ({
  salt: process.env.AUDIT_SALT || 'default_backup_salt_not_recommended',
  validateOnStartup: process.env.AUDIT_VALIDATE_ON_START === 'true',
  excludedEntities: ['SesionUsuario', 'IntentoAutenticacion', 'RefreshToken'],
}));