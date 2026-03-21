import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import BarraBusqueda from '../components/BarraBusqueda';
import ModalAñadirProducto from '../components/ModalAñadirProducto';
import ModalEditarProducto from '../components/ModalEditarProducto'; // 1. Faltaba importar este modal
import Notificacion from '../components/Notificacion';
import TarjetaProducto from '../components/TarjetaProducto';
import ModalConfirmacion from '../components/ModalConfirmacion';

export default function InventarioPage() {
    // Estados para la notificación global y el modal de Añadir
    const [textoBusqueda, setTextoBusqueda] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [notificacion, setNotificacion] = useState({ mensaje: '', tipo: '' });
    // === ESTADOS PARA EL MODAL DE ELIMINAR ===
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [productoAEliminar, setProductoAEliminar] = useState(null);

    // 2. NUEVOS ESTADOS PARA EDICIÓN (El cerebro del modal de editar)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [productoAEditar, setProductoAEditar] = useState(null);

    // 3. Modifiqué esta línea para incluir 'setProductosDisponibles', 
    //    así podemos actualizar la lista cuando edites un producto.
    const [productosDisponibles, setProductosDisponibles] = useState([
        { id: 101, nombre: 'Earthen Bottle', precio: 48.00, stock: 3, imagenUrl: 'https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-01.jpg' },
        { id: 102, nombre: 'Nomad Tumbler', precio: 35.50, stock: 22, imagenUrl: 'https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-02.jpg' },
        { id: 103, nombre: 'Focus Paper', precio: 89.00, stock: 50, imagenUrl: 'https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-03.jpg' },
    ]);

    // === LÓGICA DEL MODAL DE AÑADIR ===
    const handleGuardarProducto = () => {
        setIsModalOpen(false);
        setNotificacion({ mensaje: '¡Producto agregado al inventario con éxito!', tipo: 'exito' });
    };
    // Función para abrir la ventana de advertencia
    const handleAbrirEliminar = (productoElegido) => {
        setProductoAEliminar(productoElegido);
        setIsDeleteModalOpen(true);
    };
    const handleConfirmarEliminar = () => {
        // Filtramos la lista: nos quedamos con todos los productos MENOS el que queremos eliminar
        setProductosDisponibles(prevProductos => 
            prevProductos.filter(p => p.id !== productoAEliminar.id)
        );
        setIsDeleteModalOpen(false); // Cerramos el modal
        setProductoAEliminar(null); // Limpiamos el cerebro
        setNotificacion({ mensaje: 'Producto eliminado del inventario.', tipo: 'exito' });
    };

    // 4. === NUEVA LÓGICA DEL MODAL DE EDITAR ===
    const handleAbrirEditor = (productoElegido) => {
        setProductoAEditar(productoElegido); // Cargamos el producto al estado
        setIsEditModalOpen(true);            // Abrimos el modal
    };

    const handleCambiosGuardados = (productoActualizado) => {
        // Actualizamos la lista reemplazando el viejo por el nuevo
        setProductosDisponibles(prevProductos => 
            prevProductos.map(p => p.id === productoActualizado.id ? productoActualizado : p)
        );
        // Mostramos el mensaje de éxito
        setNotificacion({ mensaje: '¡Producto actualizado con éxito!', tipo: 'exito' });
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
                  mostrarVender={false}
                  // 5. ¡AQUÍ ESTÁ LA MAGIA! Le pasamos la función a la tarjeta
                  onEditClick={() => handleAbrirEditor(prod)} 
                  onDeleteClick={() => handleAbrirEliminar(prod)} //
                />
            ))}
            </div>
        </div>

        {/* COMPONENTES FLOTANTES */}
        
        {/* 6. Volví a colocar el Modal de Añadir (lo habías borrado en tu código anterior) */}
        <ModalAñadirProducto 
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)} 
            onConfirm={handleGuardarProducto} 
        />

        {/* 7. Modal de Editar */}
        {isEditModalOpen && productoAEditar && (
            <ModalEditarProducto 
              onClose={() => setIsEditModalOpen(false)} 
              producto={productoAEditar} 
              onSaveSucces={handleCambiosGuardados} 
            />
        )}
        {/* 8. Modal de Confirmación para Eliminar (¡Este era el que faltaba!) */}
        <ModalConfirmacion
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            onConfirm={handleConfirmarEliminar}
            titulo="¿Eliminar producto?"
            mensaje={`Estás a punto de eliminar "${productoAEliminar?.nombre}". Esta acción no se puede deshacer.`}
        />
        <Notificacion 
            mensaje={notificacion.mensaje} 
            tipo={notificacion.tipo} 
            onClose={() => setNotificacion({ mensaje: '', tipo: '' })} 
        />
        </div>
    );
}