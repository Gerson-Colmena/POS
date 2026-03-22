import React from 'react';
import { Hexagon } from 'lucide-react';

export default function LoadingSpinner({ texto = 'Cargando...' }) {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center gap-4">
            
            {/* Logo animado */}
            <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-indigo-100 dark:bg-indigo-500/20 flex items-center justify-center animate-pulse">
                    <Hexagon className="w-8 h-8 text-indigo-600 dark:text-indigo-400 fill-current" />
                </div>
                {/* Anillo giratorio */}
                <div className="absolute -inset-1 rounded-[18px] border-2 border-transparent border-t-indigo-500 animate-spin" />
            </div>

            {/* Texto */}
            <div className="text-center">
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    {texto}
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                    Por favor espera...
                </p>
            </div>

        </div>
    );
}