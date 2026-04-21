import { useState } from 'react';
import { UnetiPNF } from '../types';
import { Loader2 } from 'lucide-react';

interface PnfModalFormProps {
    onClose: () => void;
    onSubmit: (data: Partial<UnetiPNF>) => void;
}

export function PnfModalForm({ onClose, onSubmit }: PnfModalFormProps) {
    const [formData, setFormData] = useState<Partial<UnetiPNF>>({
        codigo_institucional: '',
        nombre_programa: '',
        trayectos: 4,
        estado_academico: 'Activo'
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulamos un pequeño lag de transición
        setTimeout(() => {
            onSubmit(formData);
        }, 500);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-6 w-full max-w-lg shadow-2xl border border-white/20">
                <h3 className="text-xl font-bold text-slate-800 mb-6">Registrar Nuevo PNF</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Código Institucional</label>
                        <input 
                            required
                            placeholder="Ej. INF-01"
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium py-3 px-4 focus:ring-primary focus:border-primary outline-none transition-all"
                            value={formData.codigo_institucional}
                            onChange={e => setFormData({...formData, codigo_institucional: e.target.value.toUpperCase()})}
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Nombre del Programa</label>
                        <input 
                            required
                            placeholder="Ej. Informática"
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium py-3 px-4 focus:ring-primary focus:border-primary outline-none transition-all"
                            value={formData.nombre_programa}
                            onChange={e => setFormData({...formData, nombre_programa: e.target.value})}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Trayectos (Años)</label>
                            <input 
                                required
                                type="number"
                                min="1"
                                max="6"
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium py-3 px-4 focus:ring-primary focus:border-primary outline-none transition-all"
                                value={formData.trayectos}
                                onChange={e => setFormData({...formData, trayectos: parseInt(e.target.value)})}
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Estado Académico</label>
                            <select 
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium py-3 px-4 focus:ring-primary focus:border-primary outline-none transition-all"
                                value={formData.estado_academico}
                                onChange={e => setFormData({...formData, estado_academico: e.target.value as 'Activo' | 'Inactivo'})}
                            >
                                <option value="Activo">Activo</option>
                                <option value="Inactivo">Inactivo</option>
                            </select>
                        </div>
                    </div>

                    <div className="pt-4 flex gap-3">
                        <button 
                            type="button" 
                            onClick={onClose}
                            className="flex-1 py-3 px-4 bg-slate-100 font-bold text-slate-500 rounded-xl hover:bg-slate-200 transition-colors"
                        >
                            Cancelar
                        </button>
                        <button 
                            type="submit" 
                            disabled={isSubmitting}
                            className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/30 hover:opacity-90 transition-all disabled:opacity-50"
                        >
                            {isSubmitting ? (
                                <><Loader2 className="animate-spin" size={18} /> Procesando...</>
                            ) : (
                                "Crear PNF"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
