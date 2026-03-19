
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Tema from './components/ThemeToggle';
import Inventario from './pages/InventarioPage';
import './App.css'

function App() {
  

  return (
    <Router>
      <div className="min-h-screen transition-colors duration-300 bg-white dark:bg-gray-900">
        {/* Botón cambia de tema claro y oscuro*/}
        <div className="fixed bottom-6 left-6 z-[9999]">
          <Tema />
        </div>

        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Inventario" element={<Inventario/>} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
