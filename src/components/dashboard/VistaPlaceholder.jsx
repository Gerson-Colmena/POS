import React from 'react';
import { HardHat } from 'lucide-react';

export default function VistaPlaceholder({ vistaActiva }) {
    return (
        <div className="h-full flex flex-col items-center justify-center text-gray-300 dark:text-gray-600 select-none">
            <HardHat size={52} className="mb-4 opacity-60" />
            <h2 className="text-xl font-semibold text-gray-400 dark:text-gray-500">
                Módulo en construcción
            </h2>
            <p className="text-sm mt-1 text-gray-400 dark:text-gray-600">
                Próximamente: <span className="font-mono text-indigo-400">{vistaActiva}</span>
            </p>
        </div>
    );
}