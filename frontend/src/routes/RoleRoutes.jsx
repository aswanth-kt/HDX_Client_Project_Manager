import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"

const RoleRoutes = ({ children, allowedRoles }) => {

  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>
  }

  // not loggedin
  if (!user) {
    return <Navigate to="/" replace />
  }

  // if not allowed role redirect
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to='/' />
  }

  // permission allowed
  return (
    children
  )
}

export default RoleRoutes