import { convertDate } from "./utils";

let lon, lat

if (navigator.geolocation) {
    // geolocation is available
    console.log('GL available')
    navigator.geolocation.getCurrentPosition((position) => {
        lon = position.coords.longitude
        lat = position.coords.latitude
        console.log(lat, lon)
        // const locationData = axios.get('https://se-weather-api.herokuapp.com/api/v1/geo'position.coords.latitude, position.coords.longitude);
      });
  } 
  else {
    // geolocation is not supported
    console.log('geolocation not available')
  }

