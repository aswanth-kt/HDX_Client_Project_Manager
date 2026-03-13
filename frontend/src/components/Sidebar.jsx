import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = ({ open, setOpen }) => {
  return (
    <div className={`bg-gray-900 text-white w-64 p-5 fixed md:static h-full z-20 
    ${open ? "left-0" : "-left-64"} md:left-0 transition-all`}>

      <h2 className="text-2xl font-bold mb-8">ClientManager</h2>

      <nav className="space-y-4">

        <Link to="/dashboard" className="block hover:text-gray-300">
          Dashboard
        </Link>

        <Link to="/clients" className="block hover:text-gray-300">
          Clients
        </Link>

        <Link to="/projects" className="block hover:text-gray-300">
          Projects
        </Link>

        <button className="text-red-400 mt-10">
          Logout
        </button>

      </nav>
    </div>
  )
}

export default Sidebar