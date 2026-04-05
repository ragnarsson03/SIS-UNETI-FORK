import React from 'react';
import { Card } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface Column<T> {
    header: string;
    key: string;
    render?: (item: T) => React.ReactNode;
    className?: string;
    align?: 'left' | 'center' | 'right';
}

interface DataTableProps<T> {
    columns: Column<T>[];
    data: T[];
    emptyMessage?: string;
    pagination?: {
        total: number;
        current: number;
        onPageChange: (page: number) => void;
    };
}

export function DataTable<T>({ 
    columns, 
    data, 
    emptyMessage = "No se encontraron resultados.",
    pagination 
}: DataTableProps<T>) {
    return (
        <Card className="rounded-2xl shadow-sm border-slate-100 overflow-hidden mx-4 sm:mx-0">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[800px]">
                    <thead className="bg-slate-50/50 border-b border-slate-100">
                        <tr>
                            {columns.map((col, idx) => (
                                <th 
                                    key={idx} 
                                    className={`px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest ${col.align === 'right' ? 'text-right' : ''} ${col.className || ''}`}
                                >
                                    {col.header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {data.length > 0 ? (
                            data.map((item, rowIdx) => (
                                <tr key={rowIdx} className="hover:bg-slate-50/50 transition-colors">
                                    {columns.map((col, colIdx) => (
                                        <td 
                                            key={colIdx} 
                                            className={`px-8 py-5 ${col.align === 'right' ? 'text-right' : ''} ${col.className || ''}`}
                                        >
                                            {col.render ? col.render(item) : (item[col.key as keyof T] as unknown as React.ReactNode)}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={columns.length} className="px-8 py-10 text-center text-slate-400 text-sm italic">
                                    {emptyMessage}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {pagination && (
                <div className="px-8 py-5 bg-slate-50/50 flex items-center justify-between border-t border-slate-100">
                    <p className="text-xs font-medium text-slate-400">
                        Mostrando <span className="text-slate-700">{data.length}</span> de <span className="text-slate-700">{pagination.total}</span> resultados
                    </p>
                    <div className="flex items-center gap-1">
                        <Button 
                            variant="ghost" 
                            size="sm" 
                            className="p-2 text-slate-400" 
                            disabled={pagination.current === 1}
                            onClick={() => pagination.onPageChange(pagination.current - 1)}
                        >
                            <ChevronLeft size={20} />
                        </Button>
                        <button className="w-8 h-8 rounded-lg bg-slate-900 text-white text-xs font-bold">
                            {pagination.current}
                        </button>
                        <Button 
                            variant="ghost" 
                            size="sm" 
                            className="p-2 text-slate-400"
                            disabled={data.length < 10}
                            onClick={() => pagination.onPageChange(pagination.current + 1)}
                        >
                            <ChevronRight size={20} />
                        </Button>
                    </div>
                </div>
            )}
        </Card>
    );
}
