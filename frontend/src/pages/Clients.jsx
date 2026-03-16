import { useEffect, useState } from 'react'
import MainLayout from '../components/layout/MainLayout'
import Search from '../components/Search'
import axios from "../api/axios";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
import Loading from '../components/Loading';


const mySwal = withReactContent(Swal);

const Clients = () => {

  const [clients, setClients] = useState([]);
  const [onSearch, setOnSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {

    const timer = setTimeout(() => {

      const fetchClients = async () => {
        try {
  
          setLoading(true);
          
          const res = await axios.get(
            `/api/client/get-clients?search=${onSearch || ""}`
          );
  
          // console.log("clients res:", res.data);
  
          setClients(res.data.clients);
  
        } catch (error) {
          console.error(error.response?.data?.message || error);
        } finally {
          setLoading(false);
        }
      }

      fetchClients();

    }, 500);

    return () => clearTimeout(timer);
    
  }, [onSearch]);

  const handleDelete = async (id) => {
    try {

      const confirmDelete = await mySwal.fire({
        title: "Are you sure?",
        text: "This action cannot be undone!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete",
        cancelButtonText: "Cancel"
      });

      if (!confirmDelete.isConfirmed) {
        return toast.warn("Client still exists");
      }

      const res = await axios.delete(`/api/client/delete-client/${id}`);

      if (res.status === 200) {

        // remove deleted client from UI
        setClients(prev =>
          prev.filter(client => client._id !== id)
        );

        toast.success(res.data?.message || "Deleted");
        return;
      }

      toast.warn(res.data?.message);
      
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Delete failed")
    }
  }

  return (
    <MainLayout>

      <div className="flex justify-between mb-4">

        <h1 className="text-2xl font-bold">
          Clients
        </h1>

        <Link to="/clients/add" className="bg-blue-600 text-white px-4 py-2 rounded">
          Add Client
        </Link>

      </div>

      <Search setOnSearch={setOnSearch} />

      {loading ? (
        <Loading />
      ) : (
        <div className='bg-white shadow rounded overflow-x-auto'>

          <table className='w-full'>

            <thead className='bg-gray-200'>
              <tr>
                <th className='p-2 text-left'>Name</th>
                <th className='p-2 text-left'>Company</th>
                <th className='p-2 text-left'>Project Type</th>
                <th className='p-2 text-left'>Email</th>
                <th className='p-2 text-left'>Phone</th>
                <th className='p-2 text-left'>Actions</th>
              </tr>
            </thead>

            <tbody>
              {/* Empty data */}
              {clients.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center p-4 text-gray-500">
                    No clients found
                  </td>
                </tr>
              )}

              {clients.map((client) => {
                return (
                  <tr key={client._id} className='border-t'>
                    <td className='p-2'>{client.name}</td>
                    <td className='p-2'>{client.company}</td>
                    <td className='p-2'>{client.projectType}</td>
                    <td className='p-2'>{client.email}</td>
                    <td className='p-2'>{client.phone}</td>

                    <td className='p-2'>
                      <button 
                        className='text-blue-500 mr-3'
                        onClick={() => navigate(`/clients/edit/${client._id}`)}  
                      >
                        Edit
                      </button>

                      <button
                        className='text-red-500 mr-3'
                        onClick={() => handleDelete(client._id)}
                      >
                        Delete
                      </button>

                    </td>
                  </tr>
                )
              })}
            </tbody>

          </table>

        </div>
      )}

    </MainLayout>
  )
}

export default Clients