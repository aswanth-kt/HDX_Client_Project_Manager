import { Route, Routes } from 'react-router-dom'
import './App.css'
import Dashboard from './pages/Dashboard'
import Clients from './pages/Clients'
import Projects from './pages/Projects'

function App() {

  return (
   <>
    <Routes>
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/clients' element={<Clients />} />
      <Route path='/projects' element={<Projects />} />
    </Routes>
   </>
  )
}

export default App
