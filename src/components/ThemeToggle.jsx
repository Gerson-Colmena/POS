import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react'; // Necesitas instalar lucide-react

export default function ThemeToggle() {
    // 1. Estado para saber si es oscuro o no
    const [isDark, setIsDark] = useState(() => {
        // Revisa si el usuario ya tenía una preferencia guardada
        return localStorage.getItem('theme') === 'dark';
    });

    // 2. Efecto para aplicar el cambio al HTML
    useEffect(() => {
        if (isDark) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
        } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
        }
    }, [isDark]);

    return (
        <button
        onClick={() => setIsDark(!isDark)}
        className="p-2 rounded-lg bg-gray-400 dark:bg-gray-700 text-gray-800 dark:text-yellow-400 transition-all hover:scale-110 active:scale-95 shadow-md"
        aria-label="Toggle Theme"
        >
        {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
    );
}