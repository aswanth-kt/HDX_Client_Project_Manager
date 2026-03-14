import React from 'react'
import { useAuth } from '../context/AuthContext'

const Navbar = ({ setOpen }) => {

  const { user } = useAuth();
  // console.log("context user:", user)

  return (
    <div className="bg-white shadow flex justify-between items-center p-4">

      <button
        onClick={() => setOpen(true)}
        className="md:hidden text-xl"
      >
        ☰
      </button>

      {/* <h2
        className="border px-3 py-1 rounded"
      >
        Client Manager App
      </h2> */}

      <div className="font-medium">
        { user ? `Hi ${user.name}!` : "Hi, User!" }
      </div>

    </div>
  )
}

export default Navbar