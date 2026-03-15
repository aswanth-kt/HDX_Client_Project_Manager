import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"

const RoleRoutes = ({ children, allowedRoles }) => {

  const { user } = useAuth();

  // not loggedin
  if (!user) {
    return <Navigate to="/" replace />
  }

  // if not allowed role redirect
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to='/' replace />
  }

  // permission allowed
  return (
    children
  )
}

export default RoleRoutes