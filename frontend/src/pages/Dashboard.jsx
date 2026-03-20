import MainLayout from '../components/layout/MainLayout'
import StatusCard from '../components/StatusCard'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from "../api/axios"
import ProjectChart from '../components/ProjectChart'

const Dashboard = () => {

  const [counts, setCounts] = useState({
    totalClientsCount: 0,
    totalActiveProjectCount: 0,
    totalCompletedProjectCount: 0,
    totalPendingProjectCount: 0
  });

  useEffect(() => {
    try {

      const fetchDashboard = async () => {

        const res = await axios.get("/api/project/dashboard");

        // console.log("dahboard res:", res.data);

        setCounts(res.data.counts);

      };

      fetchDashboard();
      
    } catch (error) {
      console.error(error);
    }
  }, []);

  const chartData = [
    { name: "Pending", value: counts.totalPendingProjectCount },
    { name: "In Progress", value: counts.totalActiveProjectCount },
    { name: "Completed", value: counts.totalCompletedProjectCount }
  ];

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

      <ProjectChart data={chartData} />

    </MainLayout>
  )
}

export default Dashboard