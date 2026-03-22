import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export default function RutaProtegida() {
    // localStorage es síncrono, no necesita useEffect
    const autorizado = !!localStorage.getItem('sesion_activa');

    if (!autorizado) return <Navigate to="/" replace />;
    return <Outlet />;
}