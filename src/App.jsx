
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Tema from './components/ThemeToggle';
import './App.css'

function App() {
  

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />} /> 
        <Route path="/tema" element={<Tema />} />
      </Routes>
    </Router>
  )
}

export default App
