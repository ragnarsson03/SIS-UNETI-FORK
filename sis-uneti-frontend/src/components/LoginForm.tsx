import React, { useState } from 'react';
import { User as UserIcon, Lock, Eye, EyeOff, LogIn, ShieldCheck, GraduationCap, Users, BookOpen, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { UserRole } from '../types/auth';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface LoginFormProps {
  onLogin: (data: any) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

export default function LoginForm({ onLogin, isLoading, error }: LoginFormProps) {
  const [role, setRole] = useState<UserRole>('ESTUDIANTE');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onLogin({ username, password, role });
  };

  const roles: { id: UserRole; label: string; icon: React.ReactNode }[] = [
    { id: 'ADMINISTRADOR', label: 'Administrador', icon: <ShieldCheck className="size-4" /> },
    { id: 'COORDINADOR', label: 'Coordinador', icon: <Users className="size-4" /> },
    { id: 'DOCENTE', label: 'Docente', icon: <BookOpen className="size-4" /> },
    { id: 'ESTUDIANTE', label: 'Estudiante', icon: <GraduationCap className="size-4" /> },
    { id: 'AUDITOR', label: 'Auditor', icon: <ShieldCheck className="size-4" /> },
    { id: 'SECRETARIA', label: 'Secretaría', icon: <Users className="size-4" /> },
  ];

  return (
    <div className="w-full max-w-[1100px] grid grid-cols-1 lg:grid-cols-2 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-slate-100 dark:border-slate-800">
      {/* Left Side - Hero */}
      <div className="hidden lg:flex flex-col justify-between p-12 bg-[#137fec] relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-20 bg-cover bg-center"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1523050338692-7b835a07973f?auto=format&fit=crop&q=80&w=1000")' }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#137fec] via-[#137fec]/95 to-[#0a56a4]/90" />
        
        <div className="relative z-10">
          {/* Logo UNETI */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 inline-block mb-6 border border-white/20">
            <img 
              src="/logo_uneti_fondo_blanco.jpg"
              alt="Logo UNETI"
              className="w-24 h-24 object-contain"
            />
          </div>
          <h1 className="text-white text-4xl font-bold mb-4 leading-tight">Gestión Académica de Vanguardia</h1>
          <p className="text-white/80 text-lg max-w-sm">Bienvenido al sistema integrado de la Universidad Nacional Experimental de las Telecomunicaciones e Informática.</p>
        </div>

        <div className="relative z-10 space-y-4">
          {[
            { icon: <ShieldCheck className="size-4" />, text: "Autenticación Institucional Segura" },
            { icon: <BookOpen className="size-4" />, text: "Seguimiento Académico en Tiempo Real" },
            { icon: <Users className="size-4" />, text: "Integración de Procesos Administrativos" }
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 text-white/90">
              {item.icon}
              <span className="text-sm font-medium">{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right Side - Form (sin cambios) */}
      <div className="p-8 md:p-12 flex flex-col justify-center">
        <div className="mb-8 text-center lg:text-left flex flex-col items-center lg:items-start">
          {/* Logo UNETI para móvil - REEMPLAZADO */}
          <div className="lg:hidden mb-6">
            <img 
              src="https://www.uneti.edu.ve/wp-content/uploads/2023/04/logo-uneti.png"
              alt="Logo UNETI"
              className="w-20 h-20 object-contain mx-auto"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"%3E%3Cpath fill="%23137fec" d="M36.7273 44C33.9891 44 31.6043 39.8386 30.3636 33.69C29.123 39.8386 26.7382 44 24 44C21.2618 44 18.877 39.8386 17.6364 33.69C16.3957 39.8386 14.0109 44 11.2727 44C7.25611 44 4 35.0457 4 24C4 12.9543 7.25611 4 11.2727 4C14.0109 4 16.3957 8.16144 17.6364 14.31C18.877 8.16144 21.2618 4 24 4C26.7382 4 29.123 8.16144 30.3636 14.31C31.6043 8.16144 33.9891 4 36.7273 4C40.7439 4 44 12.9543 44 24C44 35.0457 40.7439 44 36.7273 44Z"%3E%3C/path%3E%3C/svg%3E';
              }}
            />
          </div>
          <h2 className="text-[#0d141b] dark:text-white text-3xl font-bold mb-2">Iniciar Sesión</h2>
          <p className="text-slate-500 dark:text-slate-400">Sistema de Gestión Académica SIS-UNETI</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-3 rounded-lg bg-red-50 border border-red-100 text-red-600 text-sm flex items-start gap-2"
              >
                <AlertCircle className="size-4 mt-0.5 flex-shrink-0" />
                <span>{error}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1" htmlFor="username">
              Usuario / Cédula Institucional
            </label>
            <div className="relative">
              <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 size-5" />
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-[#137fec] focus:border-[#137fec] transition-all dark:text-white outline-none"
                placeholder="Ej: V12345678"
                required
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="password">
                Contraseña
              </label>
              <a href="#" className="text-xs font-semibold text-[#137fec] hover:underline">¿Olvidó su contraseña?</a>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 size-5" />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-12 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-[#137fec] focus:border-[#137fec] transition-all dark:text-white outline-none"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
              </button>
            </div>
          </div>

          <div className="flex items-center">
            <input
              id="remember-me"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-4 w-4 text-[#137fec] focus:ring-[#137fec] border-slate-300 rounded cursor-pointer"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-600 dark:text-slate-400 cursor-pointer">
              Recordar mi sesión
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={cn(
              "w-full py-4 bg-[#137fec] text-white font-bold rounded-xl shadow-lg shadow-[#137fec]/30 hover:bg-[#0a56a4] hover:shadow-[#137fec]/40 hover:-translate-y-0.5 transition-all active:translate-y-0 flex items-center justify-center gap-2",
              isLoading && "opacity-70 cursor-not-allowed translate-y-0 shadow-none"
            )}
          >
            {isLoading ? "Procesando..." : "Ingresar al Sistema"}
            {!isLoading && <LogIn className="size-5" />}
          </button>
        </form>

        <div className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-800 text-center">
          <p className="text-slate-500 dark:text-slate-400 text-xs">
            Al iniciar sesión, usted acepta los <a href="#" className="underline">Términos de Servicio</a> y la <a href="#" className="underline">Política de Privacidad</a>.
            <br />
            ¿Necesita ayuda? <a href="#" className="text-[#137fec] font-semibold">Contacte al Soporte IT UNETI</a>
          </p>
        </div>
      </div>
    </div>
  );
}