import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './components/Home';
import { NotFound } from './components/NotFound';
import { VidPage } from './screens/VidPage';
import { Login } from './components/Login';
import { Register } from './components/Register';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/video/:id" element={ <VidPage /> } />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App
