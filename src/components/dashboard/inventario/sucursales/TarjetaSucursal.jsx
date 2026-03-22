import React from 'react';
import { Store, Package, ArrowLeftRight } from 'lucide-react';

export default function TarjetaSucursal({ sucursal, onTransferir }) {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700 shadow-sm">
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                        <Store size={20} />
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-gray-900 dark:text-white">{sucursal.nombre}</h3>
                        <p className="text-xs text-gray-400 dark:text-gray-500">{sucursal.direccion}</p>
                    </div>
                </div>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-lg ${
                    sucursal.activa
                    ? 'bg-green-100 dark:bg-green-500/10 text-green-700 dark:text-green-400'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-500'
                }`}>
                    {sucursal.activa ? 'Activa' : 'Inactiva'}
                </span>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-3">
                    <div className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500 mb-1">
                        <Package size={11} /> Productos
                    </div>
                    <p className="text-xl font-extrabold text-gray-900 dark:text-white">{sucursal.totalProductos}</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-3">
                    <div className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500 mb-1">
                        <Package size={11} /> Unidades
                    </div>
                    <p className="text-xl font-extrabold text-gray-900 dark:text-white">{sucursal.totalUnidades}</p>
                </div>
            </div>

            <button
                onClick={() => onTransferir(sucursal)}
                className="w-full flex items-center justify-center gap-2 text-sm font-semibold py-2.5 rounded-xl border border-indigo-200 dark:border-indigo-500/30 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-colors"
            >
                <ArrowLeftRight size={15} />
                Transferir mercadería
            </button>
        </div>
    );
}