import React, { useState } from 'react'
import Sidebar from '../Sidebar'
import Navbar from '../Navbar'

const MainLayout = ({ children }) => {

  const [open, setOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">

      <Sidebar open={open} setOpen={setOpen} />

      <div className="flex flex-col flex-1">

        <Navbar setOpen={setOpen} />

        <main className="p-6 overflow-y-auto">
          {children}
        </main>

      </div>

    </div>
  )
}

export default MainLayout