import RoutesApp from './routes'
import { BrowserRouter } from 'react-router-dom'
import './global.css'

function App() {
  return (
    <BrowserRouter>
      <RoutesApp />
    </BrowserRouter>
  )
}

export default App
