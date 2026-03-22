import React, { useState, useRef, useEffect } from 'react';
import { Search, Filter, Check } from 'lucide-react';

export default function BarraBusqueda({ busqueda, setBusqueda, categoriaActiva, setCategoriaActiva, categorias }) {
    // 1. Estados para el menú desplegable
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const filterRef = useRef(null);

    // 2. DATOS SIMULADOS (Mocks) - Mañana vendrán de la base de datos
    

    // 3. Efecto para cerrar el menú al hacer clic afuera
    useEffect(() => {
        const handleClickOutside = (event) => {
        if (filterRef.current && !filterRef.current.contains(event.target)) {
            setIsFilterOpen(false);
        }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);   
    return (
        <div className="flex flex-col sm:flex-row gap-3 bg-white dark:bg-gray-800 p-3 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 shrink-0 transition-colors">
        
        {/* Input de Búsqueda */}
        <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input 
            type="search" 
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar producto o escanear código..." 
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors outline-none text-gray-900 dark:text-white"
            />
        </div>

        {/* Botón de Filtro */}
        {/* Contenedor del Botón de Filtro y su Menú */}
        {/* Contenedor del Botón de Filtro y su Menú */}
        <div className="relative shrink-0" ref={filterRef}>
            <button 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={`w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 border rounded-xl text-sm font-medium transition-colors ${
                categoriaActiva !== 'Todas' 
                ? 'bg-indigo-50 dark:bg-indigo-500/10 border-indigo-200 dark:border-indigo-500/30 text-indigo-600 dark:text-indigo-400' 
                : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900'
            }`}
            >
            <Filter size={16} />
            {categoriaActiva === 'Todas' ? 'Categorías' : categoriaActiva}
            </button>

            {/* EL MENÚ DESPLEGABLE */}
            {isFilterOpen && (
            <div className="absolute right-0 z-20 mt-2 w-48 origin-top-right rounded-xl bg-white dark:bg-gray-800 py-2 shadow-lg ring-1 ring-black/5 dark:ring-white/10 focus:outline-none overflow-hidden transition-all">
                {/* 3. Ahora usamos la prop 'categorias' que nos mandó el Padre */}
                {categorias.map((cat) => (
                <button
                    key={cat}
                    onClick={() => {
                    setCategoriaActiva(cat);
                    setIsFilterOpen(false);
                    }}
                    className="w-full flex items-center justify-between px-4 py-2 text-sm text-left text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                    {cat}
                    {categoriaActiva === cat && <Check size={16} className="text-indigo-600 dark:text-indigo-400" />}
                </button>
                ))}
            </div>
            )}
        </div>
        
        </div>
    );
}