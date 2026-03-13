import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "../api/axios";
import { useAuth } from '../context/AuthContext';


const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setUser, loading } = useAuth();
  // console.log("context loading:", loading)

  const navigate = useNavigate();

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await axios.post("/api/auth/login",
        { email, password }
      );

      // console.log("Login response:", res.data);

      setUser(res.data.loggedinUser)    // store logged user in context

      navigate("/dashboard");
      
    } catch (error) {
      console.log(error.response?.data?.message || error);
    }
  };

  if (loading) return <div>Loading...</div>

  return (
    <div className='flex items-center justify-center h-screen bg-gray-100'>

      <form onSubmit={handleSubmit} className='bg-white p-8 rounded shadow w-80'>

        <h2 className='text-2xl mb-6 text-center font-bold'>
          Login
        </h2>

        <input type="email"
        placeholder='Email'
        className='border p-2 w-full mb-4'
        onChange={(e) => setEmail(e.target.value)}
        />

        <input type="password"
        placeholder='Password'
        className='border p-2 w-full mb-4'
        onChange={(e) => setPassword(e.target.value)}
        />

        <button type='submit' className='bg-blue-600 text-white w-full py-2 rounded'>
          {!loading ? "Login" : "Logging..."}
        </button>

        <p className='text-center mt-4'>
          No account?
          <Link to="/register" className='text-blue-500'> Register</Link>
        </p>

      </form>

    </div>
  )
}

export default Login