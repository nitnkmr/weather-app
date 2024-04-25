import { useEffect, useState } from 'react'

import { MdOutlineVisibility } from "react-icons/md";
import { FaCloudSunRain } from "react-icons/fa";
import { BsDroplet } from "react-icons/bs";
import { FaTemperatureHalf } from "react-icons/fa6";
import { FaLocationArrow } from "react-icons/fa6";
import { TiWeatherWindyCloudy } from "react-icons/ti";
import { CiSearch } from "react-icons/ci";
import { FaWind } from "react-icons/fa6";
import { LuHaze } from "react-icons/lu";
import './App.css'

function App() {
  const [city, setCity] = useState("delhi")
  const [result, setresult] = useState(false)
  const [weatherInfo, setWeatherInfo] = useState({})
  const [input, setInput] = useState("")
  useEffect(()=>{
    fetchMovies()
  },[city])
  async function fetchMovies() {
    const response = await fetch(`https://api.weatherbit.io/v2.0/current?&city=${city}&key=845d6b03141b4a65af9c59099f41c3e6`)
    const data = await response.json();
    setresult(true)
   setWeatherInfo(data.data[0])
   console.log(weatherInfo.weather.description)
  }
  function handleSearch(){
    setCity(input);
  }
  return (
    <><div className="main">
      {result?<div className="conatiner">
        <div className="header">
          <div className="title"><FaCloudSunRain />Weather</div>
          <div className="searchbar">
            <input type="search" name="search" id="search" className="search" placeholder='Enter City Name' onChange={(e)=>setInput(e.target.value)}/>
            <button className="search"  onClick={handleSearch}><CiSearch />Search</button>
          </div>
        </div>
        <div className="temprature">
          <div className="icon temp"></div>
          <div className="temp"><div className="icons"><FaTemperatureHalf /></div> {weatherInfo.app_temp}<span>ºC</span></div>
          <div className="tempCondition temp"><div className="icons"><LuHaze /></div>{result?weatherInfo.weather.description:"jello"}</div>
          <div className="location temp"> <div className="icons"><FaLocationArrow /></div>{weatherInfo.city_name}, {weatherInfo.country_code}</div>
        </div>
        <div className="temprature">
          <div className="temp"> <div className="icons"><FaWind /> </div>{weatherInfo.wind_spd.toFixed(2)}<span>km</span></div>
          <div className="temp"> <div className="icons"><BsDroplet /> </div>{weatherInfo.rh} <span>%</span></div>
          <div className="tempCondition temp"><div className="icons"><TiWeatherWindyCloudy /></div> {weatherInfo.clouds}%</div>
          <div className="location temp"> <div className="icons"><MdOutlineVisibility /></div>{weatherInfo.vis}Km</div>
        </div>
        <div className="weatherInfo"></div>
      </div> : <div className="loading"></div>
      }
    </div>

    </>
  )
}

export default App
