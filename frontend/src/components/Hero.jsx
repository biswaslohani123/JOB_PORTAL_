import React, { useContext, useRef } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { motion } from "framer-motion";

const Hero = () => {


  const {setSearchFilter, setIsSearched} = useContext(AppContext);

  const titleRef = useRef(null)
  const locationRef = useRef(null)

  const onSearchHandler = () => {
      
    setSearchFilter({
      title: titleRef.current.value,
      location: locationRef.current.value
    })
    setIsSearched(true)
    console.log({
      title: titleRef.current.value,
      location: locationRef.current.value
    });
    
  }
  
  return (

    <div className='container 2xl:px-20 mx-auto my-10'>
      <div className='bg-gradient-to-r from-purple-800 to-purple-950 text-white py-16 text-center mx-2 rounded-xl'>
        <h2 className='text-2xl md:text-3xl lg:text-4xl font-medium mb-4'>Over 10,000+ jobs to apply</h2>
        <p className='mb-8 max-w-xl mx-auto text-sm font-light px-5'>Your Next Big Career Move Starts Right Here - Explore the Best Job Opportunities and Take the First Step Toward Your Future!</p>
        <div className='flex items-center justify-between bg-white rounded text-gray-600 max-w-xl pl-4 mx-4 sm:mx-auto'>
            <div className='flex items-center'>
                <img className='h-4 sm:h-5' src={assets.search_icon} alt="" />
                <input ref={titleRef} className='max-sm:text-xs p-2 rounded outline-none w-full' type="text" placeholder='Search For Jobs' />
            </div>

            <div className='flex items-center'>
                <img  className='h-4 sm:h-5' src={assets.location_icon} alt="" />
                <input ref={locationRef} className='max-sm:text-xs p-2 rounded outline-none w-full' type="text" placeholder='Location' />
            </div>
            <button onClick={onSearchHandler} className='bg-blue-600 px-6 py-2 text-white rounded m-1 hover:bg-blue-500 cursor-pointer'>Search</button>
        </div>
      </div>

      {/* Company logo section */}
       <div className='border border-gray-300 shadow-md mx-2 mt-5 p-6 rounded-md overflow-hidden'>
      <motion.div
        className='flex items-center gap-10 lg:gap-16'
        animate={{ x: ["0%", "-100%"] }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <p className='font-medium'>Trusted by</p>
        <img className='h-6' src={assets.microsoft_logo} alt="" />
        <img className='h-6' src={assets.walmart_logo} alt="" />
        <img className='h-6' src={assets.accenture_logo} alt="" />
        <img className='h-6' src={assets.samsung_logo} alt="" />
        <img className='h-6' src={assets.amazon_logo} alt="" />
        <img className='h-6' src={assets.adobe_logo} alt="" />

        {/* Duplicate logos for seamless loop */}
        <img className='h-6' src={assets.microsoft_logo} alt="" />
        <img className='h-6' src={assets.walmart_logo} alt="" />
        <img className='h-6' src={assets.accenture_logo} alt="" />
        <img className='h-6' src={assets.samsung_logo} alt="" />
        <img className='h-6' src={assets.amazon_logo} alt="" />
        <img className='h-6' src={assets.adobe_logo} alt="" />
      </motion.div>
    </div>

    </div>
  )
}

export default Hero
