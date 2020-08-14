/**
 *
 * @param {number} time - Unix time in seconds returns it in miliseconds
 */
export function convertDate(time) {
  return time * 1000;
}

export function grabWeatherData(weatherData, numOfDays, icon, summary, high, low) {
    for (let i = 0; i < numOfDays; i++) {
          icon.push(weatherData[i].icon)
          summary.push(weatherData[i].summary)
          high.push(weatherData[i].temperatureHigh)
          low.push(weatherData[i].temperatureLow)
    }
    console.log(icon, summary, high, low)
}