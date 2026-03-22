import React, { useState } from 'react';
import { KeyRound, Clock, Check, X, Eye, EyeOff } from 'lucide-react';
import { useSolicitudes } from '../../../context/SolicitudesContext';

export default function TarjetaSolicitud({ solicitud }) {
    const { resolverSolicitud, rechazarSolicitud } = useSolicitudes();
    const [passwordTemporal, setPasswordTemporal] = useState('');
    const [visible, setVisible]                   = useState(false);
    const [expandido, setExpandido]               = useState(false);

    const handleResolver = () => {
        if (!passwordTemporal.trim()) {
            alert('Escribe una contraseña temporal'); return;
        }
        resolverSolicitud(solicitud.id, passwordTemporal);
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-amber-200 dark:border-amber-500/30 shadow-sm overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400">
                        <KeyRound size={16} />
                    </div>
                    <div>
                        <p className="text-sm font-bold text-gray-900 dark:text-white">
                            {solicitud.nombre}
                        </p>
                        <p className="text-xs text-gray-400 dark:text-gray-500">
                            {solicitud.correo} · {solicitud.fecha}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg bg-amber-100 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400">
                        <Clock size={11} /> Pendiente
                    </span>
                    <button
                        onClick={() => setExpandido(!expandido)}
                        className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
                    >
                        {expandido ? 'Ocultar' : 'Resolver'}
                    </button>
                </div>
            </div>

            {/* Panel resolver */}
            {expandido && (
                <div className="px-5 pb-5 pt-1 border-t border-gray-100 dark:border-gray-700 space-y-3">
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        Asigna una contraseña temporal para <strong>{solicitud.nombre}</strong>. El empleado la verá en su perfil.
                    </p>

                    {/* Input contraseña temporal */}
                    <div className="relative">
                        <input
                            type={visible ? 'text' : 'password'}
                            value={passwordTemporal}
                            onChange={e => setPasswordTemporal(e.target.value)}
                            placeholder="Contraseña temporal"
                            className="w-full px-4 py-2.5 pr-10 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <button
                            onClick={() => setVisible(!visible)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                        >
                            {visible ? <EyeOff size={14} /> : <Eye size={14} />}
                        </button>
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={handleResolver}
                            className="flex-1 flex items-center justify-center gap-1.5 bg-green-600 hover:bg-green-700 text-white text-xs font-bold py-2.5 rounded-xl transition-colors"
                        >
                            <Check size={13} /> Aprobar y asignar
                        </button>
                        <button
                            onClick={() => rechazarSolicitud(solicitud.id)}
                            className="flex-1 flex items-center justify-center gap-1.5 bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-500/20 text-xs font-bold py-2.5 rounded-xl transition-colors border border-rose-200 dark:border-rose-500/30"
                        >
                            <X size={13} /> Rechazar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}