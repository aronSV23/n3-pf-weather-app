import { createContext, useEffect, useState } from 'react';
import { useFormatData } from '../hooks/useFormatData';
import { useSummarizeData } from '../hooks/useSummarizeData';

// Este es el que tenemos que consumir
export const WeatherContext = createContext()

const API_Key = '50504980bc6e8bb9f92626a501482ad4'

// Este es el que nos provee de acceso al contexto
export function WeatherProvider({ children }) {
  const [ geolocation, setGeolocation ] = useState()
  const { data, setFinalData } = useFormatData()
  const { filteredData, formatDataArr } = useSummarizeData()
  const [ loader, setLoader ] = useState(true)
  const [ units, setUnits ] = useState('metric')

  const getGeoLocation = () => {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      setGeolocation({ lat: latitude.toFixed(2), lon: longitude.toFixed(2) })
    }, error => console.warn(`ERROR(${error.code}): ${error.message}`));
  };

  const getNearestLocationIp = async () => {
    try {
      const response = await fetch('https://ipapi.co/json/');
      const jsonResponse = await response.json();
      const { latitude, longitude } = jsonResponse;
      setGeolocation({ lat: latitude.toFixed(2), lon: longitude.toFixed(2) })
    } catch (error) {
      console.error('Error fetching location:', error);
      return null;
    }
  }

  const getCurentLocationWeatherData = async () => {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${geolocation.lat}&lon=${geolocation.lon}&appid=${API_Key}&units=${units}`)
    const resJson = await res.json()
    const res2 = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${geolocation.lat}&lon=${geolocation.lon}&appid=${API_Key}&units=${units}`)
    const resJson2 = await res2.json()

    formatDataArr(resJson, resJson2)
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
      console.log(data)
      setLoader(false)
    }
  }, [data])

  useEffect(() => {
    if (filteredData) {
      setFinalData(filteredData, units)
    }
  }, [filteredData, units])
  
  return (
    <WeatherContext.Provider value={{
      getGeoLocation,
      data,
      loader,
      setUnits
    }}
    >
      {children}
    </WeatherContext.Provider>
  )
}