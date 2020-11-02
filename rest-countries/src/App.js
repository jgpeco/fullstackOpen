import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Country from './components/Country'

const SearchInput = ({query, handleQuery}) => 
                <input 
                    type="text" 
                    value={query} 
                    onChange={handleQuery}
                    placeholder='Search for a country...' />


const App = () => {
    const [query, setQuery] = useState('')
    const [countries, setCountries] = useState([])
    const [search, setSearch] = useState(false)

    useEffect(() => {
        axios
         .get('https://restcountries.eu/rest/v2/all')
         .then((response) => {
             const data = response.data
             setCountries(data)
         })
    }, [])

    const handleQuery = (e) => {
        if(e.target.value){
            setSearch(true)
        } else {
            setSearch(false)
        }
        setQuery(e.target.value)
    }

    const handleShowClick = (e) => {
        setQuery(e.target.value)
    }

    const searchedCountries = search
    ? countries.filter(country => country.name.toLowerCase().includes(query.toLowerCase()))
    : countries

    return (
        <>
            <div>
                <SearchInput query={query} handleQuery={handleQuery} />
            </div>
            <div>
                {searchedCountries.length > 10 && <p>Too many matches, please be more specific on your search</p>}
                {
                    searchedCountries.length > 1 && 
                    searchedCountries.length < 10 &&
                        searchedCountries.map((country) => 
                           <div key={(country.name.length * Math.random())}>
                               <p>{country.name}</p>
                               <button value={country.name} onClick={handleShowClick}>show</button>
                           </div>     
                        )
                }
                {
                    searchedCountries.length === 1 &&
                        searchedCountries.map((country) => 
                            <Country key={`${country.alpha3Code}${country.area}`} country={country} />
                        )
                }
            </div>
        </>
    )
}

export default App
