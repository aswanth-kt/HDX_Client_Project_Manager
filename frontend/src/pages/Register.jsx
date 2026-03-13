import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function Register() {

  const [role, setRole] = useState("");

  const handleChange = (e) => {
    setRole(e.target.value)
  }

  return (
    <div className='flex items-center justify-center h-screen bg-gray-100'>

      <div className='bg-white p-8 rounded shadow w-80'>

        <h2 className='text-2xl mb-6 text-center font-bold'>
          Register
        </h2>

        <input type="text" name="" id="" 
        placeholder='Name'
        className='border p-2 w-full mb-4'
        />

        <input type="email" name="" id="" 
        placeholder='Email'
        className='border p-2 w-full mb-4'
        />

        <input type="password" name="" id="" 
        placeholder='Password'
        className='border p-2 w-full mb-4'
        />

        <select value={role} onChange={handleChange}
        className='border p-2 w-full mb-4 rounded'>

        <option value="" disabled>-- Select Role --</option>
        <option value="admin">Admin</option>
        <option value="developer">Developer</option>

      </select>

        <button className='bg-blue-600 text-white w-full py-2 rounded'>
          Register
        </button>

        <p className='text-center mt-4'>
          Already have account? 
          <Link to="/" className='text-blue-500'> Login</Link>
        </p>

      </div>

    </div>
  )
}

export default Register