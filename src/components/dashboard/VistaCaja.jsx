import React from 'react';
import { CheckCircle, Clock, XCircle, Store } from 'lucide-react';
import { useCaja } from '../../context/CajaContext';

const estadoConfig = {
    abierta:   { label: 'Abierta',    color: 'bg-green-100 dark:bg-green-500/10 text-green-700 dark:text-green-400',  icono: CheckCircle, iconoColor: 'text-green-500' },
    cerrada:   { label: 'Cerrada',    color: 'bg-gray-100  dark:bg-gray-700      text-gray-600  dark:text-gray-400',   icono: XCircle,     iconoColor: 'text-gray-400'  },
    sin_abrir: { label: 'Sin abrir',  color: 'bg-amber-100 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400',  icono: Clock,       iconoColor: 'text-amber-500' },
};

export default function VistaCaja() {
    const { cajas } = useCaja();

    const abiertas  = cajas.filter(c => c.estado === 'abierta').length;
    const cerradas  = cajas.filter(c => c.estado === 'cerrada').length;
    const sinAbrir  = cajas.filter(c => c.estado === 'sin_abrir').length;

    return (
        <div className="p-6 space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Estado de Cajas
                </h2>
                <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
                    Para abrir o cerrar tu caja usa el menú de tu perfil arriba a la derecha
                </p>
            </div>

            {/* Resumen */}
            <div className="grid grid-cols-3 gap-4">
                {[
                    { label: 'Abiertas',  valor: abiertas, color: 'text-green-600 dark:text-green-400' },
                    { label: 'Cerradas',  valor: cerradas, color: 'text-gray-500  dark:text-gray-400'  },
                    { label: 'Sin abrir', valor: sinAbrir, color: 'text-amber-600 dark:text-amber-400' },
                ].map(s => (
                    <div key={s.label} className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-100 dark:border-gray-700 shadow-sm text-center">
                        <p className={`text-3xl font-extrabold ${s.color}`}>{s.valor}</p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{s.label}</p>
                    </div>
                ))}
            </div>

            {/* Tabla de cajas */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-700">
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                        Detalle por sucursal
                    </h3>
                </div>

                <div className="divide-y divide-gray-50 dark:divide-gray-700/50">
                    {cajas.map(caja => {
                        const config = estadoConfig[caja.estado];
                        const Icono  = config.icono;

                        return (
                            <div key={caja.id} className="flex items-center justify-between px-5 py-4 hover:bg-gray-50/50 dark:hover:bg-gray-700/20 transition-colors">
                                {/* Sucursal */}
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-500">
                                        <Store size={18} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-900 dark:text-white">
                                            {caja.sucursal}
                                        </p>
                                        <p className="text-xs text-gray-400 dark:text-gray-500">
                                            {caja.cajero
                                                ? `Cajero: ${caja.cajero}`
                                                : 'Sin cajero asignado'
                                            }
                                        </p>
                                    </div>
                                </div>

                                {/* Horarios */}
                                <div className="flex items-center gap-6 text-xs text-gray-500 dark:text-gray-400">
                                    <div className="text-center">
                                        <p className="text-gray-400 dark:text-gray-500 mb-0.5">Apertura</p>
                                        <p className="font-semibold text-gray-700 dark:text-gray-300">
                                            {caja.horaApertura ?? '—'}
                                        </p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-gray-400 dark:text-gray-500 mb-0.5">Cierre</p>
                                        <p className="font-semibold text-gray-700 dark:text-gray-300">
                                            {caja.horaCierre ?? '—'}
                                        </p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-gray-400 dark:text-gray-500 mb-0.5">Monto cierre</p>
                                        <p className="font-semibold text-gray-700 dark:text-gray-300">
                                            {caja.montoCierre != null ? `Bs. ${caja.montoCierre.toFixed(2)}` : '—'}
                                        </p>
                                    </div>
                                </div>

                                {/* Estado */}
                                <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl ${config.color}`}>
                                    <Icono size={13} className={config.iconoColor} />
                                    {config.label}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}