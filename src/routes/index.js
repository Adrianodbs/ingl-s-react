import { Routes, Route } from 'react-router-dom'

import DicionarioPage from '../pages/dicionario'
import Register from '../pages/Register'
import Home from '../pages/Home'

function RoutesApp() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  )
}

export default RoutesApp
