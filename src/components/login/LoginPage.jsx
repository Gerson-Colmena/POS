import { Link, useNavigate } from 'react-router-dom';

export default function LoginPage() {
  
    const navigate = useNavigate(); 

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí ira mi lógica de Supabase después
        // Por ahora, simulamos que entra con éxito:
        navigate('/Ventas'); 
    };
return (
    <>
        {/*aqui esta todo el componente del login el pequeño*/}
        <div className="shadow-2xl bg-white dark:bg-gray-900 rounded-lg flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 transition-colors duration-300 border border-gray-100 dark:border-gray-800">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
                alt="Your Company"
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                className="mx-auto h-10 w-auto"
            />
            <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900 dark:text-white transition-colors duration-300">
                Iniciar sesión para Ingresar
            </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900 dark:text-gray-100 transition-colors duration-300">
                    Nombre de Cuenta
                </label>
                <div className="mt-2">
                    <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-gray-900 dark:text-white outline-1 -outline-offset-1 outline-gray-400 dark:outline-white/10  placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                    />
                </div>
                </div>

                <div>
                <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900 dark:text-gray-100 transition-colors duration-300">
                        Contraseña
                    </label>
                </div>
                <div className="mt-2">
                    <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    autoComplete="current-password"
                    className="block w-full rounded-md bg-transparent dark:bg-white/5 px-3 py-1.5 text-base text-gray-900 dark:text-white outline-1 -outline-offset-1 outline-gray-400 dark:outline-white/10 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 dark:focus:outline-indigo-500 sm:text-sm/6 transition-colors duration-300"
                    />
                </div>
                </div>

                <div>
                <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 dark:bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-500 dark:hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors duration-300"
                >
                    Sign in
                </button>
                </div>
            </form>

            <p className="mt-10 text-center text-sm/6 text-gray-500 dark:text-gray-400 transition-colors duration-300">
                Empieza La Jornada Con La Mejor Actitud{' '}
            </p>
            </div>
        </div>
    </>
    )
}