import { grabWeatherData } from "./utils"
import axios from 'axios'

let lon, lat, city
let icon = []
let summary = []
let low = []
let high = []
const today = new Date()
const dd = today.getDate()
const mm = today.getMonth()+1
const yyyy = today.getFullYear()
const structDate = mm + '/' + dd + '/' + yyyy


if (navigator.geolocation) {
    // geolocation is available
    console.log('GL available')
    
    navigator.geolocation.getCurrentPosition(async (position) => {
        lon = position.coords.longitude
        lat = position.coords.latitude

        try {
            //consume forecast api with lat and lon, fill forecast category arrays to be iterated over
            const forecastRes = await axios.get(`https://se-weather-api.herokuapp.com/api/v1/forecast?latitude=${lat}&longitude=${lon}&date=${structDate}`)
            const forecastData = forecastRes.data.daily.data
            grabWeatherData(forecastData, 3, icon, summary, high, low)

           //consume reverse geocode api to get city from lat and lon, to be used in title
           const cityRes = await axios.get(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`)
           city = cityRes.data.city.toUpperCase()
           document.getElementById('title').innerHTML = `WEATHER FORECAST FOR ${city}`

           //grab container
           const weatherBoxContainer = document.getElementById('weatherBoxContainer')
           //adjust html to reflect filled data in category arrays
           for (let i = 0; i < icon.length; i++) {
               const newWeatherBox = document.createElement("div")
               newWeatherBox.className = 'weatherBox'
               newWeatherBox.innerHTML = `${icon[i]} ${summary[i]} ${high[i]} / ${low[i]}`
               weatherBoxContainer.appendChild(newWeatherBox)
           }
        } catch(err) {
            console.log(err)
        }
    })
  } 
  else {
    // geolocation is not supported
    console.log('geolocation not available')
  }

