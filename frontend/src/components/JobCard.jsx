import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const JobCard = ({ job }) => {

    const navigate = useNavigate()

  return (
    <div className='border p-6 shadow rounded'>
      <div className='flex justify-between items-center'>
        <img className='h-8' src={assets.company_icon} alt="" />
      </div>
      <h4 className='font-medium text-xl mt-2'>{job.title}</h4>
      <div className='flex items-center gap-3 mt-2 text-xs'>
        <span className='bg-blue-50 border border-blue-200 px-4 py-1.5 rounded hover:transform hover:scale-105 duration-200'>{job.location}</span>
        <span className='bg-red-50 border border-red-200 px-4 py-1.5 rounded  hover:transform hover:scale-105 duration-200'>{job.level}</span>
      </div>
      <p className='text-gray-500 text-sm mt-4' dangerouslySetInnerHTML={{__html:job.description.slice(0,150)}}></p>
      <div className='mt-4 flex gap-4 text-sm '>
        <button onClick={() => {navigate(`/apply-job/${job._id}`); scrollTo(0,0)}} className='bg-gradient-to-r from-purple-800 to-purple-950 text-white text-sm py-2 px-4 rounded cursor-pointer hover:scale-105 duration-300'>Apply Now</button>

        <button onClick={() => {navigate(`/apply-job/${job._id}`); scrollTo(0,0)}} className='border border-purple-900 text-sm py-2 px-4 hover:scale-105 duration-150 cursor-pointer rounded '>Learn More</button>
      </div>
    </div>
  )
}

export default JobCard
