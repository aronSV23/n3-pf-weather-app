import { useState } from 'react';

const API_Key = '50504980bc6e8bb9f92626a501482ad4'

/* Añadi el buscador por ciudades haciendo un fetch a la api para obtener 
el arregllo de coincidencias, luego formatee y almacene los datos a mostrar. 
Se puede buscar ya sea selecicionando alguno de la lista y haciendo click en search 
o escribiendo uno mismo el nombre del lugar y haciendo click en search */

export function useCurrentWeatherSearchByCity () {
    const [searchLocationsData, setSearchLocationsData] = useState([])


    const getLocationsData = async (location) => {
        try {
          const res = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=4&appid=${API_Key}`);
          if (!res.ok) {
            throw new Error(`${res.statusText}`);
          }
          const resJson = await res.json();
          const locationArray = []
          resJson.forEach(element => {
            locationArray.push({ place: `${element.name}, ${element.state}, ${element.country}`, latitude: element.lat, longitude: element.lon })
          });

          setSearchLocationsData(locationArray)
        } catch (error) {
          alert(`Hubo un error: ${error.message}`);
        }
      };

      return { searchLocationsData, getLocationsData, setSearchLocationsData };

    }