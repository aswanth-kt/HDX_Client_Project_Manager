import { Route, Routes } from 'react-router-dom'
import './App.css'
import Dashboard from './pages/Dashboard'
import Clients from './pages/Clients'
import Projects from './pages/Projects'
import Login from './pages/Login'
import Register from './pages/Register'
import ProtectedRoutes from './routes/protectedRoutes'

function App() {

  return (
   <>
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route 
        path='/dashboard' 
        element={
          <ProtectedRoutes>
            <Dashboard />
          </ProtectedRoutes>
        } 
      />
      <Route 
        path='/clients' 
        element={
          <ProtectedRoutes>
            <Clients />
          </ProtectedRoutes>
        }
        />
      <Route 
        path='/projects'
        element={
          <ProtectedRoutes>
            <Projects />
          </ProtectedRoutes>
        }
      />
    </Routes>
   </>
  )
}

export default App
