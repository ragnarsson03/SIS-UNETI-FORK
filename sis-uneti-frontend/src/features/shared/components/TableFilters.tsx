export interface FilterOption {
    label: string;
    value: string;
}

export interface TableFilterConfig {
    name: string;
    label: string;
    options: FilterOption[];
    value: string;
    onChange: (value: string) => void;
}

interface TableFiltersProps {
    filters: TableFilterConfig[];
    onClear: () => void;
}

export function TableFilters({ filters, onClear }: TableFiltersProps) {
    return (
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm mb-8 flex flex-wrap items-end gap-6 mx-4 sm:mx-0">
            {filters.map((filter, index) => (
                <div key={index} className="flex-1 min-w-[200px]">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 px-1">
                        {filter.label}
                    </label>
                    <select 
                        value={filter.value}
                        onChange={(e) => filter.onChange(e.target.value)}
                        className="w-full bg-slate-50 border-slate-200 rounded-xl text-sm font-medium py-2.5 px-4 focus:ring-primary focus:border-primary outline-none transition-all"
                    >
                        {filter.options.map((opt, i) => (
                            <option key={i} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>
                </div>
            ))}
            <div className="pb-1.5 px-2">
                <button 
                    type="button"
                    onClick={onClear}
                    className="text-primary font-bold text-sm hover:underline transition-all"
                >
                    Limpiar filtros
                </button>
            </div>
        </div>
    );
}
