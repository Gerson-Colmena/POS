import React from 'react';
import { X } from 'lucide-react';
import AvatarUpload from './AvatarUpload';
import FormDatosPerfil from './FormDatosPerfil';
import SolicitudCambioPassword from './SolicitudCambioPassword';

export default function ModalPerfil({ onCerrar }) {
    // Datos simulados — luego vendrán de Supabase/Auth
    const usuario = {
        id:     1,
        nombre: 'Gerson Colmena',
        correo: 'gerson@tienda.com',
        rol:    'Administrador',
    };

    const handleGuardarNombre = (nuevoNombre) => {
        alert(`✅ Nombre actualizado a: ${nuevoNombre}\n(Supabase próximamente)`);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-md border border-gray-100 dark:border-gray-700 max-h-[90vh] overflow-y-auto">

                {/* Header */}
                <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800 z-10">
                    <h3 className="text-base font-bold text-gray-900 dark:text-white">
                        Mi Perfil
                    </h3>
                    <button
                        onClick={onCerrar}
                        className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                        <X size={16} />
                    </button>
                </div>

                <div className="p-5 space-y-6">
                    {/* Avatar + rol */}
                    <div className="flex flex-col items-center gap-2">
                        <AvatarUpload nombre={usuario.nombre} />
                        <span className="text-xs font-semibold px-3 py-1 rounded-lg bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-400">
                            {usuario.rol}
                        </span>
                    </div>

                    <div className="border-t border-gray-100 dark:border-gray-700" />

                    {/* Datos personales */}
                    <FormDatosPerfil
                        nombre={usuario.nombre}
                        correo={usuario.correo}
                        onGuardarNombre={handleGuardarNombre}
                    />

                    <div className="border-t border-gray-100 dark:border-gray-700" />

                    {/* Solicitud cambio contraseña */}
                    <SolicitudCambioPassword empleado={usuario} />
                </div>
            </div>
        </div>
    );
}