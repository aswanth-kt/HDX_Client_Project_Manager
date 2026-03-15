import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "../api/axios";
import { useAuth } from '../context/AuthContext';


const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const res = await axios.post("/api/auth/login",
        { email, password }
      );

      // console.log("Login response:", res.data);

      setUser(res.data.loggedinUser)    // store logged user in context

      if (res.data?.loggedinUser?.role === "admin") {
        navigate("/dashboard")
      } else {
        navigate("/developer/projects");
      };
      
    } catch (error) {
      setError(error?.response?.data?.message || "Login failed")
      console.error(error);
    } finally {
      setLoading(false);
    }

  };


  return (
    <div className='flex items-center justify-center h-screen bg-gray-100'>

      <form onSubmit={handleSubmit} className='bg-white p-8 rounded shadow w-80'>

        <h2 className='text-2xl mb-6 text-center font-bold'>
          Login
        </h2>

        <input type="email"
        value={email}
        placeholder='Email'
        className='border p-2 w-full mb-4'
        required
        onChange={(e) => setEmail(e.target.value)}
        />

        <input type="password"
        value={password}
        placeholder='Password'
        className='border p-2 w-full mb-4'
        required
        onChange={(e) => setPassword(e.target.value)}
        />

        <button 
        type='submit' 
        className='bg-blue-600 text-white w-full py-2 rounded disabled:opacity-70 flex items-center justify-center gap-2'
        disabled={loading}
        >
          <span className={`${loading ? "w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" : ""}`} />
          
          {!loading ? "Login" : "Logging..."}
        </button>

        <p className='text-center mt-4'>
          No account?
          <Link to="/register" className='text-blue-500'> Register</Link>
        </p>

        {error && (
          <p className='text-red-500 text-sm mt-3 text-center'>{error}</p>
        )}

      </form>

    </div>
  )
}

export default Login