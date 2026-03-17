import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"
import Loading from "../components/Loading";

const AuthRedirectRoute = ({ children }) => {

  const { user, loading } = useAuth();

  if (loading) return <Loading />

  if(user) {

    if (user.role === "admin") {
      return <Navigate to="/dashboard" />
    };

    if (user.role === "developer") {
      return <Navigate to="/developer/projects" />
    }
  };

  return children;

}

export default AuthRedirectRoute