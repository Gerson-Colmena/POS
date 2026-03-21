import React, { useEffect } from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';

export default function Notificacion({ mensaje, tipo = 'exito', onClose }) {
    // Desaparece automáticamente después de 3 segundos
    useEffect(() => {
        const timer = setTimeout(() => onClose(), 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    if (!mensaje) return null;

    const esExito = tipo === 'exito';

    return (
        <div className={`fixed bottom-4 right-4 z-[9999] flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border animate-fade-in-up ${
        esExito 
            ? 'bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-800 text-green-800 dark:text-green-300' 
            : 'bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-800 text-red-800 dark:text-red-300'
        }`}>
        {esExito ? <CheckCircle2 size={20} /> : <XCircle size={20} />}
        <p className="text-sm font-medium">{mensaje}</p>
        </div>
    );
}