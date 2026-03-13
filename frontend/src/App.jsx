import { Route, Routes } from 'react-router-dom'
import './App.css'
import Dashboard from './pages/Dashboard'
import Clients from './pages/Clients'
import Projects from './pages/Projects'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {

  return (
   <>
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/clients' element={<Clients />} />
      <Route path='/projects' element={<Projects />} />
    </Routes>
   </>
  )
}

export default App
