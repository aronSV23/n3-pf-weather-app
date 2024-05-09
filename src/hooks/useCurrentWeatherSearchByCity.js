import { useState } from 'react';

const API_Key = '50504980bc6e8bb9f92626a501482ad4'

export function useCurrentWeatherSearchByCity () {
    const [searchLocationCuarrentWeaterData, setSearchLocationCuarrentWeaterData] = useState()
    const [error, setError] = useState(null)

    const getCurrentWeatherDataSearchByCity = async (location, units) => {
        try {
          const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_Key}&units=${units}`);
          console.log(res.statusText)
          if (!res.ok) {
            throw new Error(`${res.statusText}`);
          }
          const resJson = await res.json();
          console.log(resJson.coord.lat, resJson.coord.lon );
          setError(null); // Reset the error state
        } catch (error) {
          alert(`Hubo un error: ${error.message}`);
        }
      };

      return { searchLocationCuarrentWeaterData, getCurrentWeatherDataSearchByCity, error };

    }