import React from 'react';
import { FileText, Trash2 } from 'lucide-react';

export default function PanelCarrito() {
    // Datos simulados del carrito para ver cómo funciona el scroll
    const itemsCarrito = [
        { id: 1, nombre: 'Earthen Bottle', precio: 48, cantidad: 2 },
        { id: 2, nombre: 'Nomad Tumbler', precio: 35.5, cantidad: 1 },
        { id: 3, nombre: 'Focus Paper', precio: 89, cantidad: 1 },
        { id: 4, nombre: 'Mechanical Pencil', precio: 64.2, cantidad: 3 },
        { id: 5, nombre: 'Leather Wallet', precio: 64, cantidad: 1 },
        { id: 6, nombre: 'Notebook Set', precio: 39.99, cantidad: 2 },
        // Añade más temporalmente si quieres ver cómo aparece la barra de scroll
    ];

    const total = itemsCarrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);

    const handleFinalizarCompra = () => {
        // Aquí irá tu lógica para generar el PDF (ej. usando jsPDF o window.print())
        alert('Generando Ticket en PDF y registrando venta en base de datos...');
    };

    return (
        <div className="flex flex-col h-full bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden transition-colors">
        
        {/* Cabecera del Carrito */}
        <div className="p-5 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Orden Actual</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Ticket #0045</p>
        </div>

        {/* 1er DIV INTERNO: La lista con Scroll (Tu idea) */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 custom-scrollbar">
            {itemsCarrito.map((item) => (
            <div key={item.id} className="flex justify-between items-center bg-gray-50 dark:bg-gray-900/50 p-3 rounded-xl border border-gray-100 dark:border-gray-700/50">
                <div className="flex-1">
                <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">{item.nombre}</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-mono">${item.precio} x {item.cantidad}</p>
                </div>
                <div className="flex items-center gap-4">
                <span className="font-semibold text-gray-900 dark:text-white">
                    ${(item.precio * item.cantidad).toFixed(2)}
                </span>
                <button className="text-gray-400 hover:text-red-500 transition-colors">
                    <Trash2 size={16} />
                </button>
                </div>
            </div>
            ))}
        </div>

        {/* 2do DIV INTERNO: Totales y Botón (Estático en la parte inferior) */}
        <div className="p-5 bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] dark:shadow-none z-10">
            <div className="flex justify-between items-center mb-4">
            <span className="text-gray-500 dark:text-gray-400 font-medium">Total a cobrar</span>
            <span className="text-3xl font-extrabold text-gray-900 dark:text-white">
                ${total.toFixed(2)}
            </span>
            </div>
            
            <button 
            onClick={handleFinalizarCompra}
            className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl shadow-md transition-all active:scale-[0.98]"
            >
            <FileText size={20} />
            Finalizar Compra e Imprimir
            </button>
        </div>

        </div>
    );
}