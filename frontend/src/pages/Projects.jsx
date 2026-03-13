import React from 'react'
import MainLayout from '../components/layout/MainLayout'

function Projects() {
  return (
    <MainLayout>

      <div className='flex justify-between mb-4'>

        <h1 className='text-2xl font-bold'>
          Project
        </h1>

        <button className='bg-blue-600 text-white px-4 py-2 rounded'>
          Add Project
        </button>

      </div>

      <select name="" id="" className='border p-2 mb-4'>

        <option value="">All</option>
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Compleated</option>

      </select>

      <div className='bg-white shadow rounded overflow-x-auto'>

        <table className='w-full'>

          <thead className='bg-gray-200'>
            <tr>
              <th className='p-2 text-left' >Project</th>
              <th className='p-2 text-left' >Client</th>
              <th className='p-2 text-left' >Assigned To</th>
              <th className='p-2 text-left' >Deadline</th>
              <th className='p-2 text-left' >Status</th>
            </tr>
          </thead>

          <tbody>
            <tr className='border-t'>
              <td className='p-2'>E-Commerce web site</td>
              <td className='p-2'>XYZ Ltd</td>
              <td className='p-2'>Aswanth</td>
              <td className='p-2'>2026-03-15</td>
              <td className='p-2'>Pending</td>
            </tr>
          </tbody>

        </table>

      </div>

    </MainLayout>
  )
}

export default Projects