import React from 'react'

const Navbar = ({ setOpen }) => {
  return (
    <div className="bg-white shadow flex justify-between items-center p-4">

      <button
        onClick={() => setOpen(true)}
        className="md:hidden text-xl"
      >
        ☰
      </button>

      <input
        placeholder="Search..."
        className="border px-3 py-1 rounded"
      />

      <div className="font-medium">
        Admin
      </div>

    </div>
  )
}

export default Navbar