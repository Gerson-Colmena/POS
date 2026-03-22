import React, { useState } from 'react';
import { UserPlus, Users } from 'lucide-react';
import TarjetaEmpleado from './personal/TarjetaEmpleado';
import FormEmpleado from './personal/FormEmpleado';
import TarjetaSolicitud from './personal/TarjetaSolicitud';
import { useSolicitudes } from '../../context/SolicitudesContext';

const empleadosIniciales = [
    { id: 1, nombre: 'Gerson Colmena', email: 'gerson@tienda.com',  rol: 'admin',  sucursal: 'Tienda Principal', fechaIngreso: '01/01/2024', activo: true  },
    { id: 2, nombre: 'María López',    email: 'maria@tienda.com',   rol: 'cajero', sucursal: 'Tienda Principal', fechaIngreso: '15/03/2024', activo: true  },
    { id: 3, nombre: 'Carlos Quispe',  email: 'carlos@tienda.com',  rol: 'cajero', sucursal: 'Sucursal Norte',   fechaIngreso: '10/06/2024', activo: true  },
    { id: 4, nombre: 'Ana Fernández',  email: 'ana@tienda.com',     rol: 'bodega', sucursal: 'Sucursal Sur',     fechaIngreso: '05/09/2024', activo: false },
];

export default function VistaEmpleados() {
    const [empleados, setEmpleados]         = useState(empleadosIniciales);
    const [mostrarForm, setMostrarForm]     = useState(false);
    const [empleadoEditar, setEmpleadoEditar] = useState(null);
    const { pendientes } = useSolicitudes();

    const handleGuardar = (datos) => {
        if (empleadoEditar) {
            setEmpleados(prev => prev.map(e =>
                e.id === empleadoEditar.id ? { ...e, ...datos } : e
            ));
        } else {
            setEmpleados(prev => [...prev, {
                id: Date.now(),
                fechaIngreso: new Date().toLocaleDateString('es-BO'),
                activo: true,
                ...datos
            }]);
        }
        setMostrarForm(false);
        setEmpleadoEditar(null);
    };

    const handleEditar = (empleado) => {
        setEmpleadoEditar(empleado);
        setMostrarForm(true);
    };

    const handleEliminar = (empleado) => {
        if (confirm(`¿Eliminar la cuenta de "${empleado.nombre}"? Esta acción no se puede deshacer.`)) {
            setEmpleados(prev => prev.filter(e => e.id !== empleado.id));
        }
    };

    const handleToggleActivo = (empleado) => {
        setEmpleados(prev => prev.map(e =>
            e.id === empleado.id ? { ...e, activo: !e.activo } : e
        ));
    };

    const activos   = empleados.filter(e => e.activo).length;
    const inactivos = empleados.filter(e => !e.activo).length;

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-start justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Gestión de Empleados
                    </h2>
                    <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
                        Administra las cuentas del personal de tu negocio
                    </p>
                </div>
                <button
                    onClick={() => { setEmpleadoEditar(null); setMostrarForm(true); }}
                    className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold px-4 py-2.5 rounded-xl transition-all shadow-md"
                >
                    <UserPlus size={16} />
                    Nuevo empleado
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
                {[
                    { label: 'Total',    valor: empleados.length, color: 'text-gray-900 dark:text-white'  },
                    { label: 'Activos',  valor: activos,          color: 'text-green-600 dark:text-green-400' },
                    { label: 'Inactivos',valor: inactivos,        color: 'text-rose-600  dark:text-rose-400'  },
                ].map(s => (
                    <div key={s.label} className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-100 dark:border-gray-700 shadow-sm text-center">
                        <p className={`text-3xl font-extrabold ${s.color}`}>{s.valor}</p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{s.label}</p>
                    </div>
                ))}
            </div>

            {pendientes.length > 0 && (
                <div className="space-y-3">
                    <div className="flex items-center gap-2">
                        <h3 className="text-sm font-bold text-amber-600 dark:text-amber-400">
                            🔑 Solicitudes de cambio de contraseña
                        </h3>
                        <span className="text-xs font-bold px-2 py-0.5 rounded-lg bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400">
                            {pendientes.length} pendiente{pendientes.length > 1 ? 's' : ''}
                        </span>
                    </div>
                    {pendientes.map(s => (
                        <TarjetaSolicitud key={s.id} solicitud={s} />
                    ))}
                </div>
            )}
            {/* Grid empleados */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {empleados.map(emp => (
                    <TarjetaEmpleado
                        key={emp.id}
                        empleado={emp}
                        onEditar={handleEditar}
                        onEliminar={handleEliminar}
                        onToggleActivo={handleToggleActivo}
                    />
                ))}
            </div>

            {/* Modal formulario */}
            {mostrarForm && (
                <FormEmpleado
                    key={empleadoEditar?.id ?? 'nuevo'}
                    empleadoEditar={empleadoEditar}
                    onGuardar={handleGuardar}
                    onCerrar={() => { setMostrarForm(false); setEmpleadoEditar(null); }}
                />
            )}
        </div>
    );
}