import { Navigate } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";

const ProtectedRoutes = ({ children }) => {

  const { user, loading } = useAuth();

  if (loading) {
    return null;
  }

  // if not logedin redirect login page
  if (!user) {
    return <Navigate to="/" replace />
  }

  // if loggedin allow access
  return children;
}

export default ProtectedRoutes