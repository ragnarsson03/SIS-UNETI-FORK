import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AdminModule } from './admin/admin.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { DocentesModule } from './docentes/docentes.module';
import { EstudiantesModule } from './estudiantes/estudiantes.module';
import { AcademicoModule } from './academico/academico.module';
import { RedisModule } from './common/redis/redis.module';
import { Usuario } from './usuarios/entidades/usuario.entity';
import { Docente } from './docentes/docente.entity';
import { Estudiante } from './estudiantes/estudiantes.entity';
import { PnfCarrera } from './academico/entidades/pnf.entity';
import { Cohorte } from './academico/entidades/cohorte.entity';

// Si tienes RefreshToken, también impórtalo
// import { RefreshToken } from './common/entidades/refresh-token.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_DATABASE || 'data_soberana',
      // ✅ Lista explícita de entidades
      entities: [Usuario, Docente, Estudiante, PnfCarrera, Cohorte],
      synchronize: false,
      logging: process.env.NODE_ENV === 'development',
    }),
    TypeOrmModule.forFeature([Usuario, Docente, Estudiante, PnfCarrera, Cohorte]),
    RedisModule,
    AdminModule,
    UsuariosModule,
    DocentesModule,
    EstudiantesModule,
    AcademicoModule,
  ],
  controllers: [AppController],
})
export class AppModule {}