import { Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Clients from './pages/Clients'
import Projects from './pages/Projects'
import Login from './pages/Login'
import Register from './pages/Register'
import RoleRoutes from './routes/RoleRoutes'
import PageNotFound from './pages/PageNotFound'
import AddProject from './pages/AddProject'
import AddClient from './pages/AddClient'
import EditClient from './pages/EditClient'
import AssignedProjects from './pages/AssignedProjects'
import AuthRedirectRoute from './routes/AuthRedirectRoute'

function App() {

  return (
   <>
    <Routes>

      <Route path='*' element={<PageNotFound />} />

      <Route path='/' 
        element={
          <AuthRedirectRoute>
            <Login />
          </AuthRedirectRoute>
        } 
      />

      <Route path='/register' 
        element={
          <AuthRedirectRoute>
            <Register />
          </AuthRedirectRoute>
        } 
      />

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

      <Route path='/clients/edit/:id' 
        element={
          <RoleRoutes allowedRoles={["admin"]}>
            <EditClient />
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

      <Route path='/developer/projects'
        element={
          <RoleRoutes allowedRoles={["developer"]}>
            <AssignedProjects />
          </RoleRoutes>
        }
      />

    </Routes>
   </>
  )
}

export default App
