import React, { useState } from 'react';
import { Save, X, UserPlus } from 'lucide-react';

export default function FormEmpleado({ empleadoEditar, onGuardar, onCerrar }) {
    const [form, setForm] = useState({
        nombre:   empleadoEditar?.nombre   ?? '',
        email:    empleadoEditar?.email    ?? '',
        rol:      empleadoEditar?.rol      ?? 'cajero',
        sucursal: empleadoEditar?.sucursal ?? 'Tienda Principal',
        password: '',
    });

    const handleChange = (campo, valor) => {
        setForm(prev => ({ ...prev, [campo]: valor }));
    };

    const handleGuardar = () => {
        if (!form.nombre || !form.email) {
            alert('Nombre y email son obligatorios'); return;
        }
        if (!empleadoEditar && !form.password) {
            alert('La contraseña es obligatoria para nuevos empleados'); return;
        }
        onGuardar(form);
    };

    const inputClass = "w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500";
    const labelClass = "block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5";

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-md border border-gray-100 dark:border-gray-700">

                <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-gray-700">
                    <div className="flex items-center gap-2">
                        <UserPlus size={18} className="text-indigo-500" />
                        <h3 className="text-base font-bold text-gray-900 dark:text-white">
                            {empleadoEditar ? 'Editar empleado' : 'Nuevo empleado'}
                        </h3>
                    </div>
                    <button onClick={onCerrar} className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700">
                        <X size={16} />
                    </button>
                </div>

                <div className="p-5 space-y-4">
                    <div>
                        <label className={labelClass}>Nombre completo</label>
                        <input type="text" value={form.nombre}
                            onChange={e => handleChange('nombre', e.target.value)}
                            placeholder="Ej: María López" className={inputClass} />
                    </div>
                    <div>
                        <label className={labelClass}>Correo electrónico</label>
                        <input type="email" value={form.email}
                            onChange={e => handleChange('email', e.target.value)}
                            placeholder="Ej: maria@tienda.com" className={inputClass} />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className={labelClass}>Rol</label>
                            <select value={form.rol}
                                onChange={e => handleChange('rol', e.target.value)}
                                className={inputClass}>
                                <option value="cajero">Cajero</option>
                                <option value="bodega">Bodega</option>
                                <option value="admin">Administrador</option>
                            </select>
                        </div>
                        <div>
                            <label className={labelClass}>Sucursal</label>
                            <select value={form.sucursal}
                                onChange={e => handleChange('sucursal', e.target.value)}
                                className={inputClass}>
                                <option>Tienda Principal</option>
                                <option>Sucursal Norte</option>
                                <option>Sucursal Sur</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className={labelClass}>
                            {empleadoEditar ? 'Nueva contraseña (dejar vacío para no cambiar)' : 'Contraseña'}
                        </label>
                        <input type="password" value={form.password}
                            onChange={e => handleChange('password', e.target.value)}
                            placeholder="••••••••" className={inputClass} />
                    </div>
                </div>

                <div className="flex gap-3 p-5 border-t border-gray-100 dark:border-gray-700">
                    <button onClick={onCerrar}
                        className="flex-1 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 text-sm text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        Cancelar
                    </button>
                    <button onClick={handleGuardar}
                        className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold transition-colors">
                        <Save size={15} />
                        {empleadoEditar ? 'Actualizar' : 'Crear cuenta'}
                    </button>
                </div>
            </div>
        </div>
    );
}