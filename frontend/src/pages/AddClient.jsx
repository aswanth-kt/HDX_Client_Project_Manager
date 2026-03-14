import React, { useState } from 'react'
import MainLayout from '../components/layout/MainLayout'
import axios from "../api/axios";import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
;

const AddClient = () => {

  const [client, setClient] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    projectType: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setClient({
      ...client,
      [e.target.name]: e.target.value
    })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const res = await axios.post("/api/client/add-client", {
        name: client.name,
        company: client.company,
        email: client.email,
        phone: client.phone,
        projectType: client.projectType
      });

      console.log("Add clint res:", res.data);
      
      if (res.status === 201) {
        navigate("/clients")
        return toast.success(res.data?.message || "New client created")
      }

      toast.warn(res.data?.message || "Something went wrong")
      
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <MainLayout>

      <div className='max-w-xl mx-auto bg-white shadow rounded p-6'>

        <h2 className='text-2xl font-bold mb-6'>
          Add Client
        </h2>

        <form onSubmit={handleSubmit} className='space-y-4'>

          {/* client name */}
          <div>
            <label className='block mb-1 font-medium'>
              Client Name
            </label>

            <input 
              type="text" 
              className='w-full border rounded p-2'
              name='name'
              value={client.name}
              onChange={handleChange}
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
              name='company'
              value={client.company}
              onChange={handleChange}
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
              name='email'
              value={client.email}
              onChange={handleChange}
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
              name='phone'
              value={client.phone}
              onChange={handleChange}
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
            name='projectType'
            value={client.projectType}
            onChange={handleChange}
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