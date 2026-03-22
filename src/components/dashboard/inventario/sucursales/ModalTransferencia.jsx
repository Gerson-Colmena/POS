import React, { useState } from 'react';
import { X, ArrowLeftRight } from 'lucide-react';

export default function ModalTransferencia({ sucursalOrigen, sucursales, onConfirmar, onCerrar }) {
    const [destino, setDestino]   = useState('');
    const [producto, setProducto] = useState('');
    const [cantidad, setCantidad] = useState('');

    const handleConfirmar = () => {
        if (!destino || !producto || !cantidad) { alert('Completa todos los campos'); return; }
        onConfirmar({ origen: sucursalOrigen.nombre, destino, producto, cantidad: parseInt(cantidad) });
    };

    const destinos = sucursales.filter(s => s.id !== sucursalOrigen.id);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-md border border-gray-100 dark:border-gray-700">
                <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-gray-700">
                    <div className="flex items-center gap-2">
                        <ArrowLeftRight size={18} className="text-indigo-500" />
                        <h3 className="text-base font-bold text-gray-900 dark:text-white">
                            Transferir desde {sucursalOrigen.nombre}
                        </h3>
                    </div>
                    <button onClick={onCerrar} className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700">
                        <X size={16} />
                    </button>
                </div>

                <div className="p-5 space-y-4">
                    <div>
                        <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">Sucursal destino</label>
                        <select
                            value={destino}
                            onChange={e => setDestino(e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="">Seleccionar...</option>
                            {destinos.map(s => <option key={s.id} value={s.nombre}>{s.nombre}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">Producto</label>
                        <input
                            type="text"
                            value={producto}
                            onChange={e => setProducto(e.target.value)}
                            placeholder="Ej: Earthen Bottle"
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">Cantidad a transferir</label>
                        <input
                            type="number"
                            value={cantidad}
                            onChange={e => setCantidad(e.target.value)}
                            placeholder="Ej: 10"
                            min="1"
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                </div>

                <div className="flex gap-3 p-5 border-t border-gray-100 dark:border-gray-700">
                    <button onClick={onCerrar} className="flex-1 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 text-sm text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        Cancelar
                    </button>
                    <button onClick={handleConfirmar} className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold transition-colors">
                        Confirmar transferencia
                    </button>
                </div>
            </div>
        </div>
    );
}