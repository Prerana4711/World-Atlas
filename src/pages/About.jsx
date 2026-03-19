import React from 'react'
import countryData from '../api/countryData.json'
const About = () => {
 
  return (
  <section className='section-about container'>
     <h2 className='container-title'>
Here are the Interesting Fact
<br/>
we're proud of
     </h2>
     <div className='gradient-cards'>
      {countryData.map((country)=>{
 const {id,countryName,capital,population,interestingFact} = country;
        return(<div className='card' id={id}>
        <div className='container-card bg-blue-box'>
          <p className='card-title'>{countryName}</p>
           <p><span className='card-description'>Capital:</span>{capital}</p>
          <p><span className='card-description'>Population:</span>{population}</p>
           <p><span className='card-description'>Interesting Facts:</span>{interestingFact}</p>
        </div>
      </div>)
      })}
     </div>
  </section>
  )
}

export default About
