import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function MenuPerfil() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const navigate = useNavigate(); // Hook para navegar entre páginas

    // Efecto para cerrar el menú si haces clic afuera
    useEffect(() => {
        const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setIsMenuOpen(false);
        }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleCerrarSesion = () => {
        setIsMenuOpen(false);
        // Aquí en el futuro limpiarás el token de Supabase o LocalStorage
        navigate('/'); // Te devuelve a la pantalla de Login
    };

    return (
        <div className="relative shrink-0" ref={menuRef}>
        {/* Botón del Avatar */}
        <button
            type="button"
            className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 ring-2 ring-transparent hover:ring-indigo-500 transition-all"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
            <span className="sr-only">Abrir menú de usuario</span>
            <img
            className="h-8 w-8 rounded-full object-cover"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt="Perfil del usuario"
            />
        </button>

        {/* El Mini Menú Desplegable */}
        {isMenuOpen && (
            <div className="absolute right-0 z-50 mt-2 w-48 origin-top-right rounded-xl bg-white dark:bg-gray-800 py-1 shadow-lg ring-1 ring-black/5 dark:ring-white/10 focus:outline-none transition-all">
            <Link
                to="/perfil"
                className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                onClick={() => setIsMenuOpen(false)}
            >
                Tu Perfil
            </Link>
            <Link
                to="/configuracion"
                className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                onClick={() => setIsMenuOpen(false)}
            >
                Configuración
            </Link>
            
            <div className="border-t border-gray-100 dark:border-gray-700 my-1"></div>
            
            <button
                onClick={handleCerrarSesion}
                className="block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors font-medium"
            >
                Cerrar sesión
            </button>
            </div>
        )}
        </div>
    );
    }