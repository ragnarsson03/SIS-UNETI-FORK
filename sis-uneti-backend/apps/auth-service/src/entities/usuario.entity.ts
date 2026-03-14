# Crear la carpeta base del frontend
mkdir sis - uneti - frontend
cd sis - uneti - frontend

# Crear el árbol de carpetas de React
mkdir - p public
mkdir - p src / assets
mkdir - p src / components / ui
mkdir - p src / components / common
mkdir - p src / components / shared
mkdir - p src / config
mkdir - p src / context
mkdir - p src / features / auth
mkdir - p src / features / inscripciones
mkdir - p src / features / control - estudio
mkdir - p src / hooks
mkdir - p src / layouts
mkdir - p src / pages
mkdir - p src / services
mkdir - p src / store
mkdir - p src / types
mkdir - p src / utils

# Crear los archivos base de configuración(vacíos por ahora para hacer commit)
touch.env
touch tailwind.config.js
touch tsconfig.json

# Volver a la raíz
cd..// apps/auth-service/src/entities/usuario.entity.ts
    import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({ schema: 'seguridad', name: 'usuarios' })
export class Usuario {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true, length: 20 })
    cedula: string;

    @Column({ length: 100 }) // Solo descriptivo como solicitaste
    nombre: string;

    @Column({ length: 100 })
    apellido: string;

    @Column({ unique: true, length: 100, nullable: true })
    email: string;

    @Column({ name: 'password_hash', select: false })
    passwordHash: string;

    @Column({
        type: 'enum',
        enum: ['ESTUDIANTE', 'DOCENTE', 'SECRETARIO', 'COORDINADOR', 'ADMINISTRADOR'],
        default: 'ESTUDIANTE',
        name: 'rol_usuario'
    })
    rol: string;

    @Column({ default: true })
    activo: boolean;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
