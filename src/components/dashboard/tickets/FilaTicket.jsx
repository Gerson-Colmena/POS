import React from 'react';
import { Printer, XCircle } from 'lucide-react';

export default function FilaTicket({ ticket, onReimprimir, onAnular }) {
    return (
        <tr className="hover:bg-gray-50/50 dark:hover:bg-gray-700/20 transition-colors">
            <td className="px-5 py-3.5 font-mono text-xs text-gray-500 dark:text-gray-400">
                #{ticket.id}
            </td>
            <td className="px-5 py-3.5 text-sm font-medium text-gray-800 dark:text-gray-200">
                {ticket.fecha}
            </td>
            <td className="px-5 py-3.5 text-sm text-gray-600 dark:text-gray-400">
                {ticket.cajero}
            </td>
            <td className="px-5 py-3.5 text-sm text-gray-600 dark:text-gray-400">
                {ticket.productos} productos
            </td>
            <td className="px-5 py-3.5 font-mono font-bold text-gray-900 dark:text-white">
                Bs. {ticket.total.toFixed(2)}
            </td>
            <td className="px-5 py-3.5">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg ${
                    ticket.estado === 'Completada'
                    ? 'bg-green-100 dark:bg-green-500/10 text-green-700 dark:text-green-400'
                    : 'bg-rose-100 dark:bg-rose-500/10 text-rose-700 dark:text-rose-400'
                }`}>
                    {ticket.estado}
                </span>
            </td>
            <td className="px-5 py-3.5">
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => onReimprimir(ticket)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-colors"
                        title="Reimprimir ticket"
                    >
                        <Printer size={15} />
                    </button>
                    {ticket.estado === 'Completada' && (
                        <button
                            onClick={() => onAnular(ticket)}
                            className="p-1.5 rounded-lg text-gray-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors"
                            title="Anular venta"
                        >
                            <XCircle size={15} />
                        </button>
                    )}
                </div>
            </td>
        </tr>
    );
}