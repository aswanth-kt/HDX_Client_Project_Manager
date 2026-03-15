import React, { useEffect, useState } from 'react'
import axios from "../api/axios"
import Navbar from '../components/Navbar';


const AssignedProjects = () => {

  const [projects, setProjects] = useState([]);;

  useEffect(() => {

    const fetchProjects = async () => {
      try {
          
        const res = await axios.get("/api/project/get-project");

        // console.log("project:", res.data.projects)
        setProjects(res.data.projects);

      } catch (error) {
        console.error(error)
      };
        
      };

    fetchProjects();

  }, [])

  return (
    
    <>

      <Navbar />

      <div className='bg-white shadow rounded p-6'>

        <h2 className='text-2xl font-bold mb-6'>
          Assigned Project
        </h2>

        <div className="overflow-x-auto">

          <table className='w-full'>

            <thead className='bg-gray-100'>
              <tr>
                <th className='p-2 text-left'>Project</th>
                <th className='p-2 text-left'>Client</th>
                <th className='p-2 text-left'>Deadline</th>
                <th className='p-2 text-left'>status</th>
                <th className='p-2 text-left'>Description</th>
              </tr>
            </thead>

            <tbody>

              {projects.map((project) => 

                <tr key={project._id} className='border-t'>

                  <td className='p=2'>{project.name}</td>
                  <td className='p=2'>{project.client?.name}</td>
                  <td className='p=2'>{new Date(project.deadline).toLocaleDateString()}</td>

                  <td className='p=2'>
                    <select 
                      className='border p-1 rounded'
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </td>

                  <td className='p-2'>{project.description}</td>

                </tr>

              )}
            </tbody>

          </table>

        </div>
        
      </div>

    </>
  )
}

export default AssignedProjects