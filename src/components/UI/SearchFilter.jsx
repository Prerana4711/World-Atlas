import React from 'react'

const SearchFilter = ({search, setSearch, filter, setFilter, countries, setCountries}) => {
    const handleInputChange = (e) => {
        setSearch(e.target.value) 
    }
    
    const handleSelectChange = (e) => {
        e.preventDefault();
        setFilter(e.target.value)
    }
    
    const sortCountries = (value) => {
        const sortcountry = [...countries].sort((a, b) => {
            return value === "asc" ?
                a.name.common.localeCompare(b.name.common) 
                : b.name.common.localeCompare(a.name.common)
        });
        setCountries(sortcountry);
    }
  
    return (
        <section className="section-searchFilter">
            <input 
                type='text' 
                placeholder='Search countries...' 
                value={search} 
                onChange={handleInputChange}
            />
            
            <div className="filter-controls">
                <div className="sort-buttons">
                    <button 
                        className="sort-btn asc" 
                        onClick={() => sortCountries("asc")}
                    >
                        Asc
                    </button>
                    <button 
                        className="sort-btn desc" 
                        onClick={() => sortCountries("dec")}
                    >
                        Desc
                    </button>
                </div>
                
                <select value={filter} onChange={handleSelectChange}>
                    <option value="all">All Regions</option>
                    <option value="Africa">Africa</option>
                    <option value="Americas">Americas</option>
                    <option value="Asia">Asia</option>
                    <option value="Europe">Europe</option>
                    <option value="Oceania">Oceania</option>
                </select>
            </div>
        </section>
    )
}

export default SearchFilter