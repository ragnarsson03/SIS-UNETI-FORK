// Barrel principal de la librería @app/common
// Exporta los módulos, servicios y entidades compartidas

export * from './common/redis/redis.module';
export * from './common/redis/redis.service';
export * from './common/enums/roles.enum';
export * from './common/dto/crear-usuario-base.dto';
export * from './common/guardias/jwt-auth.guard';
export * from './common/guardias/roles.guard';
export * from './common/decoradores/public.decorator';
export * from './common/decoradores/usuario-actual.decorator';
export * from './common/decoradores/usuario-autenticado.interface';
export * from './common/decoradores/jwt-payload.interface';
export * from './admin/decoradores/roles.decorator';
export * from './usuarios/entidades/usuario.entity';
export * from './usuarios/entidades/docente.entity';
export * from './usuarios/entidades/estudiante.entity';
