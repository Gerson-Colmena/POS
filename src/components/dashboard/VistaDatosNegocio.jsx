import React from 'react';
import SeccionDatosNegocio from './configuracion/SeccionDatosNegocio';
import SeccionLogo from './configuracion/SeccionLogo';

export default function VistaDatosNegocio() {
    return (
        <div className="p-6 space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Datos del Negocio
                </h2>
                <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
                    Información general que aparecerá en tus tickets y reportes
                </p>
            </div>
            <SeccionDatosNegocio />
            <SeccionLogo />
        </div>
    );
}