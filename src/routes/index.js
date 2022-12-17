import { Routes, Route } from 'react-router-dom'

import DicionarioPage from '../pages/dicionario'
import Register from '../pages/Register'
import Home from '../pages/Home'

import Private from './Private'

function RoutesApp() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/dicionario"
        element={
          <Private>
            <DicionarioPage />
          </Private>
        }
      />
    </Routes>
  )
}

export default RoutesApp
