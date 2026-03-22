import React from 'react';
import { Pencil, Trash2, ShieldCheck, ShieldOff } from 'lucide-react';

const rolConfig = {
    admin:  { label: 'Administrador', color: 'bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-400' },
    cajero: { label: 'Cajero',        color: 'bg-green-100  dark:bg-green-500/20  text-green-700  dark:text-green-400'  },
    bodega: { label: 'Bodega',        color: 'bg-amber-100  dark:bg-amber-500/20  text-amber-700  dark:text-amber-400'  },
};

export default function TarjetaEmpleado({ empleado, onEditar, onEliminar, onToggleActivo }) {
    const rol = rolConfig[empleado.rol] ?? rolConfig.cajero;

    return (
        <div className={`bg-white dark:bg-gray-800 rounded-2xl p-5 border shadow-sm transition-opacity ${
            empleado.activo
            ? 'border-gray-100 dark:border-gray-700'
            : 'border-gray-100 dark:border-gray-700 opacity-60'
        }`}>
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-indigo-100 dark:bg-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold text-lg shrink-0">
                        {empleado.nombre.charAt(0)}
                    </div>
                    <div>
                        <p className="text-sm font-bold text-gray-900 dark:text-white">{empleado.nombre}</p>
                        <p className="text-xs text-gray-400 dark:text-gray-500">{empleado.email}</p>
                    </div>
                </div>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg ${rol.color}`}>
                    {rol.label}
                </span>
            </div>

            <div className="space-y-1.5 mb-4">
                <div className="flex justify-between text-xs">
                    <span className="text-gray-400 dark:text-gray-500">Sucursal</span>
                    <span className="text-gray-700 dark:text-gray-300 font-medium">{empleado.sucursal}</span>
                </div>
                <div className="flex justify-between text-xs">
                    <span className="text-gray-400 dark:text-gray-500">Desde</span>
                    <span className="text-gray-700 dark:text-gray-300 font-medium">{empleado.fechaIngreso}</span>
                </div>
                <div className="flex justify-between text-xs">
                    <span className="text-gray-400 dark:text-gray-500">Estado</span>
                    <span className={`font-semibold ${empleado.activo ? 'text-green-500' : 'text-rose-500'}`}>
                        {empleado.activo ? 'Activo' : 'Inactivo'}
                    </span>
                </div>
            </div>

            <div className="flex gap-2 pt-3 border-t border-gray-100 dark:border-gray-700">
                <button
                    onClick={() => onEditar(empleado)}
                    className="flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold py-2 rounded-xl text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-colors"
                >
                    <Pencil size={13} /> Editar
                </button>
                <button
                    onClick={() => onToggleActivo(empleado)}
                    className={`flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold py-2 rounded-xl transition-colors ${
                        empleado.activo
                        ? 'text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-500/10'
                        : 'text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-500/10'
                    }`}
                >
                    {empleado.activo
                        ? <><ShieldOff size={13} /> Dar de baja</>
                        : <><ShieldCheck size={13} /> Reactivar</>
                    }
                </button>
                <button
                    onClick={() => onEliminar(empleado)}
                    className="p-2 rounded-xl text-gray-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors"
                >
                    <Trash2 size={14} />
                </button>
            </div>
        </div>
    );
}