import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <div className='flex items-center justify-center h-screen bg-gray-100'>

      <div className='bg-white p-8 rounded shadow w-80'>

        <h2 className='text-2xl mb-6 text-center font-bold'>
          Login
        </h2>

        <input type="email" name="" id=""
        placeholder='Email'
        className='border p-2 w-full mb-4'
        />

        <input type="password" name="" id=""
        placeholder='Password'
        className='border p-2 w-full mb-4'
        />

        <button className='bg-blue-600 text-white w-full py-2 rounded'>
          Login
        </button>

        <p className='text-center mt-4'>
          No account?
          <Link to="/register" className='text-blue-500'> Register</Link>
        </p>

      </div>

    </div>
  )
}

export default Login