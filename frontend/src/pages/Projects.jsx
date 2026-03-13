import { useEffect, useState } from 'react'
import MainLayout from '../components/layout/MainLayout'
import Search from '../components/Search'
import ProjectTable from '../components/ProjectTable'
import axios from "../api/axios";


function Projects() {

  const [projects, setProjects] = useState([])
  const [onSearch, setOnSearch] = useState();

  useEffect(() => {

    const fetchProject = async () => {
      try {

        const res = await axios.get(`/api/project/get-project?name=${onSearch || ""}`);
        
        setProjects(res.data.projects)
        
      } catch (error) {
        console.error(error.response?.data?.message || error)
      }
    };

    fetchProject();

  }, [onSearch]);

  console.log("p", onSearch)

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

      <Search setOnSearch={setOnSearch} />

      <select name="" id="" className='border p-2 mb-4'>

        <option value="">All</option>
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Compleated</option>

      </select>

      <div className='bg-white shadow rounded overflow-x-auto'>

        <ProjectTable projects={projects} />

      </div>

    </MainLayout>
  )
}

export default Projects