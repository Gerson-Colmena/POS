import React from 'react';
import TablaCuentasCobrar from './cuentas/TablaCuentasCobrar';

export default function VistaCuentasCobrar() {
    return (
        <div className="p-6 space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Cuentas por Cobrar
                </h2>
                <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
                    Clientes con pagos pendientes o créditos activos
                </p>
            </div>
            <TablaCuentasCobrar />
        </div>
    );
}