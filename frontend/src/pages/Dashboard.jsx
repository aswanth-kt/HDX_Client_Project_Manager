import React from 'react'
import MainLayout from '../components/layout/MainLayout'
import StatusCard from '../components/StatusCard'

const Dashboard = () => {
  return (
    <MainLayout>

      <h1 className="text-2xl font-bold mb-6">
        Dashboard
      </h1>

      <div className="grid md:grid-cols-3 gap-6 mb-8" >

        <StatusCard title="Total Clients" value="24" />
        <StatusCard title="Active Projects" value="8" />
        <StatusCard title="Completed Projects" value="12" />

      </div>

    </MainLayout>
  )
}

export default Dashboard