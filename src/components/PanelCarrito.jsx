import React from 'react'; // ¡Ya no hay useState!
import { FileText, Trash2 } from 'lucide-react';

// El componente ahora es "tonto": solo dibuja lo que el Padre le manda
export default function PanelCarrito({ itemsCarrito=[], onEliminarItem }) {
    
    // El total se calcula usando los datos que llegaron desde el Padre
    const total = itemsCarrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);

    const handleFinalizarCompra = () => {
        if (itemsCarrito.length === 0) {
            alert('El carrito está vacío. Añade productos primero.');
            return;
        }
        alert('Generando Ticket en PDF y registrando venta en base de datos...');
    };

    return (
        <div className="flex flex-col h-full bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden transition-colors">
        
        {/* Cabecera del Carrito */}
        <div className="p-5 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 flex justify-between items-center">
            <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">Orden Actual</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">Ticket #0045</p>
            </div>
            {/* Pequeño contador de items */}
            <span className="bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 text-xs font-bold px-2.5 py-1 rounded-lg">
                {itemsCarrito.length} items
            </span>
        </div>

        {/* 1er DIV INTERNO: La lista con Scroll */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 custom-scrollbar">
            
            {/* Mensaje si el carrito está vacío */}
            {itemsCarrito.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-400 dark:text-gray-500 space-y-2">
                    <FileText size={48} className="opacity-20" />
                    <p>El carrito está vacío</p>
                </div>
            ) : (
                // Si hay items, los dibujamos
                itemsCarrito.map((item) => (
                <div key={item.id} className="flex justify-between items-center bg-gray-50 dark:bg-gray-900/50 p-3 rounded-xl border border-gray-100 dark:border-gray-700/50 group">
                    <div className="flex-1">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">{item.nombre}</h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400 font-mono">Bs. {item.precio} x {item.cantidad}</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="font-semibold text-gray-900 dark:text-white">
                            Bs. {(item.precio * item.cantidad).toFixed(2)}
                        </span>
                        
                        {/* APLICAMOS LA FUNCIÓN QUE VINO DEL PADRE */}
                        <button 
                            onClick={() => onEliminarItem(item.id)}
                            className="text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 p-1.5 rounded-lg transition-colors"
                            title="Eliminar producto"
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>
                </div>
                ))
            )}
        </div>

        {/* 2do DIV INTERNO: Totales y Botón */}
        <div className="p-5 bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] dark:shadow-none z-10">
            <div className="flex justify-between items-center mb-4">
                <span className="text-gray-500 dark:text-gray-400 font-medium">Total a cobrar</span>
                <span className="text-3xl font-extrabold text-gray-900 dark:text-white">
                    Bs. {total.toFixed(2)}
                </span>
            </div>
            
            <button 
                onClick={handleFinalizarCompra}
                className={`w-full flex items-center justify-center gap-2 font-bold py-4 rounded-xl shadow-md transition-all active:scale-[0.98] ${
                    itemsCarrito.length === 0 
                    ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed shadow-none' 
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                }`}
                disabled={itemsCarrito.length === 0}
            >
                <FileText size={20} />
                Finalizar Compra e Imprimir
            </button>
        </div>

        </div>
    );
}