import React, {useEffect, useState, useRef} from 'react'
import './weather.css'
import search_icon from '../assets/search.png'
import clear_icon from '../assets/clear.png'
import cloud_icon from '../assets/cloud.png'
import drizzle_icon from '../assets/drizzle.png'
import humidity_icon from '../assets/humidity.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'
import wind_icon from '../assets/wind.png'




const weather = () => {
    
    const inputRef = useRef();

    const [weatherData, setWeatherData] = useState(false);

    const allIcons = {
        "01d": clear_icon,
        "01n": clear_icon,
        "02d": cloud_icon,
        "02n": cloud_icon,
        "03d": cloud_icon,
        "03n": cloud_icon,
        "04d": drizzle_icon,
        "04n": drizzle_icon,
        "09d": rain_icon,
        "09n": rain_icon,
        "10d": rain_icon,
        "10n": rain_icon,
        "11d": rain_icon,
        "11n": rain_icon,
        "13d": rain_icon,
        "13n": rain_icon
    };
    const search = async(city)=>{
        try{
           
           const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;

            const response = await fetch(url);
            const data = await response.json();

           // console.log("humidity is : ", data.main.humidity);


            console.log("Weather Data is : ",data);
            const icon = allIcons[data.weather[0].icon] || clear_icon;
            setWeatherData ({
                humidity: data.main.humidity,
                temperature: data.main.temp,
                windSpeed: data.wind.speed,
                location: data.name,
                icon: icon

            });

           
        }catch(e){

        }
    }

    useEffect(()=>{
        search("London");
    },[]);


  return (
    <div className='weather'>
      <div className='search-bar'>
        <input ref={inputRef} type="text" placeholder='Search'></input>
        <img src={search_icon} onClick={()=>{search(inputRef.current.value)}}></img>
     </div>
     <img src={weatherData.icon} alt="" className='weather-icon' />
     <p className='temperature'>{weatherData.temperature}°C</p>
     <p className='location'>{weatherData.location}</p>
     <div className="weather-data">

        <div className="col">
            <img src={humidity_icon} alt="" />
            <div className='text'>
                <p>{weatherData.humidity}%</p>
                <p>Humidity</p>
            </div>
        </div>

        <div className="col">
            <img src={wind_icon} alt="" />
            <div className='text'>
                <p>{weatherData.windSpeed}km/h</p>
                <p>Wind Speed</p>
            </div>
        </div>


     </div>
    </div>
  )
}

export default weather


