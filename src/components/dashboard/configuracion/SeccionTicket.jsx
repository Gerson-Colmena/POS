import React, { useState } from 'react';
import { Save, ReceiptText, Eye } from 'lucide-react';

export default function SeccionTicket() {
    const [config, setConfig] = useState({
        mensajeBienvenida: '¡Gracias por su compra!',
        mensajePie:        'Vuelva pronto. Conserve su ticket para cambios.',
        mostrarLogo:       true,
        mostrarNit:        true,
        mostrarHora:       true,
        copias:            1,
    });

    const handleChange = (campo, valor) => {
        setConfig(prev => ({ ...prev, [campo]: valor }));
    };

    const inputClass = "w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500";
    const labelClass = "block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5";

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
            <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/30">
                <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400">
                    <ReceiptText size={18} />
                </div>
                <div>
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                        Personalización del Ticket
                    </h3>
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                        Mensajes y opciones del PDF generado
                    </p>
                </div>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Formulario */}
                <div className="space-y-4">
                    <div>
                        <label className={labelClass}>Mensaje de bienvenida</label>
                        <input type="text" value={config.mensajeBienvenida}
                            onChange={e => handleChange('mensajeBienvenida', e.target.value)}
                            className={inputClass} />
                    </div>
                    <div>
                        <label className={labelClass}>Mensaje al pie del ticket</label>
                        <textarea
                            value={config.mensajePie}
                            onChange={e => handleChange('mensajePie', e.target.value)}
                            rows={3}
                            className={`${inputClass} resize-none`}
                        />
                    </div>
                    <div>
                        <label className={labelClass}>Número de copias</label>
                        <select value={config.copias}
                            onChange={e => handleChange('copias', parseInt(e.target.value))}
                            className={inputClass}>
                            <option value={1}>1 copia</option>
                            <option value={2}>2 copias</option>
                            <option value={3}>3 copias</option>
                        </select>
                    </div>

                    {/* Checkboxes */}
                    <div className="space-y-2.5 pt-1">
                        {[
                            { campo: 'mostrarLogo', label: 'Mostrar logotipo en el ticket' },
                            { campo: 'mostrarNit',  label: 'Mostrar NIT / RUC'             },
                            { campo: 'mostrarHora', label: 'Mostrar hora de la venta'       },
                        ].map(({ campo, label }) => (
                            <label key={campo} className="flex items-center gap-3 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    checked={config[campo]}
                                    onChange={e => handleChange(campo, e.target.checked)}
                                    className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                    {label}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Vista previa del ticket */}
                <div>
                    <div className="flex items-center gap-1.5 text-xs font-medium text-gray-400 dark:text-gray-500 mb-3">
                        <Eye size={13} /> Vista previa del ticket
                    </div>
                    <div className="bg-white dark:bg-gray-900 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-2xl p-5 font-mono text-xs text-gray-700 dark:text-gray-300 space-y-1.5">
                        {config.mostrarLogo && (
                            <div className="text-center font-bold text-sm mb-2 text-indigo-600 dark:text-indigo-400">
                                [ LOGO ]
                            </div>
                        )}
                        <p className="text-center font-bold">Mi Tienda Bolivia</p>
                        <p className="text-center text-gray-400">Av. 6 de Agosto #123, La Paz</p>
                        {config.mostrarNit && <p className="text-center text-gray-400">NIT: 1234567890</p>}
                        <div className="border-t border-dashed border-gray-200 dark:border-gray-600 my-2" />
                        <p className="text-center font-bold">{config.mensajeBienvenida}</p>
                        <div className="border-t border-dashed border-gray-200 dark:border-gray-600 my-2" />
                        <div className="flex justify-between"><span>Producto A x2</span><span>Bs. 96.00</span></div>
                        <div className="flex justify-between"><span>Producto B x1</span><span>Bs. 35.50</span></div>
                        <div className="border-t border-dashed border-gray-200 dark:border-gray-600 my-2" />
                        <div className="flex justify-between font-bold"><span>TOTAL</span><span>Bs. 131.50</span></div>
                        {config.mostrarHora && <p className="text-center text-gray-400 mt-1">21/03/2025 — 10:32 AM</p>}
                        <div className="border-t border-dashed border-gray-200 dark:border-gray-600 my-2" />
                        <p className="text-center text-gray-400">{config.mensajePie}</p>
                    </div>
                </div>

            </div>

            <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-700 flex justify-end">
                <button
                    onClick={() => alert('✅ Configuración del ticket guardada (Supabase próximamente)')}
                    className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-all shadow-md"
                >
                    <Save size={15} />
                    Guardar configuración
                </button>
            </div>
        </div>
    );
}