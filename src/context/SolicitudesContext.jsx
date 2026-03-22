/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState } from 'react';

const SolicitudesContext = createContext(null);

export function SolicitudesProvider({ children }) {
    const [solicitudes, setSolicitudes] = useState([]);

    const crearSolicitud = (empleado) => {
        const yaExiste = solicitudes.find(
            s => s.empleadoId === empleado.id && s.estado === 'pendiente'
        );
        if (yaExiste) return { error: 'Ya tienes una solicitud pendiente' };

        setSolicitudes(prev => [...prev, {
            id:         Date.now(),
            empleadoId: empleado.id,
            nombre:     empleado.nombre,
            correo:     empleado.correo,
            fecha:      new Date().toLocaleString('es-BO'),
            estado:     'pendiente',
        }]);
        return { ok: true };
    };

    const resolverSolicitud = (solicitudId, passwordTemporal) => {
        setSolicitudes(prev => prev.map(s =>
            s.id === solicitudId
            ? { ...s, estado: 'resuelta', passwordTemporal, fechaResolucion: new Date().toLocaleString('es-BO') }
            : s
        ));
    };

    const rechazarSolicitud = (solicitudId) => {
        setSolicitudes(prev => prev.map(s =>
            s.id === solicitudId ? { ...s, estado: 'rechazada' } : s
        ));
    };

    const pendientes = solicitudes.filter(s => s.estado === 'pendiente');

    return (
        <SolicitudesContext.Provider value={{
            solicitudes,
            pendientes,
            crearSolicitud,
            resolverSolicitud,
            rechazarSolicitud,
        }}>
            {children}
        </SolicitudesContext.Provider>
    );
}

export function useSolicitudes() {
    const context = useContext(SolicitudesContext);
    if (!context) throw new Error('useSolicitudes debe usarse dentro de SolicitudesProvider');
    return context;
}