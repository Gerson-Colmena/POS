import React, { useState } from 'react';
import { X, Unlock, Lock, AlertTriangle } from 'lucide-react';
import { useCaja } from '../../../context/CajaContext';

export default function ModalCaja({ onCerrar }) {
    const { miCaja, abrirCaja, cerrarCaja } = useCaja();
    const [cajero, setCajero]           = useState('');
    const [montoInicial, setMontoInicial] = useState('');
    const [montoContado, setMontoContado] = useState('');

    const ventasDelDia = 1240.50; // Luego vendrá de Supabase
    const montoEsperado = (parseFloat(miCaja.montoInicial) || 0) + ventasDelDia;
    const diferencia = montoContado ? parseFloat(montoContado) - montoEsperado : null;

    const handleAbrir = () => {
        if (!cajero || !montoInicial) { alert('Completa todos los campos'); return; }
        abrirCaja({ cajero, montoInicial: parseFloat(montoInicial) });
        onCerrar();
    };

    const handleCerrar = () => {
        if (!montoContado) { alert('Ingresa el monto contado'); return; }
        cerrarCaja({ montoContado: parseFloat(montoContado) });
        onCerrar();
    };

    const inputClass = "w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500";
    const labelClass = "block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5";

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-md border border-gray-100 dark:border-gray-700">

                {/* Header */}
                <div className={`flex items-center justify-between p-5 border-b border-gray-100 dark:border-gray-700 rounded-t-2xl ${
                    miCaja.estaAbierta
                    ? 'bg-rose-50 dark:bg-rose-500/10'
                    : 'bg-green-50 dark:bg-green-500/10'
                }`}>
                    <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-xl ${
                            miCaja.estaAbierta
                            ? 'bg-rose-100 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400'
                            : 'bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400'
                        }`}>
                            {miCaja.estaAbierta ? <Lock size={18} /> : <Unlock size={18} />}
                        </div>
                        <h3 className="text-base font-bold text-gray-900 dark:text-white">
                            {miCaja.estaAbierta ? 'Cerrar Caja' : 'Abrir Caja'}
                        </h3>
                    </div>
                    <button onClick={onCerrar} className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700">
                        <X size={16} />
                    </button>
                </div>

                <div className="p-5 space-y-4">
                    {!miCaja.estaAbierta ? (
                        /* FORMULARIO APERTURA */
                        <>
                            <div>
                                <label className={labelClass}>Nombre del cajero</label>
                                <input type="text" value={cajero}
                                    onChange={e => setCajero(e.target.value)}
                                    placeholder="Ej: Gerson Colmena"
                                    className={inputClass} />
                            </div>
                            <div>
                                <label className={labelClass}>Monto inicial en caja (Bs.)</label>
                                <input type="number" value={montoInicial}
                                    onChange={e => setMontoInicial(e.target.value)}
                                    placeholder="Ej: 500.00" min="0"
                                    className={inputClass} />
                            </div>
                            <button onClick={handleAbrir}
                                className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl transition-all shadow-md">
                                <Unlock size={18} /> Abrir Caja
                            </button>
                        </>
                    ) : (
                        /* FORMULARIO CIERRE */
                        <>
                            {/* Resumen */}
                            <div className="grid grid-cols-2 gap-3">
                                <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-3 border border-gray-100 dark:border-gray-700">
                                    <p className="text-xs text-gray-400 dark:text-gray-500">Ventas del día</p>
                                    <p className="text-lg font-bold text-green-600 dark:text-green-400">
                                        + Bs. {ventasDelDia.toFixed(2)}
                                    </p>
                                </div>
                                <div className="bg-indigo-50 dark:bg-indigo-500/10 rounded-xl p-3 border border-indigo-100 dark:border-indigo-500/20">
                                    <p className="text-xs text-indigo-400">Monto esperado</p>
                                    <p className="text-lg font-bold text-indigo-700 dark:text-indigo-400">
                                        Bs. {montoEsperado.toFixed(2)}
                                    </p>
                                </div>
                            </div>

                            <div>
                                <label className={labelClass}>Monto contado físicamente (Bs.)</label>
                                <input type="number" value={montoContado}
                                    onChange={e => setMontoContado(e.target.value)}
                                    placeholder="Ej: 1240.00" min="0"
                                    className={inputClass} />
                            </div>

                            {/* Alerta descuadre */}
                            {diferencia !== null && Math.abs(diferencia) > 0.01 && (
                                <div className={`flex items-center gap-2 text-sm font-medium px-4 py-3 rounded-xl ${
                                    diferencia < 0
                                    ? 'bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-100 dark:border-rose-500/20'
                                    : 'bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-100 dark:border-amber-500/20'
                                }`}>
                                    <AlertTriangle size={16} />
                                    {diferencia < 0
                                        ? `Faltante de Bs. ${Math.abs(diferencia).toFixed(2)}`
                                        : `Sobrante de Bs. ${diferencia.toFixed(2)}`
                                    }
                                </div>
                            )}

                            <button onClick={handleCerrar}
                                className="w-full flex items-center justify-center gap-2 bg-rose-600 hover:bg-rose-700 text-white font-bold py-3 rounded-xl transition-all shadow-md">
                                <Lock size={18} /> Cerrar Caja
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}