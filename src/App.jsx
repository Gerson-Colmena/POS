
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Tema from './components/layout/ThemeToggle';
import Inventario from './pages/InventarioPage';
import Central from './pages/CentralLayout';
import Ventas from './pages/VentasPage';
import DashboardPage from './pages/DashboardPage';
import { CajaProvider } from './context/CajaContext';
import { SolicitudesProvider } from './context/SolicitudesContext';
import RutaProtegida from './components/auth/RutaProtegida';
import NotFoundPage  from './pages/NotFoundPage';
import './App.css'

function App() {
  

  return (
    <SolicitudesProvider>
      <CajaProvider>
        <Router>
          <div className="min-h-screen transition-colors duration-300 bg-white dark:bg-gray-900">
            <div className="fixed bottom-6 left-6 z-[9999]">
              <Tema />
            </div>
            <Routes>
              {/* Ruta pública */}
              <Route path="/" element={<Login />} />
              {/* Rutas protegidas */}
              <Route element={<RutaProtegida />}>
                <Route element={<Central />}>
                  <Route path="/ventas"     element={<Ventas />} />
                  <Route path="/inventario" element={<Inventario />} />
                  <Route path="/dashboard"  element={<DashboardPage />} />
                </Route>
              </Route>
              {/* Ruta 404 */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </Router>
      </CajaProvider>
    </SolicitudesProvider>
  )
}

export default App;
