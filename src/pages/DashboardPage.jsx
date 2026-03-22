import React, { useState } from 'react';
import MenuLateral from '../components/dashboard/MenuLateral';
import VistaPlaceholder from '../components/dashboard/VistaPlaceholder';

// ============================================================
// Aquí irás importando cada vista cuando la programemos:
// import VistaResumenGeneral from '../components/dashboard/VistaResumenGeneral';
// import VistaCaja from '../components/dashboard/VistaCaja';
// import VistaHistorialTickets from '../components/dashboard/VistaHistorialTickets';
// ... etc
// ============================================================

export default function DashboardPage() {
    const [vistaActiva, setVistaActiva] = useState('resumen_general');

    // Aquí el switch irá creciendo a medida que programemos cada módulo
    const renderizarContenido = () => {
        switch (vistaActiva) {
            // case 'resumen_general':
            //     return <VistaResumenGeneral />;
            // case 'caja':
            //     return <VistaCaja />;
            default:
                return <VistaPlaceholder vistaActiva={vistaActiva} />;
        }
    };

    return (
        <div className="flex h-[calc(100vh-7rem)] bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
            
            {/* IZQUIERDA: Menú de navegación */}
            <MenuLateral 
                vistaActiva={vistaActiva} 
                setVistaActiva={setVistaActiva} 
            />

            {/* DERECHA: Contenido dinámico */}
            <div className="flex-1 overflow-y-auto custom-scrollbar bg-white dark:bg-gray-900">
                {renderizarContenido()}
            </div>

        </div>
    );
}   