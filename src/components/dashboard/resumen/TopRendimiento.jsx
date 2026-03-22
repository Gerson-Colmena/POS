import React from 'react';
import { Award, Star } from 'lucide-react';

// Datos simulados — luego vendrán de Supabase
const topProductos = [
    { nombre: 'Earthen Bottle',   unidades: 34, total: 'Bs. 1,632' },
    { nombre: 'Mechanical Pencil', unidades: 28, total: 'Bs. 1,797' },
    { nombre: 'Nomad Tumbler',    unidades: 21, total: 'Bs.   745' },
    { nombre: 'Leather Wallet',   unidades: 15, total: 'Bs.   960' },
];

const topCategorias = [
    { nombre: 'Accesorios', porcentaje: 42 },
    { nombre: 'Botellas',   porcentaje: 28 },
    { nombre: 'Lápices',    porcentaje: 18 },
    { nombre: 'Bebidas',    porcentaje: 12 },
];

// Barra de progreso reutilizable
function BarraProgreso({ porcentaje, color = 'bg-indigo-500' }) {
    return (
        <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-1.5 mt-1">
            <div
                className={`${color} h-1.5 rounded-full transition-all duration-500`}
                style={{ width: `${porcentaje}%` }}
            />
        </div>
    );
}

const coloresCategorias = ['bg-indigo-500', 'bg-violet-500', 'bg-sky-500', 'bg-emerald-500'];

export default function TopRendimiento() {
    return (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">

            {/* TOP PRODUCTOS */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                    <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-500/10 text-amber-500">
                        <Award size={18} />
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                            Productos más vendidos
                        </h3>
                        <p className="text-xs text-gray-400 dark:text-gray-500">Top 4 del mes</p>
                    </div>
                </div>

                <div className="space-y-3">
                    {topProductos.map((producto, index) => (
                        <div key={index} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <span className={`text-xs font-bold w-5 text-center ${
                                    index === 0
                                    ? 'text-amber-500'
                                    : 'text-gray-400 dark:text-gray-500'
                                }`}>
                                    #{index + 1}
                                </span>
                                <div>
                                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                                        {producto.nombre}
                                    </p>
                                    <p className="text-xs text-gray-400 dark:text-gray-500">
                                        {producto.unidades} unidades
                                    </p>
                                </div>
                            </div>
                            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 font-mono">
                                {producto.total}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* CATEGORÍA ESTRELLA */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                    <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-500">
                        <Star size={18} />
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                            Categorías estrella
                        </h3>
                        <p className="text-xs text-gray-400 dark:text-gray-500">Por volumen de ventas</p>
                    </div>
                </div>

                <div className="space-y-4">
                    {topCategorias.map((cat, index) => (
                        <div key={index}>
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    {cat.nombre}
                                </span>
                                <span className="text-xs font-bold text-gray-500 dark:text-gray-400">
                                    {cat.porcentaje}%
                                </span>
                            </div>
                            <BarraProgreso
                                porcentaje={cat.porcentaje}
                                color={coloresCategorias[index]}
                            />
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}