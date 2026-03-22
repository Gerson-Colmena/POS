import React from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid,
    Tooltip, ResponsiveContainer
} from 'recharts';

// Datos simulados — luego vendrán de Supabase
const datosSemana = [
    { dia: 'Lun', ventas: 320 },
    { dia: 'Mar', ventas: 480 },
    { dia: 'Mié', ventas: 210 },
    { dia: 'Jue', ventas: 590 },
    { dia: 'Vie', ventas: 740 },
    { dia: 'Sáb', ventas: 890 },
    { dia: 'Hoy', ventas: 430 },
];

// Tooltip personalizado con tu estilo
const TooltipPersonalizado = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl px-3 py-2 shadow-lg">
                <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
                <p className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
                    Bs. {payload[0].value.toFixed(2)}
                </p>
            </div>
        );
    }
    return null;
};

export default function GraficoVentas() {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700 shadow-sm">
            <div className="flex items-center justify-between mb-5">
                <div>
                    <h3 className="text-base font-bold text-gray-900 dark:text-white">
                        Ventas — Últimos 7 días
                    </h3>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                        Ingresos diarios en Bolivianos
                    </p>
                </div>
                <span className="text-xs bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-400 font-semibold px-2.5 py-1 rounded-lg">
                    Esta semana
                </span>
            </div>

            <ResponsiveContainer width="100%" height={220}>
                <BarChart data={datosSemana} barSize={32}>
                    <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="rgba(156,163,175,0.15)"
                        vertical={false}
                    />
                    <XAxis
                        dataKey="dia"
                        tick={{ fontSize: 12, fill: '#9ca3af' }}
                        axisLine={false}
                        tickLine={false}
                    />
                    <YAxis
                        tick={{ fontSize: 11, fill: '#9ca3af' }}
                        axisLine={false}
                        tickLine={false}
                        tickFormatter={(v) => `${v}`}
                    />
                    <Tooltip content={<TooltipPersonalizado />} cursor={{ fill: 'rgba(99,102,241,0.05)' }} />
                    <Bar
                        dataKey="ventas"
                        fill="#6366f1"
                        radius={[6, 6, 0, 0]}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}   