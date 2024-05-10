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
        let visibilityValue

        if (unit === 'metric') {
            visibilityUnits = 'Km'
          } else {
            visibilityUnits = 'miles'
          }

          if (unit === 'metric') {
            visibilityValue = ((visivility)/1000).toFixed(1)
          } else {
            visibilityValue = ((visivility)/1609.344).toFixed(1)
          }

          return { visibilityValue, visibilityUnits }
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
            temperature: (arr[0].main.temp).toFixed(0),
            temperatureUnits: (unit === 'metric' ? '°C' : '°F'),
            weatherName:  arr[0].weather[0].main,
            iconName: arr[0].weather[0].description,
            icon: formatIcon(arr[0].weather[0].icon),
            windStatus: formatWind(arr[0].wind.deg, arr[0].wind.speed, unit),
            humidity: arr[0].main.humidity,
            visibility: formatVisibility((arr[0].visibility), unit),
            airPressure: arr[0].main.pressure
          },
          nextDays: [
            {
              date: 'Tomorrow',
              iconName: arr[1].weather[0].description,
              icon: formatIcon(arr[1].weather[0].icon),
              minTemperature: (arr[1].main.temp_min).toFixed(0),
              maxTemperature: (arr[1].main.temp_max).toFixed(0),
              temperatureUnits: (unit === 'metric' ? '°C' : '°F'),
            },
            {
              date: formatDate(arr[2].dt),
              iconName: arr[2].weather[0].description,
              icon: formatIcon(arr[2].weather[0].icon),
              minTemperature: (arr[2].main.temp_min).toFixed(0),
              maxTemperature: (arr[2].main.temp_max).toFixed(0),
              temperatureUnits: (unit === 'metric' ? '°C' : '°F'),
            },
            {
              date: formatDate(arr[3].dt),
              iconName: arr[3].weather[0].description,
              icon: formatIcon(arr[3].weather[0].icon),
              minTemperature: (arr[3].main.temp_min).toFixed(0),
              maxTemperature: (arr[3].main.temp_max).toFixed(0),
              temperatureUnits: (unit === 'metric' ? '°C' : '°F'),
            },
            {
              date: formatDate(arr[4].dt),
              iconName: arr[4].weather[0].description,
              icon: formatIcon(arr[4].weather[0].icon),
              minTemperature: (arr[4].main.temp_min).toFixed(0),
              maxTemperature: (arr[4].main.temp_max).toFixed(0),
              temperatureUnits: (unit === 'metric' ? '°C' : '°F'),
            },
            {
              date: formatDate(arr[5].dt),
              iconName: arr[5].weather[0].description,
              icon: formatIcon(arr[5].weather[0].icon),
              minTemperature: (arr[5].main.temp_min).toFixed(0),
              maxTemperature: (arr[5].main.temp_max).toFixed(0),
              temperatureUnits: (unit === 'metric' ? '°C' : '°F'),
            },
          ]
        })
    
      }
        
      const setDataToCelsius = (data) =>{
        const celsiusData = structuredClone(data)

        celsiusData.today.temperature = ((data.today.temperature - 32) * 5/9).toFixed(0)
        celsiusData.today.temperatureUnits = '°C'
        celsiusData.today.windStatus.windSpeed = (data.today.windStatus.windSpeed * 0.447).toFixed(1)
        celsiusData.today.windStatus.windUnits = 'mps'
        celsiusData.today.visibility.visibilityValue = (data.today.visibility.visibilityValue * 1.60934).toFixed(1)
        celsiusData.today.visibility.visibilityUnits = 'km'
        celsiusData.nextDays.forEach(day => {
            day.maxTemperature = ((day.maxTemperature - 32) * 5/9).toFixed(0)
            day.minTemperature = ((day.minTemperature - 32) * 5/9).toFixed(0)
            day.temperatureUnits = '°C'
        });

        setData(celsiusData)
      }

      const setDataToFahrenheit = (data) =>{
        const fahrenheitData = structuredClone(data)
      
        fahrenheitData.today.temperature = ((data.today.temperature * 9/5) + 32).toFixed(0)
        fahrenheitData.today.temperatureUnits = '°F'
        fahrenheitData.today.windStatus.windSpeed = (data.today.windStatus.windSpeed * 2.23694).toFixed(1)
        fahrenheitData.today.windStatus.windUnits = 'mph'
        fahrenheitData.today.visibility.visibilityValue = (data.today.visibility.visibilityValue * 0.621371).toFixed(1)
        fahrenheitData.today.visibility.visibilityUnits = 'miles'
        fahrenheitData.nextDays.forEach(day => {
            day.maxTemperature = ((day.maxTemperature * 9/5) + 32).toFixed(0)
            day.minTemperature = ((day.minTemperature * 9/5) + 32).toFixed(0)
            day.temperatureUnits = '°F'
        });
      
        setData(fahrenheitData)
      }

  return { data, setFinalData, setDataToCelsius, setDataToFahrenheit, setData }
}