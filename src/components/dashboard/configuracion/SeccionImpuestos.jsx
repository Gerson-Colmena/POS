import React, { useState } from 'react';
import { Save, Percent } from 'lucide-react';

const impuestosIniciales = [
    { id: 1, nombre: 'IVA', porcentaje: 13, activo: true  },
    { id: 2, nombre: 'IT',  porcentaje: 3,  activo: false },
];

export default function SeccionImpuestos() {
    const [impuestos, setImpuestos] = useState(impuestosIniciales);

    const handleToggle = (id) => {
        setImpuestos(prev => prev.map(imp =>
            imp.id === id ? { ...imp, activo: !imp.activo } : imp
        ));
    };

    const handlePorcentaje = (id, valor) => {
        setImpuestos(prev => prev.map(imp =>
            imp.id === id ? { ...imp, porcentaje: parseFloat(valor) || 0 } : imp
        ));
    };

    const totalImpuesto = impuestos
        .filter(i => i.activo)
        .reduce((acc, i) => acc + i.porcentaje, 0);

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
            <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/30">
                <div className="p-2 rounded-xl bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400">
                    <Percent size={18} />
                </div>
                <div>
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                        Configuración de Impuestos
                    </h3>
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                        Se aplicarán automáticamente en cada venta
                    </p>
                </div>
            </div>

            <div className="p-6 space-y-4">
                {impuestos.map(imp => (
                    <div key={imp.id} className="flex items-center justify-between p-4 rounded-xl border border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/30">
                        <div className="flex items-center gap-3">
                            {/* Toggle */}
                            <button
                                onClick={() => handleToggle(imp.id)}
                                className={`relative w-10 h-5.5 rounded-full transition-colors ${
                                    imp.activo ? 'bg-indigo-600' : 'bg-gray-300 dark:bg-gray-600'
                                }`}
                                style={{ height: '22px', width: '40px' }}
                            >
                                <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                                    imp.activo ? 'translate-x-5' : 'translate-x-0.5'
                                }`} />
                            </button>
                            <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                                {imp.nombre}
                            </span>
                            {!imp.activo && (
                                <span className="text-xs text-gray-400 dark:text-gray-500">
                                    (desactivado)
                                </span>
                            )}
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                type="number"
                                value={imp.porcentaje}
                                onChange={e => handlePorcentaje(imp.id, e.target.value)}
                                disabled={!imp.activo}
                                min="0" max="100"
                                className="w-16 text-center px-2 py-1.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-bold text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-40"
                            />
                            <span className="text-sm text-gray-500 dark:text-gray-400">%</span>
                        </div>
                    </div>
                ))}

                {/* Total */}
                <div className="flex justify-between items-center px-4 py-3 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20">
                    <span className="text-sm font-semibold text-indigo-700 dark:text-indigo-400">
                        Total impuesto aplicado
                    </span>
                    <span className="text-lg font-extrabold text-indigo-700 dark:text-indigo-400">
                        {totalImpuesto}%
                    </span>
                </div>

                <div className="flex justify-end">
                    <button
                        onClick={() => alert('✅ Impuestos guardados (Supabase próximamente)')}
                        className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-all shadow-md"
                    >
                        <Save size={15} />
                        Guardar
                    </button>
                </div>
            </div>
        </div>
    );
}