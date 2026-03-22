import React, { useState } from 'react';
import { Package, X, UploadCloud, ImageIcon, Sparkles } from 'lucide-react'; // 1. Nuevos iconos
import BotonUI from './BotonUI';
import Notificacion from './Notificacion';

// Ya no usamos useEffect, como acordamos en el "Senior fix" anterior
export default function ModalEditarProducto({ onClose, producto, onSaveSucces }) {
  
  // Estados para los campos
  const [nombre, setNombre] = useState(producto.nombre);
  const [precio, setPrecio] = useState(producto.precio);
  const [stock, setStock] = useState(producto.stock);
  const [categoria, setCategoria] = useState(producto.categoria || 'Accesorios');
  
  // 2. NUEVO: Estado para la imagen. Iniciará con la URL de mock (ej. tailwindui.com/...)
  const [imagenUrl, setImagenUrl] = useState(producto.imagenUrl);

  const [notificacion, setNotificacion] = useState({ mensaje: '', tipo: '' });

  // 3. NUEVA FUNCIÓN MÁGICA: handleFileChange
  // Se ejecuta cuando el usuario elige un archivo de su dispositivo
  const handleFileChange = (event) => {
    const archivoSeleccionado = event.target.files[0]; // Captura el primer archivo elegido

    // Verificamos que sí se haya seleccionado un archivo
    if (archivoSeleccionado) {
      
      console.log('Archivo local seleccionado:', archivoSeleccionado);

      // Creamos el lector de archivos (nativo del navegador)
      const reader = new FileReader();

      // Cuando el lector termine de "leer" el archivo...
      reader.onloadend = () => {
        // ...Actualizamos el estado 'imagenUrl' con la versión Base64 (Data URL)
        // La etiqueta <img> sabe renderizar esto perfectamente como una foto temporal.
        setImagenUrl(reader.result); 
      };

      // Iniciamos la lectura del archivo como Data URL (Base64)
      reader.readAsDataURL(archivoSeleccionado);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Aquí simularíamos la actualización
    const productoActualizado = {
        ...producto,
        nombre,
        precio: parseFloat(precio),
        stock: parseInt(stock),
        categoria,
        // 4. Se guarda la nueva Data URL temporal (Mañana será la URL final de Supabase)
        imagenUrl 
    };

    console.log('Simulando guardado con foto nueva:', productoActualizado);

    setNotificacion({ mensaje: '¡Producto actualizado correctamente!', tipo: 'exito' });
    
    setTimeout(() => {
        setNotificacion({ mensaje: '', tipo: '' });
        onSaveSucces(productoActualizado);
        onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
      
      <div className="bg-white dark:bg-gray-900 w-full max-w-xl rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden relative">
        
        {/* Cabecera del Modal */}
        <div className="p-5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between transition-colors">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-lg">
                <Package size={20} />
            </div>
            <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white transition-colors">Editar Producto</h2>
                <p className="text-xs font-mono text-gray-400">ID: {producto.id}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          
          {/* === 5. NUEVA SECCIÓN FOTO (Remodelada para upload local) === */}
          <div className="flex flex-col sm:flex-row items-center gap-6 bg-gray-50 dark:bg-gray-950 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 transition-colors">
             
             {/* Vista previa de la foto (Previsualización instantánea) */}
             <div className="aspect-square h-28 w-28 rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shrink-0 shadow-inner group relative">
                <img 
                    src={imagenUrl} 
                    alt="Previsualización" 
                    // El z-index asegura que esté debajo si quieres poner efectos hover después
                    className="h-full w-full object-cover object-center transition-transform group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ImageIcon size={24} className="text-white" />
                </div>
             </div>

             {/* Controles de subida */}
             <div className="flex-1 w-full space-y-3">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors">
                    Actualizar imagen del Producto
                </label>
                
                {/* 6. EL TRUCO SENIOR: Estilizar el label como botón */}
                <label 
                    htmlFor="upload-image" 
                    className="w-full flex items-center justify-center gap-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-4 py-3 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:border-indigo-400 dark:hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer shadow-sm transition-all active:scale-98"
                >
                    <UploadCloud size={18} className="text-gray-400" />
                    Seleccionar Foto de este dispositivo
                </label>

                {/* 7. El input de archivo REAL (Oculto con CSS) */}
                <input 
                    id="upload-image" 
                    type="file" 
                    accept="image/*" // Solo acepta imágenes
                    onChange={handleFileChange} // Llama a nuestra función mágica
                    className="hidden" // <--- ¡Importante! Oculta el input feo
                />

                {/* Mensaje de ayuda (Solo modo oscuro) */}
                <div className="flex items-center gap-2 text-xs text-amber-600 dark:text-amber-400 pt-1">
                    <Sparkles size={14} />
                    <p>Consejo: Usa fotos cuadradas para mejor visualización.</p>
                </div>
             </div>
          </div>

          {/* DATOS BÁSICOS (Sin cambios) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nombre del Producto</label>
            <input required type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} className="w-full px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          {/* NUEVO: SELECTOR DE CATEGORÍA */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Categoría</label>
            <select 
                value={categoria} 
                onChange={(e) => setCategoria(e.target.value)} 
                className="w-full px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
            >
                <option value="Accesorios">Accesorios</option>
                <option value="Papelería">Papelería</option>
                <option value="Bebidas">Bebidas</option>
                <option value="Cuero">Cuero</option>
                <option value="Electrónica">Electrónica</option>
            </select>
          </div>

          {/* Precio y Stock (Sin cambios) */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Precio (Bs.)</label>
              <input required type="number" step="0.01" value={precio} onChange={(e) => setPrecio(e.target.value)} className="w-full px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Stock</label>
              <input required type="number" value={stock} onChange={(e) => setStock(e.target.value)} className="w-full px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex justify-end gap-3 pt-6 mt-4 border-t border-gray-100 dark:border-gray-800">
            <BotonUI variante="secundario" onClick={onClose}>Cancelar</BotonUI>
            <BotonUI tipo="submit" variante="primario">Guardar Cambios</BotonUI>
          </div>
        </form>

        <Notificacion 
            mensaje={notificacion.mensaje} 
            tipo={notificacion.tipo} 
            onClose={() => setNotificacion({ mensaje: '', tipo: '' })} 
        />
      </div>
    </div>
  );
}