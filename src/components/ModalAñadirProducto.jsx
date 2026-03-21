import React from 'react';
import { PackagePlus } from 'lucide-react';
import BotonUI from './BotonUI';

export default function ModalAñadirProducto({ isOpen, onClose, onConfirm }) {
    if (!isOpen) return null; // Si no está abierto, no dibuja nada

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí luego capturaremos los datos del formulario
        onConfirm(); // Simula que se guardó
    };

    return (
        // Fondo oscuro semi-transparente
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 transition-opacity">
        
        {/* Caja del Modal */}
        <div className="bg-white dark:bg-gray-900 w-full max-w-md rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
            
            <div className="p-5 border-b border-gray-100 dark:border-gray-800 flex items-center gap-3">
            <div className="p-2 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-lg">
                <PackagePlus size={24} />
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Añadir Producto</h2>
            </div>

            <form onSubmit={handleSubmit} className="p-5 space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nombre del Producto</label>
                <input required type="text" className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div className="flex gap-4">
                <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Precio (Bs.)</label>
                <input required type="number" step="0.01" className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
                <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Stock</label>
                <input required type="number" className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
            </div>

            {/* Botones de acción usando tu componente */}
            <div className="flex justify-end gap-3 pt-4 mt-2 border-t border-gray-100 dark:border-gray-800">
                <BotonUI variante="secundario" onClick={onClose}>Cancelar</BotonUI>
                <BotonUI tipo="submit" variante="primario">Confirmar y Guardar</BotonUI>
            </div>
            </form>
        </div>
        </div>
    );
}