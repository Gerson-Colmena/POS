import React, { useState } from 'react';
import BarraBusqueda from '../components/ventas/BarraBusqueda';
import GridProductos from '../components/ventas/GridProductos';
import PanelCarrito from '../components/ventas/PanelCarrito';

export default function VentasPage() {

    const [textoBusqueda, setTextoBusqueda] = useState('');
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Todas'); // <--- NUEVO ESTADO
    // Aquí tendrías tu estado de productos (simulado por ahora)
    const [productosDisponibles] = useState([
        { id: 101, nombre: 'Earthen Bottle', precio: 48.00, stock: 3, categoria: 'Botellas', imagenUrl: 'https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-01.jpg' },
        { id: 102, nombre: 'Nomad Tumbler', precio: 35.50, stock: 22, categoria: 'Accesorios', imagenUrl: 'https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-02.jpg' },
        { id: 103, nombre: 'Focus Paper', precio: 89.00, stock: 50, categoria: 'Papel', imagenUrl: 'https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-03.jpg' },
        { id: 104, nombre: 'Mechanical Pencil', precio: 64.20, stock: 8, categoria: 'Lápices', imagenUrl: 'https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-04.jpg' },
        { id: 105, nombre: 'Leather Wallet', precio: 64.00, stock: 12, categoria: 'Accesorios', imagenUrl: 'https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-05.jpg' },
        { id: 106, nombre: 'Jugo Natural', precio: 15.00, stock: 20, categoria: 'Bebidas', imagenUrl: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3' },
    ]);
    // === EL TRUCO SENIOR: EXTRAER CATEGORÍAS AUTOMÁTICAMENTE ===
    // 1. Mapeamos los productos para sacar solo los nombres de las categorías.
    // 2. Usamos 'new Set()' para eliminar los duplicados (si hay 5 productos de Papelería, solo guardará "Papelería" una vez).
    // 3. Ponemos 'Todas' al principio del arreglo.
    const categoriasDinamicas = ['Todas', ...new Set(productosDisponibles.map(prod => prod.categoria))];
    // === EL CEREBRO DEL CARRITO ===
  // Inicia vacío
  const [itemsCarrito, setItemsCarrito] = useState([]); 

  const handleAgregarAlCarrito = (producto) => {
    setItemsCarrito((carritoActual) => {
      // 1. Buscamos si el producto ya está en el carrito
      const itemExistente = carritoActual.find(item => item.id === producto.id);

      if (itemExistente) {
        // 2. Si existe, mapeamos el carrito y le sumamos 1 a la cantidad de ese producto
        return carritoActual.map(item => 
          item.id === producto.id 
            ? { ...item, cantidad: item.cantidad + 1 } 
            : item
        );
      } else {
        // 3. Si no existe, lo agregamos al final con cantidad 1
        return [...carritoActual, { ...producto, cantidad: 1 }];
      }
    });
  };

  const handleEliminarItem = (idParaBorrar) => {
    setItemsCarrito((carritoActual) => 
      carritoActual.filter(item => item.id !== idParaBorrar)
    );
  };    
  const handleVaciarCarrito = () => {
    setItemsCarrito([]);
  };
  // === LA MAGIA DEL BUSCADOR ===
  // Filtramos la lista original basándonos en lo que el usuario escribió
  const productosFiltrados = productosDisponibles.filter((producto) => {
    // 1. ¿El texto coincide?
    const coincideTexto = producto.nombre.toLowerCase().includes(textoBusqueda.toLowerCase());
    
    // 2. ¿La categoría coincide? 
    // Si elegimos "Todas", dejamos pasar todo. Si no, debe ser exactamente igual.
    const coincideCategoria = categoriaSeleccionada === 'Todas' || producto.categoria === categoriaSeleccionada;

    // 3. El producto debe cumplir AMBAS cosas para aparecer en la pantalla
    return coincideTexto && coincideCategoria;
  });

    return (
        <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-9rem)]">
        
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
                categorias={categoriasDinamicas}
                />

                {/* COMPONENTE GRID (Ocupa el resto del espacio con su propio scroll) */}
                <div className="flex-1 overflow-hidden">
                    <GridProductos 
                        productos={productosFiltrados} 
                        onAgregarAlCarrito={handleAgregarAlCarrito} 
                    />
                </div>

            </div>

            {/* COLUMNA DERECHA: Carrito y Cobro */}
            <div className="w-full lg:w-1/3 h-full">
                <PanelCarrito 
                    itemsCarrito={itemsCarrito} 
                    onEliminarItem={handleEliminarItem} 
                    onVaciarCarrito={handleVaciarCarrito}
                />
            </div>  

        </div>
    );
}