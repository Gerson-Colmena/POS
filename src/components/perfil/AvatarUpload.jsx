import React, { useState, useRef } from 'react';
import { Camera, UserCircle } from 'lucide-react';

export default function AvatarUpload({ nombre }) {
    const [avatarUrl, setAvatarUrl] = useState(null);
    const inputRef = useRef(null);

    const handleArchivo = (archivo) => {
        if (!archivo) return;
        if (!archivo.type.startsWith('image/')) {
            alert('Solo se permiten imágenes');
            return;
        }
        setAvatarUrl(URL.createObjectURL(archivo));
    };

    return (
        <div className="flex flex-col items-center gap-3">
            {/* Avatar */}
            <div className="relative group">
                <div className="w-24 h-24 rounded-2xl overflow-hidden bg-indigo-100 dark:bg-indigo-500/20 flex items-center justify-center">
                    {avatarUrl
                        ? <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                        : <span className="text-4xl font-extrabold text-indigo-600 dark:text-indigo-400">
                            {nombre?.charAt(0) ?? '?'}
                          </span>
                    }
                </div>
                {/* Botón cámara encima */}
                <button
                    onClick={() => inputRef.current?.click()}
                    className="absolute inset-0 rounded-2xl bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                >
                    <Camera size={22} className="text-white" />
                </button>
            </div>

            <button
                onClick={() => inputRef.current?.click()}
                className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
            >
                Cambiar foto
            </button>

            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={e => handleArchivo(e.target.files[0])}
            />
        </div>
    );
}