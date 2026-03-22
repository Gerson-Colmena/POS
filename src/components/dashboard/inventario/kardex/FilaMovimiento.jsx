import React from 'react';
import { TrendingUp, TrendingDown, ArrowLeftRight, ShoppingCart } from 'lucide-react';

const tipoConfig = {
    entrada:      { icono: TrendingUp,       color: 'text-green-500',  bg: 'bg-green-50 dark:bg-green-500/10',  label: 'Entrada'      },
    salida:       { icono: TrendingDown,     color: 'text-rose-500',   bg: 'bg-rose-50 dark:bg-rose-500/10',    label: 'Venta'        },
    transferencia:{ icono: ArrowLeftRight,   color: 'text-indigo-500', bg: 'bg-indigo-50 dark:bg-indigo-500/10',label: 'Transferencia'},
    ajuste:       { icono: ShoppingCart,     color: 'text-amber-500',  bg: 'bg-amber-50 dark:bg-amber-500/10',  label: 'Ajuste'       },
};

export default function FilaMovimiento({ movimiento }) {
    const config = tipoConfig[movimiento.tipo];
    const Icono  = config.icono;

    return (
        <tr className="hover:bg-gray-50/50 dark:hover:bg-gray-700/20 transition-colors">
            <td className="px-5 py-3.5">
                <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold ${config.bg} ${config.color}`}>
                    <Icono size={11} />
                    {config.label}
                </div>
            </td>
            <td className="px-5 py-3.5 text-sm font-medium text-gray-800 dark:text-gray-200">
                {movimiento.producto}
            </td>
            <td className="px-5 py-3.5 text-sm text-gray-500 dark:text-gray-400">
                {movimiento.usuario}
            </td>
            <td className="px-5 py-3.5 font-mono text-sm font-bold">
                <span className={movimiento.tipo === 'salida' ? 'text-rose-500' : 'text-green-500'}>
                    {movimiento.tipo === 'salida' ? '-' : '+'}{movimiento.cantidad} uds.
                </span>
            </td>
            <td className="px-5 py-3.5 text-sm text-gray-500 dark:text-gray-400">
                {movimiento.detalle}
            </td>
            <td className="px-5 py-3.5 text-xs text-gray-400 dark:text-gray-500 font-mono">
                {movimiento.fecha}
            </td>
        </tr>
    );
}