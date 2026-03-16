import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import MainLayout from '../components/layout/MainLayout'
import Search from '../components/Search'
import ProjectTable from '../components/ProjectTable'
import axios from "../api/axios";
import Loading from '../components/Loading'


function Projects() {

  const [projects, setProjects] = useState([])
  const [onSearch, setOnSearch] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    const fetchProject = async () => {
      try {

        setLoading(true)

        const res = await axios.get(`/api/project/get-project?search=${onSearch || ""}&status=${status || ""}`);
        
        setProjects(res.data.projects)
        
      } catch (error) {
        console.error(error.response?.data?.message || error)
      } finally {
        setLoading(false)
      }
    };

    fetchProject();

  }, [onSearch, status]);

  // console.log("on search:", onSearch)

  return (
    <MainLayout>

      <div className='flex justify-between mb-4'>

        <h1 className='text-2xl font-bold'>
          Project
        </h1>

        <Link className='bg-blue-600 text-white px-4 py-2 rounded'
          to="/projects/add"
        >
          Add Project
        </Link>

      </div>

      <Search setOnSearch={setOnSearch} />

      <select 
        className='border p-2 mb-4'
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >

        <option value="">All</option>
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Compleated</option>

      </select>

      {loading ? (
        <Loading />
      ) : (
      <div className='bg-white shadow rounded overflow-x-auto'>

        <ProjectTable projects={projects} />

      </div>
      )}

    </MainLayout>
  )
}

export default Projects