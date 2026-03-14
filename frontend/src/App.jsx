import { Route, Routes } from 'react-router-dom'
import './App.css'
import Dashboard from './pages/Dashboard'
import Clients from './pages/Clients'
import Projects from './pages/Projects'
import Login from './pages/Login'
import Register from './pages/Register'
import ProtectedRoutes from './routes/protectedRoutes'
import RoleRoutes from './routes/RoleRoutes'
import PageNotFound from './pages/PageNotFound'
import AddProject from './pages/AddProject'
import AddClient from './pages/AddClient'

function App() {

  return (
   <>
    <Routes>

      <Route path='*' element={<PageNotFound />} />

      <Route path='/' element={<Login />} />

      <Route path='/register' element={<Register />} />

      <Route path='/dashboard' 
        element={
          <RoleRoutes allowedRoles={["admin"]}>
            <Dashboard />
          </RoleRoutes>
        } 
      />

      <Route path='/clients' 
        element={
          <RoleRoutes allowedRoles={["admin"]}>
            <Clients />
          </RoleRoutes>
        }
      />

      <Route path='/clients/add' 
        element={
          <RoleRoutes allowedRoles={["admin"]}>
            <AddClient />
          </RoleRoutes>
        }
      />

      <Route path='/projects'
        element={
          <RoleRoutes allowedRoles={["admin"]}>
            <Projects />
          </RoleRoutes>
        }
      />

      <Route path='/projects/add'
        element={
          <RoleRoutes allowedRoles={["admin"]}>
            <AddProject />
          </RoleRoutes>
        }
      />

    </Routes>
   </>
  )
}

export default App
