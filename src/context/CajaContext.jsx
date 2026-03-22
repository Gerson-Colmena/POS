/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState } from 'react';

const CajaContext = createContext();

const cajasIniciales = [
    { id: 1, sucursal: 'Tienda Principal', cajero: 'Gerson C.',  horaApertura: '08:00', horaCierre: '18:00', montoInicial: 500,  montoCierre: 1740, estado: 'cerrada'  },
    { id: 2, sucursal: 'Sucursal Norte',   cajero: 'María L.',   horaApertura: '08:30', horaCierre: null,    montoInicial: 300,  montoCierre: null, estado: 'abierta'  },
    { id: 3, sucursal: 'Sucursal Sur',     cajero: null,         horaApertura: null,    horaCierre: null,    montoInicial: null, montoCierre: null, estado: 'sin_abrir'},
];

export function CajaProvider({ children }) {
    const [cajas, setCajas] = useState(cajasIniciales);

    // La caja del usuario actual (simulado: Tienda Principal)
    const [miCaja, setMiCaja] = useState({
        sucursalId: 1,
        estaAbierta: false,
    });

    const abrirCaja = ({ cajero, montoInicial }) => {
        const hora = new Date().toLocaleTimeString('es-BO', { hour: '2-digit', minute: '2-digit' });
        setMiCaja(prev => ({ ...prev, estaAbierta: true }));
        setCajas(prev => prev.map(c =>
            c.id === miCaja.sucursalId
            ? { ...c, cajero, montoInicial, horaApertura: hora, horaCierre: null, montoCierre: null, estado: 'abierta' }
            : c
        ));
    };

    const cerrarCaja = ({ montoContado }) => {
        const hora = new Date().toLocaleTimeString('es-BO', { hour: '2-digit', minute: '2-digit' });
        setMiCaja(prev => ({ ...prev, estaAbierta: false }));
        setCajas(prev => prev.map(c =>
            c.id === miCaja.sucursalId
            ? { ...c, horaCierre: hora, montoCierre: montoContado, estado: 'cerrada' }
            : c
        ));
    };

    return (
        <CajaContext.Provider value={{ cajas, miCaja, abrirCaja, cerrarCaja }}>
            {children}
        </CajaContext.Provider>
    );
}

export function useCaja() {
    return useContext(CajaContext);
}