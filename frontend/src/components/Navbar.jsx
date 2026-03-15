import React from 'react'
import { useAuth } from '../context/AuthContext'
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"


const logoutSwal = withReactContent(Swal);

const Navbar = ({ setOpen }) => {

  const { user, logout } = useAuth();
  // console.log("context user:", user)

  const handleLogout = async () => {
    try {

      const confirmLogout = await logoutSwal.fire({
        title: "Are you sure?",
        text: "Are you sure? You'll need to login again to access your account",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, Logout",
        cancelButtonText: "Cancel"
      });

      if (!confirmLogout.isConfirmed) return;

      await logout();

    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="bg-white shadow flex justify-between items-center p-4">

      {user.role === "admin" && (
        <button
          onClick={() => setOpen(true)}
          className="md:hidden text-xl"
        >
          ☰
        </button>
      )}

      <div className="font-medium px-4 py-1">
        { user ? `Hi ${user.name}!` : "Hi, User!" }
      </div>

      {user.role === "developer" && (
        <button 
          className='text-white mr-6 px-4 py-1 bg-red-500 rounded hover:bg-red-700'
          onClick={handleLogout}
        >
          Logout
        </button>
      )}

    </div>
  )
}

export default Navbar