import React from 'react'
import { TiArrowRightThick } from "react-icons/ti";
import { NavLink } from 'react-router-dom';
const HeroSection = () => {
  return (
     <main className='hero-section main'>
          <div className='container grid grid-two-cols'>
            <div className='hero-content'>
              <h1 className='heading-xl'>Explore the World</h1>
              <p className='paragraph'>
                Discovered the history,culture and beauty of the nation. Sort, search and filter through countries to find the details you need.
              </p>
              <NavLink to={"/country"}>  <button className='btn btn-darken btn-inline bg-white-box'>
                Start Exploring <TiArrowRightThick />
              </button></NavLink>
            
            </div>
            <div className='hero-image'>
              <img src="/world.jpg" alt='sorry' className='banner-image'/>
            </div>
          </div>
    
        </main>
  )
}

export default HeroSection
