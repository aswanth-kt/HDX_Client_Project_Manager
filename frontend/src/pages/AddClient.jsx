import React from 'react'
import MainLayout from '../components/layout/MainLayout'

const AddClient = () => {
  return (
    <MainLayout>

      <div className='max-w-xl mx-auto bg-white shadow rounded p-6'>

        <h2 className='text-2xl font-bold mb-6'>
          Add Client
        </h2>

        <form className='space-y-4'>

          {/* client name */}
          <div>
            <label className='block mb-1 font-medium'>
              Client Name
            </label>

            <input 
              type="text" 
              className='w-full border rounded p-2'
              required  
            />
          </div>

          {/* company */}
          <div>
            <label className='block mb-1 font-medium'>
              Company
            </label>

            <input 
              type="text" 
              className='w-full border rounded p-2'
              required  
            />
          </div>

          {/* email */}
          <div>
            <label className='block mb-1 font-medium'>
              Email
            </label>

            <input 
              type="email" 
              className='w-full border rounded p-2'
              required  
            />
          </div>

          {/* Phone */}
          <div>
            <label className='block mb-1 font-medium'>
              Mobile Nuber
            </label>

            <input 
              type="tel" 
              className='w-full border rounded p-2'
              required  
            />
          </div>

          {/* project type */}
          <div>
            <label className='block mb-1 font-medium'>
              Project Type
            </label>

            <select
            className='w-full border rounded p-2'
            >
              <option value="">Select Project Type</option>
              <option value="Website">Website</option>
              <option value="E-commerce">E-commerce</option>
              <option value="Web App">Web App</option>
              <option value="Mobile App">Mobile App</option>
              <option value="Desktop Application">Desktop Application</option>
              <option value="SaaS Platform">SaaS Platform</option>
              <option value="AI Chatbot">AI Chatbot</option>
              <option value="Job Portal">Job Portal</option>
              <option value="Messaging App">Messaging App</option>
              <option value="Restaurant Management System App">Restaurant Management System App</option>
            </select>
          </div>

          <button
            type='submit'
            className='bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700'
          >
            Create Client
          </button>

        </form>

      </div>


    </MainLayout>
  )
}

export default AddClient