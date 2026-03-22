import React, { useState } from 'react';
import { KeyRound, Clock, CheckCircle, XCircle, Send } from 'lucide-react';
import { useSolicitudes } from '../../context/SolicitudesContext';

export default function SolicitudCambioPassword({ empleado }) {
    const { crearSolicitud, solicitudes } = useSolicitudes();
    const [enviado, setEnviado] = useState(false);

    // Buscar si ya tiene solicitud
    const miSolicitud = solicitudes
        .filter(s => s.empleadoId === empleado?.id)
        .sort((a, b) => b.id - a.id)[0];

    const handleSolicitar = () => {
        const resultado = crearSolicitud(empleado);
        if (resultado?.error) {
            alert(resultado.error);
            return;
        }
        setEnviado(true);
    };

    const estadoConfig = {
        pendiente: {
            icono:  Clock,
            color:  'bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/20 text-amber-700 dark:text-amber-400',
            titulo: 'Solicitud enviada',
            texto:  'Tu solicitud está pendiente de aprobación por el administrador.',
        },
        resuelta: {
            icono:  CheckCircle,
            color:  'bg-green-50 dark:bg-green-500/10 border-green-200 dark:border-green-500/20 text-green-700 dark:text-green-400',
            titulo: '¡Solicitud aprobada!',
            texto:  `Tu contraseña temporal es: `,
        },
        rechazada: {
            icono:  XCircle,
            color:  'bg-rose-50 dark:bg-rose-500/10 border-rose-200 dark:border-rose-500/20 text-rose-700 dark:text-rose-400',
            titulo: 'Solicitud rechazada',
            texto:  'El administrador rechazó tu solicitud. Puedes enviar una nueva.',
        },
    };

    return (
        <div className="space-y-4">
            <h4 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                Contraseña
            </h4>

            {/* Estado de solicitud activa */}
            {miSolicitud && miSolicitud.estado !== 'rechazada' && (
                <div className={`rounded-xl p-4 border ${estadoConfig[miSolicitud.estado].color}`}>
                    <div className="flex items-center gap-2 font-semibold text-sm mb-1">
                        {React.createElement(estadoConfig[miSolicitud.estado].icono, { size: 16 })}
                        {estadoConfig[miSolicitud.estado].titulo}
                    </div>
                    <p className="text-xs">
                        {estadoConfig[miSolicitud.estado].texto}
                        {miSolicitud.estado === 'resuelta' && (
                            <span className="font-bold font-mono ml-1 text-green-800 dark:text-green-300">
                                {miSolicitud.passwordTemporal}
                            </span>
                        )}
                    </p>
                    {miSolicitud.estado === 'resuelta' && (
                        <p className="text-xs mt-1 opacity-70">
                            Copia esta contraseña. No se mostrará nuevamente.
                        </p>
                    )}
                </div>
            )}

            {/* Botón solicitar — solo si no hay pendiente */}
            {(!miSolicitud || miSolicitud.estado === 'rechazada') && (
                <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4 border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center gap-2 mb-2">
                        <KeyRound size={16} className="text-indigo-500" />
                        <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                            ¿Quieres cambiar tu contraseña?
                        </p>
                    </div>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mb-4">
                        Envía una solicitud al administrador. Él te asignará una contraseña temporal.
                    </p>
                    <button
                        onClick={handleSolicitar}
                        disabled={enviado}
                        className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-sm font-bold py-2.5 rounded-xl transition-all"
                    >
                        <Send size={14} />
                        Solicitar cambio de contraseña
                    </button>
                </div>
            )}
        </div>
    );
}