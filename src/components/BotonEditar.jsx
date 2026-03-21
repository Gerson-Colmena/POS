import React from 'react';
import { Edit3 } from 'lucide-react'; // Necesitas importar el icono

export default function BotonEditar({ onClick }) {
    return (
        <button 
        onClick={onClick}
        className="flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors active:scale-95"
        >
            <Edit3 size={14} />
            Editar
        </button>
    );
}