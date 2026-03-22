    import React from 'react'; // ¡Ya no hay useState!
    import { FileText, Trash2 } from 'lucide-react';
    import jsPDF from 'jspdf';               // 1. Importamos el creador de PDFs
    import autoTable from 'jspdf-autotable';              // 2. Importamos el creador de tablas

    // El componente ahora es "tonto": solo dibuja lo que el Padre le manda
    export default function PanelCarrito({ itemsCarrito=[], onEliminarItem, onVaciarCarrito }) {
        
        // El total se calcula usando los datos que llegaron desde el Padre
        const total = itemsCarrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);

        const handleFinalizarCompra = () => {
            // 1. Si el carrito está vacío, mostramos error y SALIMOS de la función
            if (itemsCarrito.length === 0) {
                alert('El carrito está vacío. Añade productos primero.');
                return;
            }

            // ==========================================
            // 2. EL ESPACIO PARA SUPABASE (Próximamente)
            // ==========================================
            const ventaParaBaseDeDatos = {
                fecha: new Date().toISOString(),
                total: total,
                productos: itemsCarrito
            };
            console.log("Simulando guardado en Base de Datos...", ventaParaBaseDeDatos);
            // await supabase.from('ventas').insert(ventaParaBaseDeDatos);

            // ==========================================
            // 3. GENERACIÓN DEL TICKET PDF
            // ==========================================
            const doc = new jsPDF();
            
            
            doc.setFontSize(20);
            doc.text("Ticket de Venta - POS Gerson", 14, 22);
            
            doc.setFontSize(11);
            doc.text(`Fecha: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`, 14, 32);
            doc.text(`Cajero: Turno Mañana`, 14, 38);

            const columnas = ["Producto", "Precio Unit.", "Cant.", "Subtotal"];
            const filas = itemsCarrito.map(item => [
                item.nombre,
                `Bs. ${item.precio.toFixed(2)}`,
                item.cantidad,
                `Bs. ${(item.precio * item.cantidad).toFixed(2)}`
            ]);

            autoTable(doc, {
                startY: 45, 
                head: [columnas],
                body: filas,
                theme: 'striped',
                headStyles: { fillColor: [79, 70, 229] } 
            });

            const posicionYFinal = doc.lastAutoTable.finalY + 15;
            doc.setFontSize(14);
            
            // ¡Cuidado aquí! Usamos template literals correctos (backticks)
            doc.text(`TOTAL A PAGAR: Bs. ${total.toFixed(2)}`, 14, posicionYFinal);

            // Descargamos el archivo
            // 3. CAMBIO AQUÍ: Extraemos el Date.now() a una variable para que tu linter no llore
            doc.save("Ticket_Venta.pdf");

            // ==========================================
            // 4. LIMPIEZA Y NOTIFICACIÓN AL USUARIO
            // ==========================================
            onVaciarCarrito();
            alert('¡Venta registrada con éxito y ticket generado!');
        };

        return (
            <div className="flex flex-col h-full bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden transition-colors">
            
            {/* Cabecera del Carrito */}
            <div className="p-5 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 flex justify-between items-center">
                <div>
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">Orden Actual</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Ticket #0045</p>
                </div>
                {/* Pequeño contador de items */}
                <span className="bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 text-xs font-bold px-2.5 py-1 rounded-lg">
                    {itemsCarrito.length} items
                </span>
            </div>

            {/* 1er DIV INTERNO: La lista con Scroll */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 custom-scrollbar">
                
                {/* Mensaje si el carrito está vacío */}
                {itemsCarrito.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-gray-400 dark:text-gray-500 space-y-2">
                        <FileText size={48} className="opacity-20" />
                        <p>El carrito está vacío</p>
                    </div>
                ) : (
                    // Si hay items, los dibujamos
                    itemsCarrito.map((item) => (
                    <div key={item.id} className="flex justify-between items-center bg-gray-50 dark:bg-gray-900/50 p-3 rounded-xl border border-gray-100 dark:border-gray-700/50 group">
                        <div className="flex-1">
                            <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">{item.nombre}</h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400 font-mono">Bs. {item.precio} x {item.cantidad}</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="font-semibold text-gray-900 dark:text-white">
                                Bs. {(item.precio * item.cantidad).toFixed(2)}
                            </span>
                            
                            {/* APLICAMOS LA FUNCIÓN QUE VINO DEL PADRE */}
                            <button 
                                onClick={() => onEliminarItem(item.id)}
                                className="text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 p-1.5 rounded-lg transition-colors"
                                title="Eliminar producto"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </div>
                    ))
                )}
            </div>

            {/* 2do DIV INTERNO: Totales y Botón */}
            <div className="p-5 bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] dark:shadow-none z-10">
                <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-500 dark:text-gray-400 font-medium">Total a cobrar</span>
                    <span className="text-3xl font-extrabold text-gray-900 dark:text-white">
                        Bs. {total.toFixed(2)}
                    </span>
                </div>
                
                <button 
                    onClick={handleFinalizarCompra}
                    className={`w-full flex items-center justify-center gap-2 font-bold py-4 rounded-xl shadow-md transition-all active:scale-[0.98] ${
                        itemsCarrito.length === 0 
                        ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed shadow-none' 
                        : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                    }`}
                    disabled={itemsCarrito.length === 0}
                >
                    <FileText size={20} />
                    Finalizar Compra e Imprimir
                </button>
            </div>

            </div>
        );
    }