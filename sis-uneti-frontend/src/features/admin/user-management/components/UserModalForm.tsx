import { useState } from 'react';
import { UnetiRole } from '../types';

interface UserModalFormProps {
    onClose: () => void;
    onSubmit: (data: any) => void;
}

export const UserModalForm = ({ onClose, onSubmit }: UserModalFormProps) => {
    const [rol, setRol] = useState<UnetiRole>('ESTUDIANTE');

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
            <div className="glass-card rounded-card w-full max-w-2xl bg-white/95 dark:bg-slate-900/95 shadow-2xl border border-white/20 p-8 relative animate-in fade-in zoom-in-95 duration-200">

                <button onClick={onClose} className="absolute top-6 right-6 text-slate-400 hover:text-uneti-orange transition-colors font-black text-xl">✕</button>
                <h2 className="text-2xl font-black text-uneti-blue dark:text-white mb-6">Registrar Usuario</h2>

                <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onSubmit({}); }}>
                    {/* Fila 1: Datos Base */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Nombre Completo</label>
                            <input type="text" className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-uneti-blue/50 outline-none" placeholder="Ej. Ana Pérez" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Correo Institucional</label>
                            <input type="email" className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-uneti-blue/50 outline-none" placeholder="a.perez@uneti.edu.ve" />
                        </div>
                    </div>

                    {/* Fila 2: Selector Dinámico */}
                    <div className="border-t border-slate-100 dark:border-white/5 pt-6 mt-6">
                        <label className="block text-xs font-bold text-uneti-orange uppercase tracking-widest mb-3">Rol Académico/Administrativo</label>
                        <select
                            value={rol}
                            onChange={(e) => setRol(e.target.value as UnetiRole)}
                            className="w-full bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm font-bold text-uneti-blue dark:text-white focus:border-uneti-orange outline-none transition-all cursor-pointer shadow-sm"
                        >
                            <option value="ESTUDIANTE">🎓 ESTUDIANTE</option>
                            <option value="DOCENTE">📖 DOCENTE</option>
                            <option value="ADMINISTRADOR">🛡️ ADMINISTRADOR</option>
                            <option value="COORDINADOR">📋 COORDINADOR</option>
                            <option value="SECRETARIO">🖋️ SECRETARIO</option>
                        </select>
                    </div>

                    {/* Renderizado Dinámico */}
                    <div className="p-5 bg-slate-50 dark:bg-slate-800/30 rounded-2xl border border-slate-100 dark:border-white/5 shadow-inner">

                        {rol === 'ESTUDIANTE' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in">
                                <div className="md:col-span-2 lg:col-span-1">
                                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">PNF</label>
                                    <select className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none">
                                        <option>Informática</option>
                                        <option>Telecomunicaciones</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Cohorte</label>
                                    <input type="text" className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none" placeholder="2026-I" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Estado SocioE.</label>
                                    <select className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none">
                                        <option>A</option><option>B</option><option>C</option>
                                    </select>
                                </div>
                            </div>
                        )}

                        {rol === 'DOCENTE' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in">
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Escalafón</label>
                                    <select className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm font-bold text-uneti-orange outline-none">
                                        <option>Instructor</option><option>Asistente</option><option>Agregado</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Carga Horaria Max.</label>
                                    <input type="number" className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none" placeholder="Ej. 16 Hrs" />
                                </div>
                            </div>
                        )}

                        {(rol === 'ADMINISTRADOR' || rol === 'COORDINADOR' || rol === 'SECRETARIO') && (
                            <div className="text-center py-4 animate-in fade-in">
                                <span className="material-symbols-outlined text-4xl text-uneti-purple/40 mb-2">admin_panel_settings</span>
                                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Privilegios Administrativos Activos</p>
                            </div>
                        )}

                    </div>

                    <div className="flex justify-end gap-4 pt-4">
                        <button type="button" onClick={onClose} className="px-6 py-3 rounded-xl font-bold text-slate-500 hover:bg-slate-100 transition-colors">Cancelar</button>
                        <button type="submit" className="px-8 py-3 bg-uneti-blue text-white rounded-xl font-black shadow-lg shadow-uneti-blue/30 hover:bg-uneti-orange hover:shadow-uneti-orange/40 transition-all">Registrar Sistema</button>
                    </div>
                </form>
            </div>
        </div>
    );
};
