import React from 'react'

const ProjectTable = ({ projects }) => {
  return (
    <table className='w-full'>

      <thead className='bg-gray-200'>
        <tr>
          <th className='p-2 text-left' >Project</th>
          <th className='p-2 text-left' >Client</th>
          <th className='p-2 text-left' >Assigned To</th>
          <th className='p-2 text-left' >Deadline</th>
          <th className='p-2 text-left' >Status</th>
        </tr>
      </thead>

      <tbody>
        {projects.map((project) => {
          return (
            <tr key={project._id} className='border-t'>
              <td className='p-2'>{project.name}</td>
              <td className='p-2'>{project.client.name}</td>
              <td className='p-2'>{project.assignedTo.name}</td>
              <td className='p-2'>{new Date(project.deadline).toLocaleDateString()}</td>
              <td className='p-2'>{project.status}</td>
            </tr>
          )
        })}
      </tbody>

    </table>
  )
}

export default ProjectTable