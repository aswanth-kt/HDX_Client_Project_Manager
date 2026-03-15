import MainLayout from '../components/layout/MainLayout'
import StatusCard from '../components/StatusCard'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from "../api/axios"

const Dashboard = () => {

  const [counts, setCounts] = useState({
    totalClientsCount: 0,
    totalActiveProjectCount: 0,
    totalCompletedProjectCount: 0
  });

  useEffect(() => {
    try {

      const fetchDashboard = async () => {

        const res = await axios.get("/api/project/dashboard");

        console.log("dahboard res:", res.data);

        setCounts(res.data.counts);

      };

      fetchDashboard();
      
    } catch (error) {
      console.error(error);
    }
  }, []);

  // console.log("dashboard:", counts)

  return (
    <MainLayout>

      <h1 className="text-2xl font-bold mb-6">
        Dashboard
      </h1>

      <div className="grid md:grid-cols-3 gap-6 mb-8" >

        <StatusCard title="Total Clients" value={counts.totalClientsCount} />
        <StatusCard title="Active Projects" value={counts.totalActiveProjectCount} />
        <StatusCard title="Completed Projects" value={counts.totalCompletedProjectCount} />

      </div>

    </MainLayout>
  )
}

export default Dashboard