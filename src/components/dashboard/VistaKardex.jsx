import React, { useState } from 'react';
import { Search } from 'lucide-react';
import FilaMovimiento from './inventario/kardex/FilaMovimiento';

const movimientosSimulados = [
    { id: 1, tipo: 'salida',        producto: 'Earthen Bottle',    usuario: 'Gerson C.',  cantidad: 2,  detalle: 'Venta ticket #0045',              fecha: '21/03/2025 10:32' },
    { id: 2, tipo: 'entrada',       producto: 'Nomad Tumbler',     usuario: 'Gerson C.',  cantidad: 20, detalle: 'Reabastecimiento proveedor',       fecha: '21/03/2025 09:00' },
    { id: 3, tipo: 'transferencia', producto: 'Focus Paper',       usuario: 'María L.',   cantidad: 10, detalle: 'Tienda Principal → Sucursal Norte', fecha: '20/03/2025 16:40' },
    { id: 4, tipo: 'salida',        producto: 'Mechanical Pencil', usuario: 'María L.',   cantidad: 1,  detalle: 'Venta ticket #0043',              fecha: '20/03/2025 14:10' },
    { id: 5, tipo: 'ajuste',        producto: 'Leather Wallet',    usuario: 'Gerson C.',  cantidad: 3,  detalle: 'Ajuste por inventario físico',     fecha: '20/03/2025 11:05' },
    { id: 6, tipo: 'entrada',       producto: 'Jugo Natural',      usuario: 'Gerson C.',  cantidad: 50, detalle: 'Reabastecimiento proveedor',       fecha: '19/03/2025 08:30' },
];

export default function VistaKardex() {
    const [busqueda, setBusqueda] = useState('');
    const [filtroTipo, setFiltroTipo] = useState('todos');

    const movimientosFiltrados = movimientosSimulados.filter(m => {
        const coincideTexto = m.producto.toLowerCase().includes(busqueda.toLowerCase()) ||
                              m.usuario.toLowerCase().includes(busqueda.toLowerCase());
        const coincideTipo  = filtroTipo === 'todos' || m.tipo === filtroTipo;
        return coincideTexto && coincideTipo;
    });

    return (
        <div className="p-6 space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Kardex / Historial de Movimientos
                </h2>
                <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
                    Registro auditable de todos los movimientos de inventario
                </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
                {/* Filtros */}
                <div className="p-5 border-b border-gray-100 dark:border-gray-700 flex flex-wrap items-center gap-3">
                    <div className="relative flex-1 min-w-48">
                        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            value={busqueda}
                            onChange={e => setBusqueda(e.target.value)}
                            placeholder="Buscar producto o usuario..."
                            className="w-full pl-9 pr-4 py-2 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <div className="flex gap-1.5">
                        {['todos', 'entrada', 'salida', 'transferencia', 'ajuste'].map(tipo => (
                            <button
                                key={tipo}
                                onClick={() => setFiltroTipo(tipo)}
                                className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition-colors ${
                                    filtroTipo === tipo
                                    ? 'bg-indigo-600 text-white'
                                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                                }`}
                            >
                                {tipo}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Tabla */}
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
                                {['Tipo', 'Producto', 'Usuario', 'Cantidad', 'Detalle', 'Fecha'].map(h => (
                                    <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                                        {h}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 dark:divide-gray-700/50">
                            {movimientosFiltrados.map(m => (
                                <FilaMovimiento key={m.id} movimiento={m} />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}