import React, { useState } from 'react';
import { PackagePlus, X, UploadCloud, ImageIcon, Sparkles } from 'lucide-react';
import BotonUI from '../ui/BotonUI';

export default function ModalAñadirProducto({ isOpen, onClose, onConfirm }) {
    
    // 1. ESTADOS: La memoria del formulario
    const [nombre, setNombre] = useState('');
    const [precio, setPrecio] = useState('');
    const [stock, setStock] = useState('');
    const [categoria, setCategoria] = useState('Accesorios'); // Categoría por defecto
    const [imagenUrl, setImagenUrl] = useState(''); // Foto temporal

    // Si no está abierto, no dibuja nada
    if (!isOpen) return null; 

    // 2. FUNCIÓN MÁGICA: Para leer la foto del dispositivo
    const handleFileChange = (event) => {
        const archivoSeleccionado = event.target.files[0];
        if (archivoSeleccionado) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagenUrl(reader.result); // Guarda la foto temporal en Base64
            };
            reader.readAsDataURL(archivoSeleccionado);
        }
    };

    // 3. FUNCIÓN DE GUARDADO
    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Empaquetamos los datos en un nuevo objeto
        const nuevoProducto = {
            id: Date.now(), // Generamos un ID temporal único basado en la hora
            nombre,
            precio: parseFloat(precio),
            stock: parseInt(stock),
            categoria,
            // Si no subió foto, le ponemos una imagen gris por defecto
            imagenUrl: imagenUrl || 'https://via.placeholder.com/300?text=Sin+Imagen' 
        };

        // Se lo enviamos al Padre (InventarioPage)
        onConfirm(nuevoProducto);

        // Limpiamos el formulario para la próxima vez que se abra
        setNombre('');
        setPrecio('');
        setStock('');
        setCategoria('Accesorios');
        setImagenUrl('');
    };

    return (
        // Fondo oscuro semi-transparente
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
        
        {/* Caja del Modal (La hice un poco más ancha: max-w-xl) */}
        <div className="bg-white dark:bg-gray-900 w-full max-w-xl rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden relative">
            
            {/* Cabecera */}
            <div className="p-5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-lg">
                        <PackagePlus size={24} />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Añadir Nuevo Producto</h2>
                </div>
                {/* Botón de cerrar (X) arriba a la derecha */}
                <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors">
                    <X size={20} />
                </button>
            </div>

            {/* Formulario */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
            
            {/* SECCIÓN FOTO (Igual de profesional que en Editar) */}
            <div className="flex flex-col sm:flex-row items-center gap-6 bg-gray-50 dark:bg-gray-950 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 transition-colors">
                <div className="aspect-square h-28 w-28 rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shrink-0 shadow-inner flex items-center justify-center relative group">
                    {imagenUrl ? (
                        <img src={imagenUrl} alt="Previsualización" className="h-full w-full object-cover object-center transition-transform group-hover:scale-105" />
                    ) : (
                        <ImageIcon size={32} className="text-gray-300 dark:text-gray-600" />
                    )}
                </div>
                <div className="flex-1 w-full space-y-3">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Foto del Producto
                    </label>
                    <label 
                        htmlFor="upload-new-image" 
                        className="w-full flex items-center justify-center gap-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-4 py-3 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:border-indigo-400 dark:hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer shadow-sm transition-all active:scale-98"
                    >
                        <UploadCloud size={18} className="text-gray-400" />
                        Subir foto desde dispositivo
                    </label>
                    <input 
                        id="upload-new-image" 
                        type="file" 
                        accept="image/*" 
                        onChange={handleFileChange} 
                        className="hidden" 
                    />
                </div>
            </div>

            {/* SECCIÓN DE DATOS BÁSICOS */}
            <div className="flex gap-4 flex-col sm:flex-row">
                <div className="flex-[2]">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nombre del Producto</label>
                    {/* Fíjate cómo conectamos el value y el onChange */}
                    <input required type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Ej: Cuaderno A4" className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
                <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Categoría</label>
                    {/* AQUÍ ESTÁ EL SELECTOR DE CATEGORÍA */}
                    <select 
                        value={categoria} 
                        onChange={(e) => setCategoria(e.target.value)} 
                        className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                    >
                        <option value="Accesorios">Accesorios</option>
                        <option value="Papelería">Papelería</option>
                        <option value="Bebidas">Bebidas</option>
                        <option value="Cuero">Cuero</option>
                        <option value="Electrónica">Electrónica</option>
                    </select>
                </div>
            </div>

            <div className="flex gap-4">
                <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Precio (Bs.)</label>
                    <input required type="number" step="0.01" value={precio} onChange={(e) => setPrecio(e.target.value)} placeholder="0.00" className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
                <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Stock Inicial</label>
                    <input required type="number" value={stock} onChange={(e) => setStock(e.target.value)} placeholder="0" className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
            </div>

            {/* Botones de acción usando tu componente BotonUI */}
            <div className="flex justify-end gap-3 pt-6 mt-4 border-t border-gray-100 dark:border-gray-800">
                <BotonUI variante="secundario" onClick={onClose}>Cancelar</BotonUI>
                <BotonUI tipo="submit" variante="primario">Guardar en Inventario</BotonUI>
            </div>
            </form>
        </div>
        </div>
    );
}