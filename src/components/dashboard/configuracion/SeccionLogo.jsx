import React, { useState, useRef } from 'react';
import { Upload, ImageOff, CheckCircle } from 'lucide-react';

export default function SeccionLogo() {
    const [logoUrl, setLogoUrl]   = useState(null);
    const [arrastrar, setArrastrar] = useState(false);
    const inputRef = useRef(null);

    const procesarArchivo = (archivo) => {
        if (!archivo) return;
        if (!archivo.type.startsWith('image/')) {
            alert('Solo se permiten imágenes (PNG, JPG, SVG)');
            return;
        }
        const url = URL.createObjectURL(archivo);
        setLogoUrl(url);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setArrastrar(false);
        procesarArchivo(e.dataTransfer.files[0]);
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
            <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/30">
                <div className="p-2 rounded-xl bg-violet-50 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400">
                    <ImageOff size={18} />
                </div>
                <div>
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white">Logotipo del Negocio</h3>
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                        Se mostrará en los tickets PDF generados
                    </p>
                </div>
            </div>

            <div className="p-6 flex flex-col sm:flex-row items-center gap-6">
                {/* Preview */}
                <div className="w-32 h-32 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 flex items-center justify-center shrink-0 overflow-hidden">
                    {logoUrl
                        ? <img src={logoUrl} alt="Logo" className="w-full h-full object-contain p-2" />
                        : <div className="text-center text-gray-300 dark:text-gray-600">
                            <ImageOff size={32} className="mx-auto mb-1" />
                            <p className="text-xs">Sin logo</p>
                          </div>
                    }
                </div>

                {/* Upload zone */}
                <div className="flex-1 w-full">
                    <div
                        onDragOver={e => { e.preventDefault(); setArrastrar(true); }}
                        onDragLeave={() => setArrastrar(false)}
                        onDrop={handleDrop}
                        onClick={() => inputRef.current?.click()}
                        className={`cursor-pointer rounded-2xl border-2 border-dashed p-6 text-center transition-all ${
                            arrastrar
                            ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-500/10'
                            : 'border-gray-200 dark:border-gray-600 hover:border-indigo-400 hover:bg-gray-50 dark:hover:bg-gray-700/30'
                        }`}
                    >
                        <Upload size={24} className="mx-auto mb-2 text-gray-400" />
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                            Arrastra tu logo aquí o <span className="text-indigo-600 dark:text-indigo-400">haz clic para subir</span>
                        </p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                            PNG, JPG o SVG — Máximo 2MB
                        </p>
                    </div>
                    <input
                        ref={inputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={e => procesarArchivo(e.target.files[0])}
                    />

                    {logoUrl && (
                        <div className="flex items-center gap-2 mt-3 text-sm text-green-600 dark:text-green-400">
                            <CheckCircle size={15} />
                            Logo cargado correctamente
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}