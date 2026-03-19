import React, { useEffect, useState, useTransition } from 'react'
import {getYourCountryData} from '../api/postApi'
import Loader from '../components/UI/Loader'
import CountryCard from '../components/Layouts/CountryCard'
import SearchFilter from '../components/UI/SearchFilter'
const Country = () => {
 const[ispending,startTranstion] =useTransition()
 const[countries,setCountries] = useState([])
 const[search,setSearch] = useState()
  const[filter,setFilter] = useState("all")
 useEffect(()=>{
  startTranstion(async()=>{
  const res= await getYourCountryData()
  setCountries(res.data);
  })
 },[]);
   const searchCountries =(country)=>{
        if(search){
           return country.name.common.toLowerCase().includes(search.toLowerCase());
        }
        return country

    }
    const regionFind = (country)=>{
      if(filter==="all") return country;
      return country.region === filter;
    };
    const countryFilter =countries.filter((country)=> searchCountries(country) && regionFind(country))
 if(ispending) return <Loader/>
  return (
   <section className='country-section '>
    <SearchFilter
    search={search}
    setSearch={setSearch}
    filter={filter}
    setFilter={setFilter} 
    countries={countries}
    setCountries={setCountries}/>
    <ul className='grid grid-four-cols'>
    {
countryFilter.map((curcountry,index)=>{
  return<CountryCard country={curcountry} key={index}/>
})
    }
    </ul>
   </section>
  )
}

export default Country
