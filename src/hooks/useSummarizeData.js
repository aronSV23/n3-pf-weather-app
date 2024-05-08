import { useState } from 'react';

export function useSummarizeData () {
  const [ filteredData, setFilteredData ] = useState()

  const formatDataArr = (resJson,resJson2) => {

    const fecha = new Date(resJson.dt * 1000)
    const dataArray = []
    dataArray.push(resJson)

    for (let index = 1; index < 6; index++) {
        const dayArray = resJson2.list.filter((day) => (new Date(day.dt * 1000).getDate()) === (new Date((resJson.dt + (86400 * index)) * 1000).getDate()))
        const closestHour = dayArray.reduce((prev, curr) => (Math.abs((new Date(curr.dt * 1000).getHours()) - fecha.getHours()) < Math.abs((new Date(prev.dt * 1000).getHours()) - fecha.getHours()) ? curr : prev));
        dataArray.push(closestHour)
    }

    setFilteredData(dataArray)
  }

  return { filteredData, formatDataArr }
}