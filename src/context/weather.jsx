import { createContext, useEffect, useState } from 'react';
import { useFormatData } from '../hooks/useFormatData';

// Este es el que tenemos que consumir
export const WeatherContext = createContext()

const API_Key = '50504980bc6e8bb9f92626a501482ad4'

// Este es el que nos provee de acceso al contexto
export function WeatherProvider({ children }) {
  const [ geolocation, setGeolocation ] = useState()
  const { data, setFinalData, setDataToCelsius, setDataToFahrenheit } = useFormatData()
  const [ loader, setLoader ] = useState(true)
  const [ units, setUnits ] = useState('metric')

  const getGeoLocation = () => {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      setGeolocation({ lat: latitude.toFixed(2), lon: longitude.toFixed(2) })
    }, error => {
      console.warn(`ERROR(${error.code}): ${error.message}`);
      alert('Hubo un error al obtener la ubicación. Por favor, asegúrate de tener activada la geolocalización en tu dispositivo.');
    });
  };

  const getNearestLocationIp = async () => {
    try {
      const response = await fetch('https://ipapi.co/json/');
      if (!response.ok) {
        throw new Error('IP API request failed');
      }
      const jsonResponse = await response.json();
      const { latitude, longitude } = jsonResponse;
      setGeolocation({ lat: latitude.toFixed(2), lon: longitude.toFixed(2) })
    } catch (error) {
      console.error('Error fetching location:', error);
      alert('Hubo un error al obtener la ubicación más cercana. Por favor, inténtalo de nuevo más tarde.');
      return null;
    }
  }

  const getCurentLocationWeatherData = async () => {
    try {
      const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${geolocation.lat}&lon=${geolocation.lon}&appid=${API_Key}&units=${units}`)
      if (!res.ok) {
        throw new Error(`${res.statusText}`);
      }
      const resJson = await res.json()
      const res2 = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${geolocation.lat}&lon=${geolocation.lon}&appid=${API_Key}&units=${units}`)
      if (!res.ok) {
        throw new Error(`${res.statusText}`);
      }
      const resJson2 = await res2.json()

      setFinalData(resJson, resJson2, units)
    } catch (error) {
      alert(`Hubo un error: ${error.message}`);
    }
  };

  const getCurrentWeatherDataSearchByCity = async (location, units) => {
    try {
      const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_Key}&units=${units}`);
      if (!res.ok) {
        throw new Error(`${res.statusText}`);
      }
      const resJson = await res.json();
      setGeolocation({ lat: resJson.coord.lat.toFixed(2), lon: resJson.coord.lon.toFixed(2) })
    } catch (error) {
      alert(`Hubo un error: ${error.message}`);
    }
  };
  
  useEffect(() => {
    if (geolocation) {
      getCurentLocationWeatherData()
    }
  }, [geolocation])

  useEffect(() => {
    getNearestLocationIp()
  },[])

  useEffect(() => {
    if (data) {
      setLoader(false)
    } else {
      setLoader(true)
    }
  }, [data])
  
  return (
    <WeatherContext.Provider value={{
      getGeoLocation,
      data,
      loader,
      setUnits,
      units,
      setDataToFahrenheit,
      setDataToCelsius,
      getCurrentWeatherDataSearchByCity
    }}
    >
      {children}
    </WeatherContext.Provider>
  )
}