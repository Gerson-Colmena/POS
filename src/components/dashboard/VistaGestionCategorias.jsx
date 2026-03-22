import React, { useState } from 'react';
import FormCategoria from './inventario/categorias/FormCategoria';
import FilaCategoria from './inventario/categorias/FilaCategoria';

const categoriasIniciales = [
    { id: 1, nombre: 'Botellas',    color: '#6366f1', totalProductos: 4 },
    { id: 2, nombre: 'Accesorios',  color: '#10b981', totalProductos: 7 },
    { id: 3, nombre: 'Papel',       color: '#f59e0b', totalProductos: 3 },
    { id: 4, nombre: 'Lápices',     color: '#ef4444', totalProductos: 5 },
    { id: 5, nombre: 'Bebidas',     color: '#3b82f6', totalProductos: 6 },
];

export default function VistaGestionCategorias() {
    const [categorias, setCategorias]         = useState(categoriasIniciales);
    const [categoriaEditar, setCategoriaEditar] = useState(null);

    const handleGuardar = (datos) => {
        if (categoriaEditar) {
            setCategorias(prev => prev.map(c =>
                c.id === categoriaEditar.id ? { ...c, ...datos } : c
            ));
            setCategoriaEditar(null);
        } else {
            setCategorias(prev => [...prev, {
                id: Date.now(), totalProductos: 0, ...datos
            }]);
        }
    };

    const handleEliminar = (categoria) => {
        if (confirm(`¿Eliminar la categoría "${categoria.nombre}"?`)) {
            setCategorias(prev => prev.filter(c => c.id !== categoria.id));
        }
    };

    return (
        <div className="p-6 space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Gestión de Categorías
                </h2>
                <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
                    Administra las categorías del catálogo y el buscador
                </p>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                {/* Formulario */}
                <div>
                    <FormCategoria
                        categoriaEditar={categoriaEditar}
                        onGuardar={handleGuardar}
                        onCancelar={() => setCategoriaEditar(null)}
                    />
                </div>

                {/* Lista */}
                <div className="xl:col-span-2 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
                    <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-700">
                        <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                            {categorias.length} categorías registradas
                        </h3>
                    </div>
                    <div className="divide-y divide-gray-50 dark:divide-gray-700/50">
                        {categorias.map(cat => (
                            <FilaCategoria
                                key={cat.id}
                                categoria={cat}
                                onEditar={setCategoriaEditar}
                                onEliminar={handleEliminar}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}