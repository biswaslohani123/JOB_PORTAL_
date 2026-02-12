import React from 'react'
import NavBar from '../components/NavBar'
import Hero from '../components/Hero'
import JobListing from '../components/JobListing'
import Banner from '../components/Banner'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div>
      <NavBar/>
      <Hero/>
      <JobListing/>
      <Banner/>
      <Footer/>
    </div>
  )
}

export default Home
