import React, { useState } from 'react';
import MenuLateral from '../components/dashboard/MenuLateral';
import VistaPlaceholder from '../components/dashboard/VistaPlaceholder';
import VistaResumenGeneral from '../components/dashboard/VistaResumenGeneral';
import VistaCaja               from '../components/dashboard/VistaCaja';
import VistaHistorialTickets   from '../components/dashboard/VistaHistorialTickets';
import VistaCuentasCobrar      from '../components/dashboard/VistaCuentasCobrar';
import VistaAlertasStock        from '../components/dashboard/VistaAlertasStock';
import VistaGestionCategorias   from '../components/dashboard/VistaGestionCategorias';
import VistaSucursales          from '../components/dashboard/VistaSucursales';
import VistaKardex              from '../components/dashboard/VistaKardex';
import VistaEmpleados from '../components/dashboard/VistaEmpleados';
import VistaPermisos  from '../components/dashboard/VistaPermisos';
import VistaDatosNegocio  from '../components/dashboard/VistaDatosNegocio';
import VistaPreferencias  from '../components/dashboard/VistaPreferencias';

export default function DashboardPage() {
    const [vistaActiva, setVistaActiva] = useState('resumen_general');

    // Aquí el switch irá creciendo a medida que programemos cada módulo
    const renderizarContenido = () => {
    switch (vistaActiva) {

        case 'resumen_general':          
            return <VistaResumenGeneral />;
        case 'caja':
            return <VistaCaja />;
        case 'historial_tickets':
            return <VistaHistorialTickets />;
        case 'cuentas_cobrar':
            return <VistaCuentasCobrar />;
        case 'alertas_stock':
            return <VistaAlertasStock />;
        case 'categorias':
            return <VistaGestionCategorias />;
        case 'sucursales':
            return <VistaSucursales />;
        case 'kardex':
            return <VistaKardex />;
        case 'empleados':
            return <VistaEmpleados />;
        case 'permisos':
            return <VistaPermisos />;
        case 'datos_negocio':
            return <VistaDatosNegocio />;
        case 'preferencias':
            return <VistaPreferencias />;

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