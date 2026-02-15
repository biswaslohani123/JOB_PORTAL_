import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import Loading from '../components/Loading'
import NavBar from '../components/NavBar'
import { assets } from '../assets/assets'
import kconvert from 'k-convert';
import moment from 'moment'

const ApplyJob = () => {

  const { id } = useParams()

  const [jobData, setJobData] = useState(null)

  const {jobs} = useContext(AppContext)

  const fetchJob = async () => {
      const data = jobs.filter(job => job._id === id )

      if (data.length !== 0) {

        setJobData(data[0])
        console.log(data[0]);
        
      }
  }

  useEffect( () => {
    if (jobs.length > 0) {
      fetchJob()

    }
  },[id, jobs])

  return jobData ?  (
    <>
      <NavBar/>
      <div className='min-h-screen flex flex-col py-10 container px-4 2xl:px-20 mx-auto'>
        <div className='bg-white text-black rounded w-full'>
          <div className='flex justify-center md:justify-between flex-wrap gap-8 px-14 py-20 mb-6 bg-purple-100 border-purple-400 rounded-xl'>
            <div className='flex flex-col md:flex-row items-center'>
              <img className='h-24 bg-white rounded=lg p-4 mr-4 max-md:mb-4 border ' src={jobData.companyId.image} alt="" />
              <div className='text-center md:text-left text-neutral-700'>
                <h1 className='text-2xl sm:text-4xl font-medium'>{jobData.title}</h1>
                <div className='flex flex-row flex-wrap max-md:justify-center gap-y-2 gap-6 items-center text-gray-600 mt-2'>
                  <span className='flex items-center gap-1'>
                    <img src={assets.suitcase_icon} alt="" />
                    {jobData.companyId.name}
                  </span>
                  <span className='flex items-center gap-1'>
                    <img src={assets.location_icon} alt="" />
                    {jobData.location}
                  </span>
                  <span className='flex items-center gap-1'>
                    <img src={assets.person_icon} alt="" />
                    {jobData.level}
                  </span>
                  <span className='flex items-center gap-1'>
                    <img src={assets.money_icon} alt="" />
                    CTC: {kconvert.convertTo(jobData.salary)}
                  </span>
                </div>
              </div>
            </div>

            <div className='flex flex-col justify-center text-end text-sm max-md:mx-auto max-m:text-center '>
              <button className='border border-gray-500 py-3 px-5 rounded bg-gradient-to-r from-purple-600 to-purple-800 text-white cursor-pointer'>Apply Now</button>
              <p className='mt-1 text-gray-600'>Posted {moment(jobData.date).fromNow()}</p>
            </div>

          </div>
        </div>
      </div>
    </>
  ): 
  ( <div>
    <Loading/>
  </div>
  )
}

export default ApplyJob
