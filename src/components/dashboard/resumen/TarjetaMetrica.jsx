import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export default function TarjetaMetrica({ titulo, valor, subtitulo, icono, color = 'indigo', tendencia = 'neutral', porcentaje }) {
    const Icono = icono;    
    const colores = {
        indigo: 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400',
        green:  'bg-green-50  dark:bg-green-500/10  text-green-600  dark:text-green-400',
        amber:  'bg-amber-50  dark:bg-amber-500/10  text-amber-600  dark:text-amber-400',
        rose:   'bg-rose-50   dark:bg-rose-500/10   text-rose-600   dark:text-rose-400',
    };

    const tendenciaConfig = {
        up:      { icono: TrendingUp,   clase: 'text-green-500' },
        down:    { icono: TrendingDown, clase: 'text-rose-500'  },
        neutral: { icono: Minus,        clase: 'text-gray-400'  },
    };

    const { icono: IconoTendencia, clase: claseTendencia } = tendenciaConfig[tendencia];

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
                <div className={`p-2.5 rounded-xl ${colores[color]}`}>
                    <Icono size={20} />
                </div>
                {porcentaje && (
                    <div className={`flex items-center gap-1 text-xs font-semibold ${claseTendencia}`}>
                        <IconoTendencia size={14} />
                        {porcentaje}
                    </div>
                )}
            </div>
            <p className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                {valor}
            </p>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-0.5">
                {titulo}
            </p>
            {subtitulo && (
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                    {subtitulo}
                </p>
            )}
        </div>
    );
}