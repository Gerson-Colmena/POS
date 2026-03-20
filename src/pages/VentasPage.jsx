import React, { useState } from 'react';
import BarraBusqueda from '../components/BarraBusqueda';
import GridProductos from '../components/GridProductos';
import PanelCarrito from '../components/PanelCarrito';

export default function VentasPage() {

    const [textoBusqueda, setTextoBusqueda] = useState('');
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Todas'); // <--- NUEVO ESTADO
    // Aquí tendrías tu estado de productos (simulado por ahora)
    const [productosDisponibles] = useState([
        { id: 101, nombre: 'Earthen Bottle', precio: 48.00, stock: 3, imagenUrl: 'https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-01.jpg' },
        { id: 102, nombre: 'Nomad Tumbler', precio: 35.50, stock: 22, imagenUrl: 'https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-02.jpg' },
        { id: 103, nombre: 'Focus Paper', precio: 89.00, stock: 50, imagenUrl: 'https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-03.jpg' },
        { id: 104, nombre: 'Mechanical Pencil', precio: 64.20, stock: 8, imagenUrl: 'https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-04.jpg' },
        { id: 105, nombre: 'Leather Wallet', precio: 64.00, stock: 12, imagenUrl: 'https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-05.jpg' },
    ]);

    return (
        <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-7rem)]">
        
        {/* COLUMNA IZQUIERDA: Buscador y Catálogo */}
            <div className="w-full lg:w-2/3 h-full flex flex-col gap-4">
                
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white shrink-0">
                    Punto de Venta
                </h1>

                {/* COMPONENTE BUSCADOR (Fijo en la parte superior) */}
                <BarraBusqueda 
                busqueda={textoBusqueda} 
                setBusqueda={setTextoBusqueda} 
                categoriaActiva={categoriaSeleccionada}
                setCategoriaActiva={setCategoriaSeleccionada}
                />

                {/* COMPONENTE GRID (Ocupa el resto del espacio con su propio scroll) */}
                <div className="flex-1 overflow-hidden">
                    <GridProductos productos={productosDisponibles} />
                </div>

            </div>

            {/* COLUMNA DERECHA: Carrito y Cobro */}
            <div className="w-full lg:w-1/3 h-full">
                <PanelCarrito />
            </div>

        </div>
    );
}