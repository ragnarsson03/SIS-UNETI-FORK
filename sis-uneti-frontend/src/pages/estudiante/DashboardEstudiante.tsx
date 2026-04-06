//import React from 'react';
// Importaremos los subcomponentes (los crearemos en el paso 2)
// import HeroBienvenida from '../../components/estudiante/dashboard/HeroBienvenida';
// import KpisAcademicos from '../../components/estudiante/dashboard/KpisAcademicos';
// import AccesoCampusMoodle from '../../components/estudiante/dashboard/AccesoCampusMoodle';
// import AccesosRapidos from '../../components/estudiante/dashboard/AccesosRapidos';

export const DashboardEstudiante = () => {
    return (
        <div className="min-h-screen p-6 bg-slate-50">

            {/* 1. Header Dinámico (Estilo Glassmorphism UNETI) */}
            <div className="mb-8">
                {/* <HeroBienvenida /> */}
                <div className="p-8 text-white rounded-2xl bg-gradient-to-r from-[#003366] to-[#00AEEF] shadow-lg">
                    <h1 className="text-3xl font-bold">¡Hola, Usuario! Bienvenido al SIS-UNETI</h1>
                    <p className="mt-2 text-sky-100">Trayecto II • PNF en Informática</p>
                </div>
            </div>

            {/* Grid Principal */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

                {/* Columna Izquierda (Más ancha: KPIs y Moodle) */}
                <div className="space-y-6 lg:col-span-2">

                    {/* 2. Matriz de Indicadores */}
                    <div className="p-6 bg-white border border-gray-100 shadow-sm rounded-2xl">
                        <h2 className="mb-4 text-xl font-semibold text-gray-800">Tu Progreso Académico</h2>
                        {/* <KpisAcademicos /> */}
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                            <div className="p-4 rounded-xl bg-slate-50">Promedio: <strong>18.5</strong></div>
                            <div className="p-4 rounded-xl bg-slate-50">Avance: <strong>45%</strong></div>
                            <div className="p-4 rounded-xl bg-slate-50">UC Inscritas: <strong>5</strong></div>
                        </div>
                    </div>

                    {/* 3. El Puente al Campus Virtual */}
                    {/* <AccesoCampusMoodle /> */}
                    <div className="flex items-center justify-between p-6 text-white bg-gray-900 shadow-md rounded-2xl">
                        <div>
                            <h3 className="text-xl font-bold">Campus Virtual UNETI</h3>
                            <p className="text-gray-400">Accede a tus aulas virtuales en Moodle</p>
                        </div>
                        <a
                            href="https://www.uneti.edu.ve/campus/"
                            target="_blank"
                            rel="noreferrer"
                            className="px-6 py-2 font-semibold transition bg-[#00AEEF] rounded-lg hover:bg-sky-400"
                        >
                            Ingresar a Clases
                        </a>
                    </div>

                </div>

                {/* Columna Derecha (Accesos rápidos y notificaciones) */}
                <div className="space-y-6 lg:col-span-1">

                    {/* 4. Accesos Rápidos según Site Map */}
                    <div className="p-6 bg-white border border-gray-100 shadow-sm rounded-2xl">
                        <h2 className="mb-4 text-xl font-semibold text-gray-800">Accesos Rápidos</h2>
                        {/* <AccesosRapidos /> */}
                        <div className="flex flex-col space-y-3">
                            <button className="p-3 text-left transition rounded-lg bg-slate-50 hover:bg-slate-100 text-[#003366]">📝 Gestión de Matrícula</button>
                            <button className="p-3 text-left transition rounded-lg bg-slate-50 hover:bg-slate-100 text-[#003366]">📄 Récord Académico</button>
                            <button className="p-3 text-left transition rounded-lg bg-slate-50 hover:bg-slate-100 text-[#003366]">🪪 Carnet Digital</button>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
};