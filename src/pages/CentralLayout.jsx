import { Outlet } from 'react-router-dom';
import Navbar from '../components/layout/NavBar';

export default function MainLayout() {
    return (
        <>
        <Navbar />
        {/* Contenedor principal para que tus páginas no peguen con los bordes */}
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
            <Outlet />
        </main>
        </>
    );
}