import { convertDate } from "./utils"
import axios from 'axios'

let lon, lat, date
let icon = []
let summary = []
let low = []
let high = []

if (navigator.geolocation) {
    // geolocation is available
    console.log('GL available')
    
    navigator.geolocation.getCurrentPosition(async (position) => {
        lon = position.coords.longitude
        lat = position.coords.latitude
        console.log(lat, lon)
        const date = new Date()
        try {
            const res = await axios.get(`https://se-weather-api.herokuapp.com/api/v1/forecast?latitude=${lat}&longitude=${lon}&date=${date}`)
            const forecastData = res.data.daily.data
            grabWeatherData(forecastData, 3)

        } catch(err) {
            console.log(err)
        }
    });
  } 
  else {
    // geolocation is not supported
    console.log('geolocation not available')
  }



  function grabWeatherData(weatherData, numOfDays) {
      for (let i = 0; i < numOfDays; i++) {
            icon.push(weatherData[i].icon)
            summary.push(weatherData[i].summary)
            high.push(weatherData[i].temperatureHigh)
            low.push(weatherData[i].temperatureLow)
      }
      console.log(icon, summary, high, low)
  }