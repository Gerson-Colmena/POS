import React from 'react';
import TablaTickets from './tickets/TablaTickets';

export default function VistaHistorialTickets() {
    return (
        <div className="p-6 space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Historial de Tickets
                </h2>
                <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
                    Busca, reimprime o anula ventas pasadas
                </p>
            </div>
            <TablaTickets />
        </div>
    );
}