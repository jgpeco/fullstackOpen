import React, {useState, useEffect} from 'react'
import axios from 'axios'

const Weather = ({countryName}) => {
    const api_key = process.env.REACT_APP_WEATHER_KEY
    
    const [weather, setWeather] = useState({})
    
    useEffect(() => {
        axios
         .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${countryName}`)
         .then((response) => {
             const data = response.data
             setWeather(data)
         })
    }, [api_key, countryName])
    

    return (
        <div>
            <h2>Weather in {countryName}</h2>
            {weather.current ?
                <div>
                    <p><strong>temperature:</strong> {weather.current.temperature}</p>
                    <img 
                        src={weather.current.weather_icons[0]} 
                        alt={`weather condition in ${countryName} is ${weather.current.weather_descriptions[0]}`} />
                </div>
                : <p>There is no info about the weather right now.</p>
            }
        </div>
    )
}

export default Weather