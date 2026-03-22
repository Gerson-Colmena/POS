import React, { useState } from 'react';
import { Save, Lock } from 'lucide-react';

export default function FormDatosPerfil({ nombre, correo, onGuardarNombre }) {
    const [nuevoNombre, setNuevoNombre] = useState(nombre);

    const handleGuardar = () => {
        if (!nuevoNombre.trim()) { alert('El nombre no puede estar vacío'); return; }
        onGuardarNombre(nuevoNombre.trim());
    };

    const inputClass = "w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500";

    return (
        <div className="space-y-4">
            <h4 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                Información personal
            </h4>

            {/* Nombre editable */}
            <div>
                <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">
                    Nombre
                </label>
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={nuevoNombre}
                        onChange={e => setNuevoNombre(e.target.value)}
                        className={inputClass}
                    />
                    <button
                        onClick={handleGuardar}
                        className="shrink-0 flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-colors"
                    >
                        <Save size={13} /> Guardar
                    </button>
                </div>
            </div>

            {/* Correo solo lectura */}
            <div>
                <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">
                    Correo electrónico
                </label>
                <div className="relative">
                    <input
                        type="email"
                        value={correo}
                        disabled
                        className={`${inputClass} opacity-60 cursor-not-allowed pr-10`}
                    />
                    <Lock size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1.5 flex items-center gap-1">
                    <Lock size={11} />
                    Solo el administrador puede cambiar el correo
                </p>
            </div>
        </div>
    );
}