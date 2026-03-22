import React from 'react';
import { 
    LayoutDashboard, Wallet, Receipt, Users, 
    AlertTriangle, Tags, Store, FileClock, 
    UserCog, ShieldCheck, Settings, ReceiptText 
} from 'lucide-react';

const menuModulos = [
    {
        titulo: '📊 1. Resumen General',
        opciones: [
            { id: 'resumen_general', label: 'Métricas y Gráficos', icono: LayoutDashboard },
        ]
    },
    {
        titulo: '💰 2. Control de Caja y Ventas',
        opciones: [
            { id: 'caja', label: 'Apertura y Cierre de Caja', icono: Wallet },
            { id: 'historial_tickets', label: 'Historial de Tickets', icono: Receipt },
            { id: 'cuentas_cobrar', label: 'Cuentas por Cobrar', icono: Users },
        ]
    },
    {
        titulo: '📦 3. Inventario Avanzado',
        opciones: [
            { id: 'alertas_stock', label: 'Alertas de Stock Crítico', icono: AlertTriangle },
            { id: 'categorias', label: 'Gestión de Categorías', icono: Tags },
            { id: 'sucursales', label: 'Stock por Sucursales', icono: Store },
            { id: 'kardex', label: 'Kardex / Movimientos', icono: FileClock },
        ]
    },
    {
        titulo: '👥 4. Personal y Seguridad',
        opciones: [
            { id: 'empleados', label: 'Gestión de Empleados', icono: UserCog },
            { id: 'permisos', label: 'Roles y Permisos', icono: ShieldCheck },
        ]
    },
    {
        titulo: '⚙️ 5. Configuración',
        opciones: [
            { id: 'datos_negocio', label: 'Datos del Negocio', icono: Settings },
            { id: 'preferencias', label: 'Preferencias del Sistema', icono: ReceiptText },
        ]
    }
];

export default function MenuLateral({ vistaActiva, setVistaActiva }) {
    return (
        <div className="w-72 flex flex-col bg-gray-50 dark:bg-gray-950 border-r border-gray-100 dark:border-gray-800 overflow-y-auto custom-scrollbar shrink-0">
            
            {/* Cabecera del menú */}
            <div className="p-6 pb-3 shrink-0 border-b border-gray-100 dark:border-gray-800">
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                    Administración
                </h1>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                    Panel de control
                </p>
            </div>

            {/* Lista de módulos */}
            <nav className="flex-1 px-3 py-4 space-y-5">
                {menuModulos.map((modulo, index) => (
                    <div key={index}>
                        {/* Título del grupo */}
                        <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1.5 px-3">
                            {modulo.titulo}
                        </h3>

                        {/* Botones de opciones */}
                        <div className="space-y-0.5">
                            {modulo.opciones.map((opcion) => {
                                const Icono = opcion.icono;
                                const estaActivo = vistaActiva === opcion.id;

                                return (
                                    <button
                                        key={opcion.id}
                                        onClick={() => setVistaActiva(opcion.id)}
                                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                                            estaActivo
                                            ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-400 shadow-sm'
                                            : 'text-gray-600 hover:bg-gray-200/60 dark:text-gray-400 dark:hover:bg-gray-800/60'
                                        }`}
                                    >
                                        <Icono 
                                            size={17} 
                                            className={estaActivo ? 'text-indigo-600 dark:text-indigo-400' : ''} 
                                        />
                                        {opcion.label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </nav>
        </div>
    );
}