import React from 'react';
import SeccionImpuestos from './configuracion/SeccionImpuestos';
import SeccionTicket from './configuracion/SeccionTicket';

export default function VistaPreferencias() {
    return (
        <div className="p-6 space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Preferencias del Sistema
                </h2>
                <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
                    Impuestos, tickets y comportamiento general del POS
                </p>
            </div>
            <SeccionImpuestos />
            <SeccionTicket />
        </div>
    );
}