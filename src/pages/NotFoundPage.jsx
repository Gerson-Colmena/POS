import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft, SearchX } from 'lucide-react';

export default function NotFoundPage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
            <div className="text-center max-w-md">

                {/* Número 404 */}
                <div className="relative mb-6">
                    <p className="text-[8rem] font-extrabold text-gray-100 dark:text-gray-800 leading-none select-none">
                        404
                    </p>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-500">
                            <SearchX size={48} />
                        </div>
                    </div>
                </div>

                {/* Mensaje */}
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Página no encontrada
                </h1>
                <p className="text-gray-400 dark:text-gray-500 text-sm mb-8">
                    La página que buscas no existe o fue movida a otra dirección.
                </p>

                {/* Botones */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 text-sm font-medium transition-colors"
                    >
                        <ArrowLeft size={16} />
                        Volver atrás
                    </button>
                    <button
                        onClick={() => navigate('/ventas')}
                        className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold transition-colors shadow-md"
                    >
                        <Home size={16} />
                        Ir al inicio
                    </button>
                </div>
            </div>
        </div>
    );
}