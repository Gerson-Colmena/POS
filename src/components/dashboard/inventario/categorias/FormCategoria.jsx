import React, { useState } from 'react';
import { Save, X } from 'lucide-react';

export default function FormCategoria({ categoriaEditar, onGuardar, onCancelar }) {
    
    // ✅ Derivamos el valor inicial directamente, sin useEffect
    const [nombre, setNombre] = useState(categoriaEditar?.nombre ?? '');
    const [color, setColor]   = useState(categoriaEditar?.color  ?? '#6366f1');

    const handleGuardar = () => {
        if (!nombre.trim()) { alert('Escribe un nombre'); return; }
        onGuardar({ nombre: nombre.trim(), color });
        setNombre('');
        setColor('#6366f1');
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700 shadow-sm">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4">
                {categoriaEditar ? 'Editar categoría' : 'Nueva categoría'}
            </h3>
            <div className="space-y-3">
                <div>
                    <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">
                        Nombre
                    </label>
                    <input
                        type="text"
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                        placeholder="Ej: Papelería"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>
                <div>
                    <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">
                        Color identificador
                    </label>
                    <div className="flex items-center gap-3">
                        <input
                            type="color"
                            value={color}
                            onChange={e => setColor(e.target.value)}
                            className="w-10 h-10 rounded-xl border border-gray-200 dark:border-gray-600 cursor-pointer p-0.5 bg-white dark:bg-gray-900"
                        />
                        <span className="text-sm font-mono text-gray-500 dark:text-gray-400">{color}</span>
                        <span className="px-3 py-1 rounded-lg text-white text-xs font-semibold" style={{ backgroundColor: color }}>
                            {nombre || 'Vista previa'}
                        </span>
                    </div>
                </div>

                <div className="flex gap-2 pt-1">
                    <button
                        onClick={handleGuardar}
                        className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold py-2.5 rounded-xl transition-all"
                    >
                        <Save size={15} /> {categoriaEditar ? 'Actualizar' : 'Guardar'}
                    </button>
                    {categoriaEditar && (
                        <button
                            onClick={onCancelar}
                            className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                            <X size={15} />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}