import React from 'react';

export default function FilaPermiso({ permiso, roles, onToggle }) {
    return (
        <tr className="border-b border-gray-50 dark:border-gray-700/50">
            <td className="px-5 py-4">
                <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{permiso.accion}</p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{permiso.descripcion}</p>
            </td>
            {roles.map(rol => (
                <td key={rol} className="px-5 py-4 text-center">
                    <button
                        onClick={() => onToggle(permiso.id, rol)}
                        className={`w-6 h-6 rounded-lg border-2 transition-all flex items-center justify-center mx-auto ${
                            permiso.roles[rol]
                            ? 'bg-indigo-600 border-indigo-600 text-white'
                            : 'border-gray-300 dark:border-gray-600 hover:border-indigo-400'
                        }`}
                    >
                        {permiso.roles[rol] && (
                            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                                <path d="M2 5l2.5 2.5L8 2.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        )}
                    </button>
                </td>
            ))}
        </tr>
    );
}