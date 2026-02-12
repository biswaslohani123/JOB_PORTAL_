import React from 'react'
import NavBar from '../components/NavBar'
import Hero from '../components/Hero'
import JobListing from '../components/JobListing'
import Banner from '../components/Banner'

const Home = () => {
  return (
    <div>
      <NavBar/>
      <Hero/>
      <JobListing/>
      <Banner/>
    </div>
  )
}

export default Home
