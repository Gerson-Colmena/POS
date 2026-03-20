import React from 'react';
import { PlusCircle, Edit3 } from 'lucide-react'; // Necesitas instalar lucide-react

export default function TarjetaProducto({ producto }) {
    // Formateador de moneda (Bolivianos en este ejemplo)
    const formatearPrecio = (valor) => {
        return new Intl.NumberFormat('es-BO', { style: 'currency', currency: 'BOB' }).format(valor);
    };

    return (
        // CONTENEDOR DE LA TARJETA (bg, bordes, sombra suave, hover efecto)
        <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        
        {/* 1. SECCIÓN IMAGEN (Con aspect ratio para que todas midan igual) */}
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden bg-gray-100 dark:bg-gray-700">
            <img
            src={producto.imagenUrl}
            alt={producto.nombre}
            // Recreando el efecto de zoom suave de Tailwind UI
            className="h-full w-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
            />
            
            {/* Badge de Stock (Opcional, muy útil para POS) */}
            {producto.stock <= 5 && (
            <div className="absolute top-3 right-3 bg-red-500/90 text-white text-xs font-bold px-3 py-1 rounded-full backdrop-blur-sm">
                Bajo Stock: {producto.stock}
            </div>
            )}
        </div>

        {/* 2. SECCIÓN TEXTO E INFO */}
        <div className="p-5 space-y-2">
            <div className="flex justify-between items-start gap-2">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-200 line-clamp-2 transition-colors">
                {producto.nombre}
            </h3>
            <span className="shrink-0 text-xs font-mono text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-900 px-2 py-0.5 rounded">
                ID: {producto.id}
            </span>
            </div>
            
            <p className="text-xl font-extrabold text-gray-950 dark:text-white transition-colors">
            {formatearPrecio(producto.precio)}
            </p>
        </div>

        {/* 3. SECCIÓN ACCIONES (Footer de la tarjeta) */}
        {/* Recreando el diseño limpio de la imagen, pero añadiendo botones de POS */}
        <div className="px-5 pb-5 pt-1 border-t border-gray-100 dark:border-gray-700/50 mt-1 flex justify-between gap-3 transition-colors">
            
            {/* Botón secundario: Editar (Para Inventario) */}
            <button className="flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors">
            <Edit3 size={14} />
            Editar
            </button>

            {/* Botón primario: Añadir (Para Ventas) */}
            <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-1 py-2 rounded-lg shadow-sm transition-all active:scale-95">
            <PlusCircle size={18} />
            Vender
            </button>
        </div>
        </div>
    );
}