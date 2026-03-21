import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import BarraBusqueda from '../components/BarraBusqueda';
import GridProductos from '../components/GridProductos';
import ModalAñadirProducto from '../components/ModalAñadirProducto';
import Notificacion from '../components/Notificacion';
import TarjetaProducto from '../components/TarjetaProducto';

export default function InventarioPage() {
    const [textoBusqueda, setTextoBusqueda] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [notificacion, setNotificacion] = useState({ mensaje: '', tipo: '' });

    // Productos simulados
    const [productosDisponibles] = useState([
        { id: 101, nombre: 'Earthen Bottle', precio: 48.00, stock: 3, imagenUrl: 'https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-01.jpg' },
        // ... tus otros productos ...
    ]);

    // Lógica cuando se confirma el formulario del Modal
    const handleGuardarProducto = () => {
        setIsModalOpen(false); // Cierra el modal
        // Muestra la notificación de éxito (puedes probar cambiando 'exito' por 'error')
        setNotificacion({ mensaje: '¡Producto agregado al inventario con éxito!', tipo: 'exito' });
    };

    return (
        <div className="flex flex-col gap-6 h-[calc(100vh-7rem)]">
        
        {/* 1. Buscador Superior */}
        <div className="shrink-0 space-y-4">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Gestión de Inventario</h1>
            <BarraBusqueda busqueda={textoBusqueda} setBusqueda={setTextoBusqueda} />
        </div>

        {/* 2. Grid de Productos con scroll propio */}
        <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 pb-20">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            
            {/* TARJETA ESPECIAL: Añadir Nuevo */}
            <button 
                onClick={() => setIsModalOpen(true)}
                className="group flex flex-col items-center justify-center min-h-[300px] bg-gray-50 dark:bg-gray-800/50 rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-700 hover:border-indigo-500 dark:hover:border-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all duration-300 active:scale-95"
            >
                <div className="p-4 bg-white dark:bg-gray-800 rounded-full shadow-sm group-hover:scale-110 transition-transform mb-3">
                <Plus size={32} className="text-indigo-600 dark:text-indigo-400" />
                </div>
                <p className="font-semibold text-gray-700 dark:text-gray-300">Nuevo Producto</p>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">Clic para añadir al catálogo</p>
            </button>

            {/* TARJETAS DE PRODUCTOS ACTUALES */}
            {productosDisponibles.map((prod) => (
                <TarjetaProducto 
                key={prod.id} 
                producto={prod} 
                mostrarVender={false} // ¡Magia! Aquí ocultamos el botón de vender
                />
            ))}
            </div>
        </div>

        {/* COMPONENTES FLOTANTES */}
        <ModalAñadirProducto 
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)} 
            onConfirm={handleGuardarProducto} 
        />
        
        <Notificacion 
            mensaje={notificacion.mensaje} 
            tipo={notificacion.tipo} 
            onClose={() => setNotificacion({ mensaje: '', tipo: '' })} 
        />
        </div>
    );
}