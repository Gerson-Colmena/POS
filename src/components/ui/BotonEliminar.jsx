import React from 'react';
import { Trash2 } from 'lucide-react'; // Icono de basurero

export default function BotonEliminar({ onClick }) {
  return (
    <button 
      onClick={onClick}
      className="flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 transition-colors active:scale-95"
    >
      <Trash2 size={14} />
      Eliminar
    </button>
  );
}