import React from 'react';
import { UserCircle, CheckCircle } from 'lucide-react';

const cuentasSimuladas = [
    { id: 1, cliente: 'Carlos Mendoza',  concepto: 'Compra a crédito #0038', monto: 320.00, vence: '25/03/2025', diasRestantes: 4  },
    { id: 2, cliente: 'Ana Quispe',      concepto: 'Compra a crédito #0031', monto: 150.50, vence: '22/03/2025', diasRestantes: 1  },
    { id: 3, cliente: 'Luis Fernández',  concepto: 'Compra a crédito #0025', monto: 85.00,  vence: '20/03/2025', diasRestantes: -1 },
];

export default function TablaCuentasCobrar() {
    const totalPendiente = cuentasSimuladas.reduce((acc, c) => acc + c.monto, 0);

    return (
        <div className="space-y-4">
            {/* Resumen */}
            <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 rounded-2xl p-5 flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-amber-700 dark:text-amber-400">
                        Total pendiente de cobro
                    </p>
                    <p className="text-3xl font-extrabold text-amber-800 dark:text-amber-300 mt-0.5">
                        Bs. {totalPendiente.toFixed(2)}
                    </p>
                </div>
                <p className="text-sm text-amber-600 dark:text-amber-400">
                    {cuentasSimuladas.length} cuentas activas
                </p>
            </div>

            {/* Lista de cuentas */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
                <div className="p-5 border-b border-gray-100 dark:border-gray-700">
                    <h3 className="text-base font-bold text-gray-900 dark:text-white">
                        Cuentas por Cobrar
                    </h3>
                </div>

                <div className="divide-y divide-gray-50 dark:divide-gray-700/50">
                    {cuentasSimuladas.map((cuenta) => {
                        const vencida = cuenta.diasRestantes < 0;
                        const urgente = cuenta.diasRestantes >= 0 && cuenta.diasRestantes <= 2;

                        return (
                            <div key={cuenta.id} className="flex items-center justify-between px-5 py-4">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400">
                                        <UserCircle size={20} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                                            {cuenta.cliente}
                                        </p>
                                        <p className="text-xs text-gray-400 dark:text-gray-500">
                                            {cuenta.concepto}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="text-right">
                                        <p className="text-sm font-bold text-gray-900 dark:text-white font-mono">
                                            Bs. {cuenta.monto.toFixed(2)}
                                        </p>
                                        <p className={`text-xs font-medium ${
                                            vencida  ? 'text-rose-500'  :
                                            urgente  ? 'text-amber-500' :
                                            'text-gray-400 dark:text-gray-500'
                                        }`}>
                                            {vencida
                                                ? `Venció hace ${Math.abs(cuenta.diasRestantes)} día(s)`
                                                : `Vence en ${cuenta.diasRestantes} día(s)`
                                            }
                                        </p>
                                    </div>
                                    <button
                                        className="p-2 rounded-xl text-gray-400 hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-500/10 transition-colors"
                                        title="Marcar como pagado"
                                    >
                                        <CheckCircle size={18} />
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}