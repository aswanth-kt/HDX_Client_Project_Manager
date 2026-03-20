import { useEffect, useState } from 'react'
import axios from "../api/axios"
import Navbar from '../components/Navbar';
import { toast } from 'react-toastify';
import { handleStatusStyle } from '../utils/statusStyle';
import Pagination from '../components/Pagination';


const AssignedProjects = () => {

  const [projects, setProjects] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  useEffect(() => {

    const fetchProjects = async () => {
      try {
          
        const { data } = await axios.get(`/api/developer/assigned-projects?page=${page}`);

        // console.log("projects:", data.assignedProjects);

        setProjects(data?.assignedProjects);
        setTotalPage(data?.totalPage)

      } catch (error) {
        console.error(error)
      }
        
      };

    fetchProjects();

  }, [page]);

  const handleStatus = async (e, id) => {
    try {
      const newStatus = e.target.value;

      // console.log(`status: ${newStatus}, id: ${id}`);

      const res = await axios.patch(`/api/developer/change-status/${id}`, {
        status: newStatus
      });

      // console.log("edit status res:", res.data);

      if (res.status === 200) {
        // update UI status
        setProjects((preProjects) => 
          preProjects.map((project) => 
            project._id  === id 
            ? {...project, status: newStatus}
            : project
          )
        );

        toast.success(res.data?.message || "Status changed");
        return;
      };

      toast.warn(res.data?.message || "Something went wrong")
      
    } catch (error) {
      console.error(error)
    }
  };

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber)
  };

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
              {/* If no assigne project */}
              {projects.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center p-4 text-gray-500">
                    No projects assigned
                  </td>
                </tr>
              )}

              {projects.map((project) => 

                <tr key={project._id} className='border-t'>

                  <td className='p-2'>{project.name}</td>
                  <td className='p-2'>{project.client?.name}</td>
                  <td className='p-2'>{new Date(project.deadline).toLocaleDateString()}</td>

                  <td className='p-2'>
                    <select 
                      className={`border p-1 rounded ${handleStatusStyle(project.status)}`}
                      value={project.status}
                      onChange={(e) => handleStatus(e, project._id)}
                    >
                      <option value="Pending" 
                        className={`${handleStatusStyle("Pending")}`}>
                          Pending
                      </option>
                      <option 
                        value="In Progress"
                        className={`${handleStatusStyle("In Progress")}`}
                        >
                          In Progress
                      </option>
                      <option 
                        value="Completed"
                        className={`${handleStatusStyle("Completed")}`}
                      >
                        Completed
                      </option>
                    </select>
                  </td>

                  <td className='p-2'>{project.description}</td>

                </tr>

              )}
            </tbody>

          </table>

        </div>
        
      </div>

      <Pagination currentPage={page} totalPages={totalPage} onPageChange={handlePageChange} />

    </>
  )
}

export default AssignedProjects