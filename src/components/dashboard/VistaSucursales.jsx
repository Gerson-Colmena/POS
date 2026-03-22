import React, { useState } from 'react';
import TarjetaSucursal from './inventario/sucursales/TarjetaSucursal';
import ModalTransferencia from './inventario/sucursales/ModalTransferencia';

const sucursalesIniciales = [
    { id: 1, nombre: 'Tienda Principal', direccion: 'Av. 6 de Agosto #123', activa: true,  totalProductos: 45, totalUnidades: 380 },
    { id: 2, nombre: 'Sucursal Norte',   direccion: 'Calle Landaeta #45',   activa: true,  totalProductos: 30, totalUnidades: 210 },
    { id: 3, nombre: 'Sucursal Sur',     direccion: 'Av. Melchor Urquidi',  activa: false, totalProductos: 20, totalUnidades: 95  },
];

export default function VistaSucursales() {
    const [sucursalSeleccionada, setSucursalSeleccionada] = useState(null);

    const handleConfirmarTransferencia = ({ origen, destino, producto, cantidad }) => {
        alert(`✅ Transferencia registrada:\n${cantidad} unidades de "${producto}"\nDe: ${origen} → A: ${destino}`);
        setSucursalSeleccionada(null);
    };

    return (
        <div className="p-6 space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Stock por Sucursales
                </h2>
                <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
                    Visualiza y transfiere mercadería entre tiendas
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {sucursalesIniciales.map(s => (
                    <TarjetaSucursal
                        key={s.id}
                        sucursal={s}
                        onTransferir={setSucursalSeleccionada}
                    />
                ))}
            </div>

            {sucursalSeleccionada && (
                <ModalTransferencia
                    sucursalOrigen={sucursalSeleccionada}
                    sucursales={sucursalesIniciales}
                    onConfirmar={handleConfirmarTransferencia}
                    onCerrar={() => setSucursalSeleccionada(null)}
                />
            )}
        </div>
    );
}