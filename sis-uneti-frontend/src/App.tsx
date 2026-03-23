import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import PublicLayout from './layouts/PublicLayout';
import DashboardLayout from './layouts/DashboardLayout';
import LoginPage from './pages/auth/LoginPage';
import PlaceholderPage from './components/common/PlaceholderPage';
import LandingPage from './pages/publica/LandingPage';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* ============================== */}
          {/* 🌐 MÓDULOS DE ZONA PÚBLICA */}
          {/* ============================== */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/auth/login" element={<LoginPage />} />
            <Route path="/consulta-externa" element={<PlaceholderPage titulo="Módulo de Consulta Externa" desc="Portal abierto al público para trazabilidad y validación oficial de documentos y certificados QR de SIS-UNETI." />} />
            <Route path="/recuperar-contrasena" element={<PlaceholderPage titulo="Recuperación de Acceso" desc="Bóveda de reinicio de credenciales vía confirmación de SMS o Correo Institucional." />} />
          </Route>

          {/* ============================== */}
          {/* 🔒 MÓDULOS PRIVADOS (DASHBOARD) */}
          {/* ============================== */}
          <Route element={<DashboardLayout />}>
            
            {/* 👨🎓 ESTUDIANTE */}
            <Route element={<ProtectedRoute allowedRoles={['ESTUDIANTE']} />}>
              <Route path="/estudiante/dashboard" element={<PlaceholderPage titulo="Dashboard Estudiantil" desc="Tu rendimiento académico global, progreso al grado y alertas de inscripciones." />} />
              <Route path="/estudiante/matricula" element={<PlaceholderPage titulo="Proceso de Inscripción" desc="Oferta académica, verificación de prelaciones y registro de Unidades Curriculares." />} />
            </Route>

            {/* 👨🏫 DOCENTE */}
            <Route element={<ProtectedRoute allowedRoles={['DOCENTE']} />}>
              <Route path="/docente/dashboard" element={<PlaceholderPage titulo="Portal Docente" desc="Tus horarios visuales, estado de alertas y sincronización bidireccional con Moodle." />} />
              <Route path="/docente/calificaciones" element={<PlaceholderPage titulo="Carga de Calificaciones" desc="Revisión de actas manuales y automatizadas con firma digital criptográfica." />} />
            </Route>

            {/* 🎓 COORDINADOR */}
            <Route element={<ProtectedRoute allowedRoles={['COORDINADOR']} />}>
              <Route path="/coordinador/dashboard" element={<PlaceholderPage titulo="Control de Escuela" desc="Métrica KPi integral, gestión académica global, planificación de cohortes y PNF." />} />
            </Route>

            {/* 📋 SECRETARÍA */}
            <Route element={<ProtectedRoute allowedRoles={['SECRETARIA']} />}>
              <Route path="/secretaria/dashboard" element={<PlaceholderPage titulo="Control de Estudios Oficial" desc="Bóveda de expedientes físicos y digitales, trámites burocráticos y emisión de constancias." />} />
            </Route>

            {/* ⚙️ ADMINISTRADOR (CÉLULA 01) */}
            <Route element={<ProtectedRoute allowedRoles={['ADMINISTRADOR']} />}>
              <Route path="/admin/dashboard" element={<PlaceholderPage titulo="Consola de Administración de Red" desc="Monitor del Estado General del Sistema, Heartbeats de APIs y usuarios en vivo." />} />
              <Route path="/admin/seguridad" element={<PlaceholderPage titulo="Bóveda de Ciberseguridad" desc="Control maestro de Permisos, Logs de Trazabilidad Forense y prevención de intrusiones corporativas." />} />
            </Route>

          </Route>

          {/* ============================== */}
          {/* ❌ RUTAS NO ENCONTRADAS (404) */}
          {/* ============================== */}
          <Route path="*" element={
            <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center">
              <h1 className="text-6xl font-black text-red-500 mb-4 opacity-75">404</h1>
              <h2 className="text-2xl font-bold text-slate-800">Directiva no localizada o rechazada</h2>
              <p className="mt-2 text-slate-500 text-center max-w-sm">La ruta consultada no existe o no posees los privilegios criptográficos suficientes.</p>
              <a href="/auth/login" className="mt-8 px-8 py-3 bg-slate-900 border border-slate-700 text-white rounded-xl shadow-lg hover:bg-black transition-colors">Volver al Perímetro Seguro</a>
            </div>
          } />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
