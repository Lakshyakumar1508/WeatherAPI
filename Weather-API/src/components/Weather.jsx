import React, { useEffect,useState,useRef } from "react";
import './Weather.css'
import search_icon from '../assets/search.png'
import cloud_icon from '../assets/cloud.png'
import clear_icon from '../assets/clear.png'
import drizzle_icon from '../assets/drizzle.png'
import humidity_icon from '../assets/humidity.png'
import rain_icon from '../assets/rain.png'
import wind_icon from '../assets/wind.png'
import snow_icon from '../assets/snow.png'
import moon_icon from '../assets/moon.png'
import moonc_icon from '../assets/mooncloud.jpeg'
// import moond_icon from '../assets/12.webp'


const Weather = () => {
    
    const inputRef= useRef()
    const[weatherData,setWeatherData]=useState(false);
    const allIcons ={
        "01d": clear_icon,
        "01n": moon_icon,
        "02d": cloud_icon,
        "02n": moonc_icon,
        "03d": cloud_icon,
        "03n": moon_icon,
        "04d": drizzle_icon,
        "04n": moon_icon,
        "09d": rain_icon,
        "09n": moon_icon,
        "10d": rain_icon,
        "10n": moon_icon,
        "13d": snow_icon, 
        "13n": moon_icon,
    }

    const search = async (city) => {
        if(city===""){
            alert ("Enter City Name"); 
            return;
        }
        try{
            const url =`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`
            const response= await fetch (url)
            const data= await response.json()
            console.log(data);
            const icon=allIcons[data.weather[0].icon] || clear_icon;
            setWeatherData({
                humidity:data.main.humidity,
                windSpeed:data.wind.speed,
                temp:Math.floor(data.main.temp), 
                location:data.name,
                icon: icon
            })
        } catch (error){
            setWeatherData(false)
        }
    }

    useEffect(() => {
        search("roorkee");
    },[])

  return (

    <div className='weather'>
        <div className="search-bar">     
            <input ref={inputRef}type="text" placeholder='Search' /> 
            <img src={search_icon} alt=""  onClick={()=> search(inputRef.current.value)} />
        </div>
        {weatherData?<>
        <img src={weatherData.icon} alt='' className='weather-icon' />
        <span>
         <p className='temperature'>{weatherData.temp}°C</p>
         <p className='location'>{weatherData.location}</p>
        <div className="weather-data">
            <div className="col">
                <img src={humidity_icon} alt=''/>
                <div>
                    <p>{weatherData.humidity}%</p>
                    <span> Humidity</span>
                </div>
            </div>
        </div>
        <div className="weather-data">
            <div className="col">
                <img src={wind_icon} alt=''/>
                <div>
                    <p>{weatherData.windSpeed}km/h</p>
                    <span>Wind</span>
                </div>
            </div>
        </div>
        </span> 
        </>:<></>}
    </div>
  )
}

export default Weather
