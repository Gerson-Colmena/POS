import React from 'react';
import { AlertTriangle, Package, ShoppingCart } from 'lucide-react';

export default function TarjetaAlerta({ producto }) {
    const { nombre, categoria, stock, stockMinimo, imagenUrl } = producto;
    const porcentaje = Math.round((stock / stockMinimo) * 100);
    const critico = stock === 0;

    return (
        <div className={`bg-white dark:bg-gray-800 rounded-2xl p-4 border shadow-sm flex items-center gap-4 ${
            critico
            ? 'border-rose-200 dark:border-rose-500/30'
            : 'border-amber-200 dark:border-amber-500/30'
        }`}>
            {/* Imagen */}
            <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-700 shrink-0">
                {imagenUrl
                    ? <img src={imagenUrl} alt={nombre} className="w-full h-full object-cover" />
                    : <Package size={24} className="m-auto mt-4 text-gray-400" />
                }
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-bold text-gray-900 dark:text-white truncate">{nombre}</p>
                    <span className={`shrink-0 text-xs font-bold px-2 py-0.5 rounded-lg ${
                        critico
                        ? 'bg-rose-100 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400'
                        : 'bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400'
                    }`}>
                        {critico ? 'Sin stock' : 'Stock bajo'}
                    </span>
                </div>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{categoria}</p>

                {/* Barra de stock */}
                <div className="mt-2">
                    <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-400 dark:text-gray-500">
                            Stock: <span className="font-bold text-gray-700 dark:text-gray-300">{stock} uds.</span>
                        </span>
                        <span className="text-gray-400 dark:text-gray-500">Mínimo: {stockMinimo}</span>
                    </div>
                    <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-1.5">
                        <div
                            className={`h-1.5 rounded-full transition-all ${critico ? 'bg-rose-500' : 'bg-amber-500'}`}
                            style={{ width: `${Math.min(porcentaje, 100)}%` }}
                        />
                    </div>
                </div>
            </div>

            {/* Botón pedir */}
            <button className="shrink-0 flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-500/20 transition-colors">
                <ShoppingCart size={13} />
                Pedir
            </button>
        </div>
    );
}