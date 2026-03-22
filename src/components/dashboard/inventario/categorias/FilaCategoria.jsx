import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';

export default function FilaCategoria({ categoria, onEditar, onEliminar }) {
    return (
        <div className="flex items-center justify-between px-5 py-3.5 hover:bg-gray-50/50 dark:hover:bg-gray-700/20 transition-colors">
            <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: categoria.color }} />
                <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{categoria.nombre}</span>
                <span className="text-xs text-gray-400 dark:text-gray-500">
                    {categoria.totalProductos} productos
                </span>
            </div>
            <div className="flex items-center gap-1">
                <button
                    onClick={() => onEditar(categoria)}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-colors"
                >
                    <Pencil size={14} />
                </button>
                <button
                    onClick={() => onEliminar(categoria)}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors"
                >
                    <Trash2 size={14} />
                </button>
            </div>
        </div>
    );
}