import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, LogOut, Unlock, Lock } from 'lucide-react';
import { useCaja } from '../../context/CajaContext';
import ModalCaja from '../dashboard/caja/ModalCaja';
import ModalPerfil from '../perfil/ModalPerfil'

export default function MenuPerfil({ nombre = 'Admin'}) {
    const [abierto, setAbierto]         = useState(false);
    const [mostrarModal, setMostrarModal] = useState(false);
    const { miCaja } = useCaja();
    const [mostrarPerfil, setMostrarPerfil] = useState(false);
    const navigate = useNavigate();

    return (
        <>
            <div className="relative">
                <button
                    onClick={() => setAbierto(!abierto)}
                    className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                    <div className="w-8 h-8 rounded-xl bg-indigo-100 dark:bg-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold text-sm">
                        {nombre.charAt(0)}
                    </div>
                </button>

                {abierto && (
                    <>
                        {/* Overlay para cerrar */}
                        <div className="fixed inset-0 z-30" onClick={() => setAbierto(false)} />

                        <div className="absolute right-0 top-11 z-40 w-52 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">

                            {/* Info usuario */}
                            <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                                <p className="text-sm font-bold text-gray-900 dark:text-white">{nombre}</p>
                                <p className="text-xs text-gray-400 dark:text-gray-500">Administrador</p>
                            </div>

                            <div className="p-1.5 space-y-0.5">
                                {/* Tu Perfil */}
                                <button
                                    onClick={() => { setAbierto(false); setMostrarPerfil(true); }}
                                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                >
                                    <User size={15} />
                                    Tu Perfil
                                </button>

                                {/* ABRIR / CERRAR CAJA */}
                                <button
                                    onClick={() => { setAbierto(false); setMostrarModal(true); }}
                                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                                        miCaja.estaAbierta
                                        ? 'text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10'
                                        : 'text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-500/10'
                                    }`}
                                >
                                    {miCaja.estaAbierta
                                        ? <><Lock size={15} /> Cerrar Caja</>
                                        : <><Unlock size={15} /> Abrir Caja</>
                                    }
                                </button>

                                <div className="border-t border-gray-100 dark:border-gray-700 my-1" />

                                {/* Cerrar sesión */}
                                <button
                                onClick={() => {
                                    setAbierto(false);
                                    localStorage.removeItem('sesion_activa');
                                    navigate('/');
                                }}
                                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors"
                            >
                                <LogOut size={15} />
                                Cerrar sesión
                            </button>
                            </div>
                        </div>
                    </>
                )}
            </div>

            {/* Modal Caja */}
            {mostrarModal && (
                <ModalCaja onCerrar={() => setMostrarModal(false)} />
            )}
                {mostrarPerfil && (
                <ModalPerfil onCerrar={() => setMostrarPerfil(false)} />
            )}
        </>
    );
}