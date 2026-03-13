import React from 'react'
import MainLayout from '../components/layout/MainLayout'

const Clients = () => {
  return (
    <MainLayout>

      <div className="flex justify-between mb-4">

        <h1 className="text-2xl font-bold">
          Clients
        </h1>

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Add Client
        </button>

      </div>

      <input type="text" name="" id="" 
      placeholder='Search Clients...'
      className='border p-2 mb-4 w-full md:w-64'
      />

      <div className='bg-white shadow rounded overflow-x-auto'>

        <table className='w-full'>

          <thead className='bg-gray-200'>
            <tr>
              <th className='p-2 text-left'>Name</th>
              <th className='p-2 text-left'>Company</th>
              <th className='p-2 text-left'>Email</th>
              <th className='p-2 text-left'>Phone</th>
              <th className='p-2 text-left'>Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr className='border-t'>
              <td className='p-2'>Aswanth</td>
              <td className='p-2'>XYZ Ltd</td>
              <td className='p-2'>aswanth@gmail.com</td>
              <td className='p-2'>1234555555</td>

              <td className='p-2'>
                <button className='text-blue-500 mr-3'>Edit</button>
                <button className='text-red-500 mr-3'>Delete</button>
              </td>
            </tr>
          </tbody>

        </table>

      </div>

    </MainLayout>
  )
}

export default Clients