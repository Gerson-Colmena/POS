import React from 'react';
import BotonEditar from './BotonEditar';
import BotonEliminar from './BotonEliminar';
import { PlusCircle} from 'lucide-react'; // Necesitas instalar lucide-react

export default function TarjetaProducto({ producto, mostrarVender = true, onEditClick, onDeleteClick, onAgregarAlCarrito }) {
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
            {/* USAMOS EL NUEVO BOTÓN MODULAR */}
            <div className="flex gap-4">
                {/* Si nos pasan onEditClick, dibujamos el botón de editar */}
                {onEditClick && <BotonEditar onClick={onEditClick} />}
                
                {/* Si nos pasan onDeleteClick, dibujamos el botón de eliminar */}
                {onDeleteClick && <BotonEliminar onClick={onDeleteClick} />}
            </div>  

            {/* Botón primario: Añadir (Para Ventas) */}
            {/* Solo dibuja el botón si mostrarVender es true */}
            {/* Botón primario: Añadir (Para Ventas) */}
            {mostrarVender && (
                // 2. Añadimos el onClick aquí
                <button 
                    onClick={() => onAgregarAlCarrito(producto)}
                    className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-4 py-2 rounded-lg shadow-sm transition-all active:scale-95"
                >
                    <PlusCircle size={18} />
                    Vender
                </button>
            )}
        </div>
        </div>
    );
}