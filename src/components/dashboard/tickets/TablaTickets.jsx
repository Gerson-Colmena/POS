import React, { useState } from 'react';
import { Search } from 'lucide-react';
import FilaTicket from './FilaTicket';

const ticketsSimulados = [
    { id: '0045', fecha: '21/03/2025 10:32', cajero: 'Gerson C.', productos: 3, total: 147.50, estado: 'Completada' },
    { id: '0044', fecha: '21/03/2025 09:15', cajero: 'Gerson C.', productos: 1, total: 48.00,  estado: 'Completada' },
    { id: '0043', fecha: '20/03/2025 16:40', cajero: 'María L.',  productos: 5, total: 312.70, estado: 'Anulada'   },
    { id: '0042', fecha: '20/03/2025 14:10', cajero: 'María L.',  productos: 2, total: 99.70,  estado: 'Completada' },
    { id: '0041', fecha: '20/03/2025 11:05', cajero: 'Gerson C.', productos: 4, total: 256.80, estado: 'Completada' },
];

export default function TablaTickets() {
    const [busqueda, setBusqueda] = useState('');

    const ticketsFiltrados = ticketsSimulados.filter(t =>
        t.id.includes(busqueda) ||
        t.cajero.toLowerCase().includes(busqueda.toLowerCase()) ||
        t.fecha.includes(busqueda)
    );

    const handleReimprimir = (ticket) => {
        alert(`Reimprimiendo ticket #${ticket.id}... (PDF próximamente)`);
    };

    const handleAnular = (ticket) => {
        if (confirm(`¿Anular venta #${ticket.id} por Bs. ${ticket.total.toFixed(2)}?`)) {
            alert('Venta anulada (integración con Supabase próximamente)');
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
            {/* Header con buscador */}
            <div className="p-5 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between gap-4">
                <div>
                    <h3 className="text-base font-bold text-gray-900 dark:text-white">
                        Historial de Tickets
                    </h3>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                        {ticketsFiltrados.length} ventas encontradas
                    </p>
                </div>
                <div className="relative w-64">
                    <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                        placeholder="Buscar por #, cajero, fecha..."
                        className="w-full pl-9 pr-4 py-2 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>
            </div>

            {/* Tabla */}
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
                            {['# Ticket', 'Fecha', 'Cajero', 'Productos', 'Total', 'Estado', 'Acciones'].map(h => (
                                <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                                    {h}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50 dark:divide-gray-700/50">
                        {ticketsFiltrados.map(ticket => (
                            <FilaTicket
                                key={ticket.id}
                                ticket={ticket}
                                onReimprimir={handleReimprimir}
                                onAnular={handleAnular}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}