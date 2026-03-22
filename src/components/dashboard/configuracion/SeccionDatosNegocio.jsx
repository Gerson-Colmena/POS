import React, { useState } from 'react';
import { Save, Store } from 'lucide-react';

export default function SeccionDatosNegocio() {
    const [form, setForm] = useState({
        nombre:    'Mi Tienda Bolivia',
        direccion: 'Av. 6 de Agosto #123, La Paz',
        telefono:  '+591 2 2123456',
        email:     'contacto@mitienda.com',
        nit:       '1234567890',
        ciudad:    'La Paz',
    });

    const handleChange = (campo, valor) => {
        setForm(prev => ({ ...prev, [campo]: valor }));
    };

    const handleGuardar = () => {
        alert('✅ Datos del negocio guardados (Supabase próximamente)');
    };

    const inputClass = "w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500";
    const labelClass = "block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5";

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
            {/* Header */}
            <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/30">
                <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                    <Store size={18} />
                </div>
                <div>
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                        Información del Negocio
                    </h3>
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                        Estos datos aparecerán en los tickets PDF
                    </p>
                </div>
            </div>

            {/* Formulario */}
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                    <label className={labelClass}>Nombre del negocio</label>
                    <input type="text" value={form.nombre}
                        onChange={e => handleChange('nombre', e.target.value)}
                        placeholder="Ej: Mi Tienda Bolivia"
                        className={inputClass} />
                </div>
                <div className="md:col-span-2">
                    <label className={labelClass}>Dirección</label>
                    <input type="text" value={form.direccion}
                        onChange={e => handleChange('direccion', e.target.value)}
                        placeholder="Ej: Av. 6 de Agosto #123"
                        className={inputClass} />
                </div>
                <div>
                    <label className={labelClass}>Teléfono</label>
                    <input type="text" value={form.telefono}
                        onChange={e => handleChange('telefono', e.target.value)}
                        placeholder="+591 2 2123456"
                        className={inputClass} />
                </div>
                <div>
                    <label className={labelClass}>Ciudad</label>
                    <input type="text" value={form.ciudad}
                        onChange={e => handleChange('ciudad', e.target.value)}
                        placeholder="Ej: La Paz"
                        className={inputClass} />
                </div>
                <div>
                    <label className={labelClass}>Correo electrónico</label>
                    <input type="email" value={form.email}
                        onChange={e => handleChange('email', e.target.value)}
                        placeholder="contacto@mitienda.com"
                        className={inputClass} />
                </div>
                <div>
                    <label className={labelClass}>NIT / RUC</label>
                    <input type="text" value={form.nit}
                        onChange={e => handleChange('nit', e.target.value)}
                        placeholder="Ej: 1234567890"
                        className={inputClass} />
                </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-700 flex justify-end">
                <button
                    onClick={handleGuardar}
                    className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-all shadow-md"
                >
                    <Save size={15} />
                    Guardar cambios
                </button>
            </div>
        </div>
    );
}