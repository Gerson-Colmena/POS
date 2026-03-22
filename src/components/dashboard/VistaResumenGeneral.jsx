import React from 'react';
import { ShoppingCart, DollarSign, Package, Users } from 'lucide-react';
import TarjetaMetrica from './resumen/TarjetaMetrica';
import GraficoVentas from './resumen/GraficoVentas';
import TopRendimiento from './resumen/TopRendimiento';

// Datos simulados de métricas — luego vendrán de Supabase
const metricas = [
    {
        titulo:     'Ventas hoy',
        valor:      'Bs. 1,240',
        subtitulo:  '18 transacciones realizadas',
        icono:      ShoppingCart,
        color:      'indigo',
        tendencia:  'up',
        porcentaje: '+12%',
    },
    {
        titulo:     'Ingresos del mes',
        valor:      'Bs. 28,450',
        subtitulo:  'vs Bs. 24,100 el mes pasado',
        icono:      DollarSign,
        color:      'green',
        tendencia:  'up',
        porcentaje: '+18%',
    },
    {
        titulo:     'Productos en stock',
        valor:      '134',
        subtitulo:  '3 productos con stock crítico',
        icono:      Package,
        color:      'amber',
        tendencia:  'down',
        porcentaje: '-2%',
    },
    {
        titulo:     'Clientes atendidos',
        valor:      '56',
        subtitulo:  'En los últimos 7 días',
        icono:      Users,
        color:      'rose',
        tendencia:  'neutral',
        porcentaje: '0%',
    },
];

export default function VistaResumenGeneral() {
    return (
        <div className="p-6 space-y-6">

            {/* Encabezado */}
            <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Resumen General
                </h2>
                <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
                    Hoy, {new Date().toLocaleDateString('es-BO', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
            </div>

            {/* Fila de métricas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                {metricas.map((m, i) => (
                    <TarjetaMetrica key={i} {...m} />
                ))}
            </div>

            {/* Gráfico */}
            <GraficoVentas />

            {/* Top Rendimiento */}
            <TopRendimiento />

        </div>
    );
}