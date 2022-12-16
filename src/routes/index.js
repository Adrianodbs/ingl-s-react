import { Routes, Route } from 'react-router-dom'

import DicionarioPage from '../pages/dicionario'
import Register from '../pages/Register'

function RoutesApp() {
  return (
    <Routes>
      <Route path="/" element={<DicionarioPage />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  )
}

export default RoutesApp
