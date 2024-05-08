import { useState } from 'react';

export function useFormatData () {
    const [data, setData] = useState()

  
    function formatDate(timestamp) {
        const date = new Date(timestamp * 1000); // Convert the Unix timestamp to milliseconds
    
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'short' });
        const weekday = date.toLocaleString('default', { weekday: 'short' });
    
        return `${weekday}, ${day} ${month}`;
      }
    
      function formatIcon(icon) {
        return icon.slice(0, icon.length - 1);
      }
    
      function formatWind(windDegree, windSpeed, unit) {
        let windDirection = ''
        let windUnits = ''
    
        if (windDegree >= 0 && windDegree < 22.5) {
            windDirection = 'N'
          } else if (windDegree >= 22.5 && windDegree < 45) {
            windDirection = 'NNE'
          } else if (windDegree >= 45 && windDegree < 67.5) {
            windDirection = 'NE'
          } else if (windDegree >= 67.5 && windDegree < 90) {
            windDirection = 'ENE'
          } else if (windDegree >= 90 && windDegree < 112.5) {
            windDirection = 'E'
          } else if (windDegree >= 112.5 && windDegree < 135) {
            windDirection = 'ESE'
          } else if (windDegree >= 135 && windDegree < 157.5) {
            windDirection = 'SE'
          } else if (windDegree >= 157.5 && windDegree < 180) {
            windDirection = 'SSE'
          } else if (windDegree >= 180 && windDegree < 202.5) {
            windDirection = 'S'
          } else if (windDegree >= 202.5 && windDegree < 225) {
            windDirection = 'SSW'
          } else if (windDegree >= 225 && windDegree < 247.5) {
            windDirection = 'SW'
          } else if (windDegree >= 247.5 && windDegree < 270) {
            windDirection = 'WSW'
          } else if (windDegree >= 270 && windDegree < 292.5) {
            windDirection = 'W'
          } else if (windDegree >= 292.5 && windDegree < 315) {
            windDirection = 'WNW'
          } else if (windDegree >= 315 && windDegree < 337.5) {
            windDirection = 'NW'
          } else {
            windDirection = 'NNW'
          }
    
          if (unit === 'metric') {
            windUnits = 'mps'
          } else {
            windUnits = 'mph'
          }
    
          return { windDegree, windDirection, windUnits, windSpeed }
      }

      function formatVisibility(visivility, unit){
        let visibilityUnits = ''
        let visivilityValue

        if (unit === 'metric') {
            visibilityUnits = 'Km'
          } else {
            visibilityUnits = 'miles'
          }

          if (unit === 'metric') {
            visivilityValue = ((visivility)/1000).toFixed(1)
          } else {
            visivilityValue = ((visivility)/1609.344).toFixed(1)
          }

          return { visivilityValue, visibilityUnits }
      }

      function formatDataArr(resJson,resJson2) {

        const fecha = new Date(resJson.dt * 1000)
        const dataArray = []
        dataArray.push(resJson)

        for (let index = 1; index < 6; index++) {
            const dayArray = resJson2.list.filter((day) => (new Date(day.dt * 1000).getDate()) === (new Date((resJson.dt + (86400 * index)) * 1000).getDate()))
            const closestHour = dayArray.reduce((prev, curr) => (Math.abs((new Date(curr.dt * 1000).getHours()) - fecha.getHours()) < Math.abs((new Date(prev.dt * 1000).getHours()) - fecha.getHours()) ? curr : prev));
            dataArray.push(closestHour)
        }

        return dataArray
      }
    
      const setFinalData = (resJson,resJson2, unit) => {
        
        const arr = formatDataArr(resJson,resJson2)

        setData({
          today: {
            name: 'today',
            date:  formatDate(arr[0].dt),
            locationName: arr[0].name + ', ' + arr[0].sys.country,
            temperature: arr[0].main.temp,
            iconName: arr[0].weather[0].description,
            icon: formatIcon(arr[0].weather[0].icon),
            windDirection: formatWind(arr[0].wind.deg, arr[0].wind.speed, unit),
            humidity: arr[0].main.humidity,
            visibility: formatVisibility((arr[0].visibility), unit),
            airPressure: arr[0].main.pressure
          },
          nextDays: [
            {
              date: 'Tomorrow',
              iconName: arr[1].weather[0].description,
              icon: formatIcon(arr[1].weather[0].icon),
              minTemperature: arr[1].main.temp_min,
              maxTemperature: arr[1].main.temp_max,
            },
            {
              date: formatDate(arr[2].dt),
              iconName: arr[2].weather[0].description,
              icon: formatIcon(arr[2].weather[0].icon),
              minTemperature: arr[2].main.temp_min,
              maxTemperature: arr[2].main.temp_max,
            },
            {
              date: formatDate(arr[3].dt),
              iconName: arr[3].weather[0].description,
              icon: formatIcon(arr[3].weather[0].icon),
              minTemperature: arr[3].main.temp_min,
              maxTemperature: arr[3].main.temp_max,
            },
            {
              date: formatDate(arr[4].dt),
              iconName: arr[4].weather[0].description,
              icon: formatIcon(arr[4].weather[0].icon),
              minTemperature: arr[4].main.temp_min,
              maxTemperature: arr[4].main.temp_max,
            },
            {
              date: formatDate(arr[5].dt),
              iconName: arr[5].weather[0].description,
              icon: formatIcon(arr[5].weather[0].icon),
              minTemperature: arr[5].main.temp_min,
              maxTemperature: arr[5].main.temp_max,
            },
          ]
        })
    
      }
        

  return { data, setFinalData }
}