import React from 'react';
import { AlertTriangle } from 'lucide-react';
import BotonUI from './BotonUI'; // ¡Reutilizamos tu botón inteligente!

export default function ModalConfirmacion({ isOpen, onClose, onConfirm, titulo, mensaje }) {
  if (!isOpen) return null;

  return (
    // Fondo oscuro
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
      
      {/* Caja del Modal */}
      <div className="bg-white dark:bg-gray-900 w-full max-w-sm rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden text-center p-6 transition-colors">
        
        {/* Icono de advertencia gigante */}
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-500/20 mb-5">
          <AlertTriangle className="h-8 w-8 text-red-600 dark:text-red-500" />
        </div>
        
        {/* Textos que recibe por props */}
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{titulo}</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">{mensaje}</p>

        {/* Los dos botones usando tu BotonUI */}
        <div className="flex justify-center gap-3">
          <BotonUI variante="secundario" onClick={onClose}>
            Cancelar
          </BotonUI>
          <BotonUI variante="peligro" onClick={onConfirm}>
            Sí, eliminar
          </BotonUI>
        </div>

      </div>
    </div>
  );
}