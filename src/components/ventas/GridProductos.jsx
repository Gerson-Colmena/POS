import React from 'react';
import TarjetaProducto from './TarjetaProducto'; // Tu tarjeta anterior

export default function GridProductos({ productos,onAgregarAlCarrito }) {
    return (
        // Este div envuelve la grilla y le da su propio scroll
        <div className="h-full overflow-y-auto pr-2 pb-20 custom-scrollbar">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {productos.map((prod) => (
          <TarjetaProducto 
            key={prod.id} 
            producto={prod} 
            // 2. Se la pasa a la tarjeta
            onAgregarAlCarrito={onAgregarAlCarrito} 
          />
        ))}
        </div>
        </div>
    );
}