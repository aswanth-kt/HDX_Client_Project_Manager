import React from 'react'

const StatusCard = ({ title, value }) => {
  return (
    <div className="bg-white shadow rounded p-6">

      <h2 className="text-gray-500">
        {title}
      </h2>

      <p className="text-3xl font-bold mt-2">
        {value}
      </p>

    </div>
  )
}

export default StatusCard