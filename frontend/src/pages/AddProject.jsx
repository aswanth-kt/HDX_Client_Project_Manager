import React, { useEffect, useState } from 'react'
import MainLayout from '../components/layout/MainLayout';
import axios from "../api/axios";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const AddProject = () => {

  const [loading, setLoading] = useState(false);
  const [developers, setDevelopers] = useState([]);
  const [clients, setClients] = useState([]);
  const [addProject, setAddProject] = useState({
    name: "",
    client: "",
    assignedTo: "",
    deadline: "",
    description: ""
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDropdownData = async () => {
      try {

        const [devRes, clientRes] = await Promise.all([
          axios.get("/api/developer/get-developers"),
          axios.get("/api/client/get-clients")
        ]) 

        setDevelopers(devRes.data.developers);
        setClients(clientRes.data.clients);
        
      } catch (error) {
        console.log(error);
      }
    };

    fetchDropdownData();

  }, []);

  // add values in addProject state
  const handleChange = (e) => {
    console.log("e", e.target.name, e.target.value)
    setAddProject({
      ...addProject,
      [e.target.name]: e.target.value
    })
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (loading) return;

    setLoading(true);

    try {

      const res = await axios.post("/api/project/create-project", {
        name: addProject.name,
        client: addProject.client,
        assignedTo: addProject.assignedTo,
        deadline: addProject.deadline,
        description: addProject.description
      });

      console.log("Add project res:", res.data);

      if (res.status === 201) {
        navigate("/projects")
        return toast.success(res.data?.message || "New project created")
      };

      toast.warn(res.data?.message || "Something went wrong")
      
    } catch (error) {
      console.log(error);
    };

    setLoading(false);
  };

  console.log("add project", addProject)

  return (
    <MainLayout>

    <div className='max-e-2xl mx-auto bg-white shadow rounded p-6'>

      <h2 className='text-2xl font-bold mb-6'>
        Add project
      </h2>

      <form onSubmit={handleSubmit} className='space-y-4'>

        {/* poroject name */}
        <div>
          <label className='block mb-1 font-medium'>
            Project Name
          </label>

          <input type="text"
            className='w-full border p-2 ronded'
            name='name'
            value={addProject.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* client name */}
        <div>
          <label className='block mb-1 font-medium'>
            Client
          </label>

          <select
            value={addProject.client}
            name='client'
            className='w-full border p-2 rounded'
            onChange={handleChange}
            required
          >
            <option value="" disabled>Select Client</option>
            {clients.map((client) => 
              <option key={client._id} value={client._id}>{client.name}</option>
            )}
          </select>
        </div>

        {/* assinged to */}
        <div>
          <label className='block mb-1 font-medium'>
            Assign Developer
          </label>

          <select
            name='assignedTo'
            value={addProject.assignedTo}
            className='w-full border p-2 rounded'
            onChange={handleChange}
            required
          >
            <option value="" disabled>Select Developer</option>
            {developers.map((dev) => 
              <option key={dev._id} value={dev._id}>{dev.name}</option>
            )}
          </select>
        </div>

        {/* deadline */}
        <div>
          <label className='block mb-1 font-medium'>
            Deadline
          </label>

          <input type="date"
            className='w-full border p-2 ronded'
            name='deadline'
            value={addProject.deadline}
            onChange={handleChange}
            required
          />
        </div>

        {/* description */}
        <div>
          <label className='block mb-1 font-medium'>
            Project Description
          </label>

          <input type="text"
            className='w-full border p-2 ronded'
            name='description'
            value={addProject.description}
            onChange={handleChange}
          />
        </div>

        <button
          type='submit'
          disabled={loading}
          className='w-full bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700'
        >
          {loading ? "Creating" : "Create Project"}
        </button>

      </form>

    </div>

    </MainLayout>
  )
}

export default AddProject