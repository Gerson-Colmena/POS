import React, { useState } from 'react';
import { ShieldCheck } from 'lucide-react';
import FilaPermiso from './personal/FilaPermiso';

const roles = ['admin', 'cajero', 'bodega'];

const rolesLabels = {
    admin:  'Administrador',
    cajero: 'Cajero',
    bodega: 'Bodega',
};

const permisosIniciales = [
    { id: 1,  accion: 'Ver Dashboard',          descripcion: 'Acceso al panel de administración',      roles: { admin: true,  cajero: false, bodega: false } },
    { id: 2,  accion: 'Ver métricas y gráficos', descripcion: 'Ventas del día, ingresos del mes',       roles: { admin: true,  cajero: false, bodega: false } },
    { id: 3,  accion: 'Abrir y cerrar caja',     descripcion: 'Control de apertura y cierre de turno',  roles: { admin: true,  cajero: true,  bodega: false } },
    { id: 4,  accion: 'Ver historial de tickets',descripcion: 'Consultar ventas pasadas',               roles: { admin: true,  cajero: true,  bodega: false } },
    { id: 5,  accion: 'Anular ventas',           descripcion: 'Cancelar tickets emitidos',              roles: { admin: true,  cajero: false, bodega: false } },
    { id: 6,  accion: 'Realizar ventas (POS)',   descripcion: 'Acceso al punto de venta',               roles: { admin: true,  cajero: true,  bodega: false } },
    { id: 7,  accion: 'Ver inventario',          descripcion: 'Consultar productos y stock',            roles: { admin: true,  cajero: true,  bodega: true  } },
    { id: 8,  accion: 'Editar productos',        descripcion: 'Agregar, editar o eliminar productos',   roles: { admin: true,  cajero: false, bodega: true  } },
    { id: 9,  accion: 'Gestionar categorías',    descripcion: 'Crear y editar categorías',              roles: { admin: true,  cajero: false, bodega: false } },
    { id: 10, accion: 'Ver alertas de stock',    descripcion: 'Productos con stock crítico',            roles: { admin: true,  cajero: false, bodega: true  } },
    { id: 11, accion: 'Transferir mercadería',   descripcion: 'Mover stock entre sucursales',           roles: { admin: true,  cajero: false, bodega: true  } },
    { id: 12, accion: 'Gestionar empleados',     descripcion: 'Crear y administrar cuentas',            roles: { admin: true,  cajero: false, bodega: false } },
    { id: 13, accion: 'Configurar el sistema',   descripcion: 'Datos del negocio y preferencias',       roles: { admin: true,  cajero: false, bodega: false } },
];

export default function VistaPermisos() {
    const [permisos, setPermisos] = useState(permisosIniciales);

    const handleToggle = (permisoId, rol) => {
        // Admin siempre tiene todos los permisos
        if (rol === 'admin') return;

        setPermisos(prev => prev.map(p =>
            p.id === permisoId
            ? { ...p, roles: { ...p.roles, [rol]: !p.roles[rol] } }
            : p
        ));
    };

    return (
        <div className="p-6 space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Roles y Permisos
                </h2>
                <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
                    Define qué puede ver y hacer cada tipo de usuario
                </p>
            </div>

            {/* Leyenda de roles */}
            <div className="flex gap-3">
                {roles.map(rol => (
                    <div key={rol} className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold border ${
                        rol === 'admin'
                        ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border-indigo-200 dark:border-indigo-500/30'
                        : rol === 'cajero'
                        ? 'bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-400 border-green-200 dark:border-green-500/30'
                        : 'bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-500/30'
                    }`}>
                        <ShieldCheck size={13} />
                        {rolesLabels[rol]}
                        {rol === 'admin' && <span className="opacity-60">(siempre activo)</span>}
                    </div>
                ))}
            </div>

            {/* Tabla de permisos */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
                            <th className="text-left px-5 py-3 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider w-full">
                                Permiso
                            </th>
                            {roles.map(rol => (
                                <th key={rol} className="px-5 py-3 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider text-center whitespace-nowrap">
                                    {rolesLabels[rol]}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {permisos.map(permiso => (
                            <FilaPermiso
                                key={permiso.id}
                                permiso={permiso}
                                roles={roles}
                                onToggle={handleToggle}
                            />
                        ))}
                    </tbody>
                </table>
            </div>

            <p className="text-xs text-gray-400 dark:text-gray-500 text-center">
                Los cambios se guardarán en Supabase cuando conectemos la base de datos.
            </p>
        </div>
    );
}