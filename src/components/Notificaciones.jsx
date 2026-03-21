import React, { useState, useRef, useEffect } from 'react';
import { Bell, AlertTriangle, PackageX } from 'lucide-react';

export default function Notificaciones() {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);

    // MOCKS: Simulamos productos que tienen stock crítico (menor a 5)
    // En el futuro, esto se lo pasaremos por "props" desde tu base de datos
    const alertasStock = [
        { id: 101, nombre: 'Earthen Bottle', stock: 3 },
        { id: 106, nombre: 'Focus Multi-Pack', stock: 1 },
        { id: 108, nombre: 'Café Lingzhi 3 en 1', stock: 2 },
        { id: 110, nombre: 'Té de Spica', stock: 0 },
        { id: 115, nombre: 'Espirulina Cereal', stock: 4 },
        { id: 120, nombre: 'Jabón Ganozhi', stock: 1 },
    ];

    // Cerrar al hacer clic afuera
    useEffect(() => {
        const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setIsOpen(false);
        }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative shrink-0" ref={menuRef}>
        
        {/* BOTÓN DE LA CAMPANA */}
        <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className={`relative rounded-full p-2 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 ${
            isOpen 
                ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' 
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
        >
            <span className="sr-only">Ver notificaciones</span>
            <Bell className="h-6 w-6" />
            
            {/* GLOBITO ROJO CON CONTADOR (Solo se muestra si hay alertas) */}
            {alertasStock.length > 0 && (
            <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ring-2 ring-white dark:ring-gray-900">
                {alertasStock.length}
            </span>
            )}
        </button>

        {/* MENÚ DESPLEGABLE (Con Scroll) */}
        {isOpen && (
            <div className="absolute right-0 z-50 mt-2 w-80 origin-top-right rounded-2xl bg-white dark:bg-gray-800 shadow-xl ring-1 ring-black/5 dark:ring-white/10 focus:outline-none overflow-hidden flex flex-col transition-all">
            
            {/* Cabecera del Menú */}
            <div className="p-4 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/50">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <AlertTriangle size={16} className="text-amber-500" />
                Alertas de Inventario
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Productos con stock bajo o agotado.
                </p>
            </div>

            {/* LISTA SCROLLEABLE (La magia está en max-h-80 y overflow-y-auto) */}
            <div className="max-h-80 overflow-y-auto custom-scrollbar p-2">
                {alertasStock.length === 0 ? (
                <div className="p-4 text-center text-sm text-gray-500">
                    Todo en orden. No hay alertas.
                </div>
                ) : (
                <div className="space-y-1">
                    {alertasStock.map((item) => (
                    <div key={item.id} className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-default">
                        <div className={`mt-0.5 p-1.5 rounded-lg ${item.stock === 0 ? 'bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400' : 'bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400'}`}>
                        <PackageX size={16} />
                        </div>
                        <div>
                        <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 line-clamp-1">{item.nombre}</h4>
                        <p className={`text-xs font-semibold mt-0.5 ${item.stock === 0 ? 'text-red-600 dark:text-red-400' : 'text-amber-600 dark:text-amber-400'}`}>
                            {item.stock === 0 ? '¡Agotado!' : `Quedan solo ${item.stock} unidades`}
                        </p>
                        </div>
                    </div>
                    ))}
                </div>
                )}
            </div>
            
            {/* Pie del Menú (Acceso directo al Inventario) */}
            <div className="p-3 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
                <button className="w-full text-center text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors">
                Ir al Inventario Completo
                </button>
            </div>

            </div>
        )}
        </div>
    );
}