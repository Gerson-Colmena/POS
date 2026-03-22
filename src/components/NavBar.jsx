import { Link, useLocation } from 'react-router-dom';
import { Search, Hexagon } from 'lucide-react';
import Notificaciones from './Notificaciones'; // O la ruta donde lo hayas guardado
import MenuPerfil from './MenuPerfil';

export default function Navbar() {
    const location = useLocation();

    const navigation = [
        { name: 'Dashboard', href: '/dashboard' }, 
        { name: 'Inventario', href: '/inventario' },
        { name: 'Ventas', href: '/ventas' },
        
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
                    <Notificaciones />
                    <MenuPerfil />
                </div>
            </div>
            </div>
        </nav>
    );
}