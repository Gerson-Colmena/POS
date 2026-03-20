import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Bell, Hexagon } from 'lucide-react';

export default function Navbar() {
    const location = useLocation();
    
    // 1. Estados y Referencias para el Menú
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);

    // 2. Efecto para cerrar el menú si haces clic fuera de él
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const navigation = [
        { name: 'Dashboard', href: '/dashboard' },
        { name: 'Inventario', href: '/inventario' },
        { name: 'Ventas', href: '/ventas' },
        { name: 'Reportes', href: '/reportes' },
    ];

    return (
        <nav className="bg-white dark:bg-[#111827] border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between gap-8">
                
                <div className="flex items-center gap-8">
                    <Link to="/dashboard" className="flex shrink-0 items-center text-indigo-600 dark:text-indigo-500">
                        <Hexagon className="h-8 w-8 fill-current" />
                    </Link>

                    <div className="hidden md:block">
                        <div className="flex items-baseline space-x-2">
                            {navigation.map((item) => {
                            const isActive = location.pathname === item.href;
                            return (
                                <Link
                                key={item.name}
                                to={item.href}
                                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                                    isActive
                                    ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white' 
                                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white' 
                                }`}
                                >
                                {item.name}
                                </Link>
                            );
                            })}
                        </div>
                    </div>
                </div>

                <div className="flex flex-1 items-center justify-end gap-4 md:gap-6">
                    
                    <div className="w-full max-w-md lg:max-w-xs">
                        <div className="relative">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <Search className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                id="search"
                                name="search"
                                type="search"
                                placeholder="Buscar..."
                                className="block w-full rounded-md border-0 py-1.5 pl-10 pr-3 bg-gray-100 dark:bg-gray-800/50 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:focus:ring-indigo-500 sm:text-sm sm:leading-6 transition-colors duration-300"
                            />
                        </div>
                    </div>

                    <button
                        type="button"
                        className="relative shrink-0 rounded-full p-1 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 transition-colors"
                    >
                        <span className="sr-only">Ver notificaciones</span>
                        <Bell className="h-6 w-6" />
                        <span className="absolute top-1 right-1.5 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-gray-900" />
                    </button>

                    {/* 3. Avatar del Usuario + Menú Desplegable */}
                    <div className="relative shrink-0" ref={menuRef}>
                        <button
                            type="button"
                            className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            <span className="sr-only">Abrir menú de usuario</span>
                            <img
                                className="h-8 w-8 rounded-full object-cover"
                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                alt="Perfil del usuario"
                            />
                        </button>

                        {/* EL MINI MENÚ */}
                        {isMenuOpen && (
                            <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-gray-800 py-1 shadow-lg ring-1 ring-black/5 dark:ring-white/10 focus:outline-none transition-all">
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
                                <button
                                    onClick={() => {
                                        setIsMenuOpen(false);
                                        // Aquí irá la lógica para cerrar sesión (volver al login)
                                    }}
                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                >
                                    Cerrar sesión
                                </button>
                            </div>
                        )}
                    </div>

                </div>
                </div>
            </div>
        </nav>
    );
}