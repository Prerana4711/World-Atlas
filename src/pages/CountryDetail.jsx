
import { NavLink, useParams } from 'react-router-dom'
import React, { useEffect, useState, useTransition } from 'react'
import {getYourCountryDataDetail} from '../api/postApi'
import Loader from '../components/UI/Loader'
const CountryDetail = () => {
    const params = useParams()
     const[ispending,startTranstion] =useTransition()
 const[country,setCountry] = useState()
 useEffect(()=>{
  startTranstion(async()=>{
  const res= await getYourCountryDataDetail(params.id)
  if(res.status===200){
  setCountry(res.data[0]);}

  })

 },[]);
 if(ispending) return <Loader/>
  return (<section className='card country-details-card container'>
    <div className='container-card bg-white-box'>
        {
            country && (
                <div className="country-image grid gird-two-cols">
                    <img src={country.flags.svg} alt={country.flags.alt} className='flag'/>
                    <div className="country-content">
                        <p>{country.name.official}</p>
                        
                        <div className="infoContainer">
                            <p>
                                <span className="card-description">
                                    Native Names:
                                </span>
                                {Object.keys(country.name?.nativeName)
                                .map((key)=>
                                    country.name.nativeName[key].common
                                ).join(", ")}
                            </p>

                             <p>
                                <span className='card-description'>Region:

                                </span>
                                {country.region}
                            </p>
                                 <p>
                                <span className='card-description'>Subregion:

                                </span>
                                {country.subregion}
                            </p>
                                 <p>
                                <span className='card-description'>Capital:

                                </span>
                                {country.capital[0]}
                            </p>
                             <p>
                                <span className='card-description'>Currencies:</span>
                                {
                                    Object.keys(country?.currencies).map((key)=>country.currencies[key].name).join(", ")
                                }
                            </p>
                                 <p>
                                <span className='card-description'>Population:

                                </span>
                                {country.population.toLocaleString()}
                            </p>
                             <p>
                                <span className='card-description'>Top Level Domain:

                                </span>
                                {country.tld[0]}
                            </p>
                            <p>
                                <span className='card-description'>Languages:</span>
                                {
                                    Object.keys(country?.languages).map((key)=>country.languages[key]).join(", ")
                                }
                            </p>
                            
                        </div> 
                    </div>
                </div>
            )
        }
        <div className="country-card-backbtn">
            <NavLink to="/country"><button>Go Back</button></NavLink>
        </div>
    </div>
  </section>
  
  )
}

export default CountryDetail
