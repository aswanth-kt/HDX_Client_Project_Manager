import { createContext, useContext, useEffect, useState } from "react";
import axios from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


  // check logged user when app load
  useEffect(() => {
    
    const fetchUser = async () => {
      try {

        const res = await axios.get("/api/auth/me");

        setUser(res.data.user)
        
      } catch (error) {

        console.error(error);
        setUser(null);

      } finally {

        setLoading(false);

      }
    };

    fetchUser();
  }, []);

  //logout function
  const logout = async () => {
    try {

      await axios.post("/api/auth/logout");
      setUser(null);
      
    } catch (error) {
      
      console.error(error?.message || error);

    }
  }

  return (
    <AuthContext.Provider value={{ user, setUser, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// custom hook
export const useAuth = () => {
  return useContext(AuthContext);
};