import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "../api/axios"
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';


function Register() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { setUser } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    
    e.preventDefault();

    try {

      setLoading(true);

      const res = await axios.post("/api/auth/register", {
        name,
        email,
        password,
        role
      });

      // console.log("reg res:", res)

      if (res.status === 201) {

        // for navigate after reg
        setUser(res.data?.user);

        if (res.data?.user?.role === "admin") {
          navigate("/dashboard")
        } else {
          navigate("/developer/projects")
        }

        toast.success(res.data?.message || "Register successful");

        return;
      };
      
    } catch (error) {
      setError(error?.response?.data?.message || "Register failed");
      console.error(error);
    } finally {
      setLoading(false);
    };

  }

  return (
    <div className='flex items-center justify-center h-screen bg-gray-100'>

      <form onSubmit={handleSubmit} className='bg-white p-8 rounded shadow w-80'>

        <h2 className='text-2xl mb-6 text-center font-bold'>
          Register
        </h2>

        <input type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder='Name'
          className='border p-2 w-full mb-4'
          required
        />

        <input 
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Email'
          className='border p-2 w-full mb-4'
          required
        />

        <input type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Password'
          className='border p-2 w-full mb-4'
          required
        />

        <select 
          value={role} 
          onChange={(e) => setRole(e.target.value)}
          className='border p-2 w-full mb-4 rounded'
          required
        >

          <option value="" disabled>-- Select Role --</option>
          <option value="admin">Admin</option>
          <option value="developer">Developer</option>

        </select>

        <button 
          type='submit'
          disabled={loading}
          className='bg-blue-600 text-white w-full py-2 rounded disabled:opacity-70 flex items-center justify-center gap-2'
        >
          <span className={`${loading ? "w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" : ""}`}/>

          { loading ? "Registering..." : "Register" }
        </button>

        <p className='text-center mt-4'>
          Already have account? 
          <Link to="/" className='text-blue-500'> Login</Link>
        </p>

        {error && (
          <p className='text-red-500 text-sm mt-3 text-center'>{error}</p>
        )}

      </form>

    </div>
  )
}

export default Register