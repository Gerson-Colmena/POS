import React from 'react';

export default function BotonUI({ children, onClick, variante = 'primario', tipo = 'button', icono: Icono }) {
    // Diccionario de estilos según la variante que elijas
    const estilos = {
        primario: 'bg-indigo-600 hover:bg-indigo-700 text-white',
        secundario: 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700',
        peligro: 'bg-red-500 hover:bg-red-600 text-white',
    };

    return (
        <button
        type={tipo}
        onClick={onClick}
        className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all active:scale-95 ${estilos[variante]}`}
        >
        {Icono && <Icono size={16} />}
        {children}
        </button>
    );
}