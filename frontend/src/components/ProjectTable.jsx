import React from 'react'
import { handleStatusStyle } from '../utils/statusStyle'

const ProjectTable = ({ projects }) => {

  return (
    <table className='w-full'>

      <thead className='bg-gray-200'>
        <tr>
          <th className='p-2 text-left' >Project</th>
          <th className='p-2 text-left' >Client</th>
          <th className='p-2 text-left' >Assigned To</th>
          <th className='p-2 text-left' >Deadline</th>
          <th className='p-2 text-center' >Status</th>
        </tr>
      </thead>

      <tbody>
        {projects.length === 0 && (
          <tr>
            <td colSpan="6" className="text-center p-4 text-gray-500">
              No project found
            </td>
          </tr>
        )}
        
        {projects.map((project) => {
          return (
            <tr key={project._id} className='border-t'>
              <td className='p-2'>{project.name}</td>
              <td className='p-2'>{project?.client?.name}</td>
              <td className='p-2'>{project?.assignedTo?.name}</td>
              <td className='p-2'>{new Date(project.deadline).toLocaleDateString()}</td>
              <td className={`px-3 py-1 text-xs font-medium rounded-full text-center ${handleStatusStyle(project.status)}`}>{project.status}</td>
            </tr>
          )
        })}
      </tbody>

    </table>
  )
}

export default ProjectTable