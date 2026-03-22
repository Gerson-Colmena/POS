import React from 'react';
import { AlertTriangle } from 'lucide-react';
import TarjetaAlerta from './inventario/alertas/TarjetaAlerta';

const productosEnAlerta = [
    { id: 1, nombre: 'Earthen Bottle',    categoria: 'Botellas',    stock: 0, stockMinimo: 10, imagenUrl: 'https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-01.jpg' },
    { id: 2, nombre: 'Mechanical Pencil', categoria: 'Lápices',     stock: 2, stockMinimo: 15, imagenUrl: 'https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-04.jpg' },
    { id: 3, nombre: 'Nomad Tumbler',     categoria: 'Accesorios',  stock: 3, stockMinimo: 10, imagenUrl: 'https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-02.jpg' },
    { id: 4, nombre: 'Jugo Natural',      categoria: 'Bebidas',     stock: 1, stockMinimo: 20, imagenUrl: null },
];

export default function VistaAlertasStock() {
    const sinStock = productosEnAlerta.filter(p => p.stock === 0);
    const stockBajo = productosEnAlerta.filter(p => p.stock > 0);

    return (
        <div className="p-6 space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Alertas de Stock Crítico
                </h2>
                <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
                    Productos que necesitan reabastecimiento urgente
                </p>
            </div>

            {/* Banner resumen */}
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/20 rounded-2xl p-4 flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-rose-100 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400">
                        <AlertTriangle size={20} />
                    </div>
                    <div>
                        <p className="text-2xl font-extrabold text-rose-700 dark:text-rose-400">{sinStock.length}</p>
                        <p className="text-xs text-rose-500 dark:text-rose-500">Sin stock</p>
                    </div>
                </div>
                <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 rounded-2xl p-4 flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400">
                        <AlertTriangle size={20} />
                    </div>
                    <div>
                        <p className="text-2xl font-extrabold text-amber-700 dark:text-amber-400">{stockBajo.length}</p>
                        <p className="text-xs text-amber-500 dark:text-amber-500">Stock bajo</p>
                    </div>
                </div>
            </div>

            {/* Sin stock */}
            {sinStock.length > 0 && (
                <div className="space-y-3">
                    <h3 className="text-sm font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider">
                        🔴 Sin stock
                    </h3>
                    {sinStock.map(p => <TarjetaAlerta key={p.id} producto={p} />)}
                </div>
            )}

            {/* Stock bajo */}
            {stockBajo.length > 0 && (
                <div className="space-y-3">
                    <h3 className="text-sm font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                        🟡 Stock bajo
                    </h3>
                    {stockBajo.map(p => <TarjetaAlerta key={p.id} producto={p} />)}
                </div>
            )}
        </div>
    );
}