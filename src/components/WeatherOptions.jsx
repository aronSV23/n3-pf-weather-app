import React, { useContext } from 'react'
import { WeatherContext } from '../context/weather'
import { FutureWeatherCard } from './FutureWeatherCard'
import { HightlightsCard } from './HightlightsCard'
import { InputRange } from './InputRange'

export const WeatherOptions = () => {
    const { data, setUnits, units, setDataToFahrenheit, setDataToCelsius } = useContext(WeatherContext)

    const handleChangeDegrees = (e) => {
        if (e.target.value === 'metric' && units != 'metric') {
            setUnits('metric')
            setDataToCelsius(data)
        } else if (e.target.value === 'imperial' && units != 'imperial') {
            setUnits('imperial')
            setDataToFahrenheit(data)
        }
    }

    return (
        <article className="bg-[#100E1D] flex flex-col justify-around mx-auto min-h-lvh min-w-[375px] tablet:grow tablet:min-w-[810px] p-14 tablet:p-6" >
            <section className='max-w-[706px] container mx-auto text-[18px] pb-2 font-semibold leading-[21.13px] flex flex-row justify-end gap-4'>
                <button className={`${units === 'metric'? 'text-[#110E3C] bg-[#E7E7EB]' : 'bg-[#6E707A]'}  w-[40px] h-[40px] tablet:h-[32px] tablet:w-[32px] rounded-full cursor-pointer hover:bg-[#55565d] shadow-[#00000040]`} value='metric' onClick={handleChangeDegrees}>
                    °C
                </button>
                <button className={`${units === 'imperial'? 'text-[#110E3C] bg-[#E7E7EB]' : 'bg-[#6E707A]'}  w-[40px] h-[40px] tablet:h-[32px] tablet:w-[32px] rounded-full cursor-pointer hover:bg-[#55565d] shadow-[#00000040]`} value='imperial' onClick={handleChangeDegrees}>
                    °F
                </button>
            </section>
            <section className='container mx-auto py-6 max-w-[706px] tablet:py-3'>
                <ul className='grid grid-cols-[repeat(auto-fill,120px)] gap-4 justify-center'>
                    { data.nextDays &&
                        data.nextDays.map( (day, index) => <FutureWeatherCard key={index} fecha={day.date} iconDir={day.icon} iconAlt={day.iconName} maxTemp={day.maxTemperature} minTemp={day.minTemperature} unit={day.temperatureUnits} /> )
                    }
                </ul>
            </section>
            <section className='container mx-auto max-w-[706px]'>
                <h3 className='text-[#E7E7EB] text-[24px] leading-[28.18px] font-bold py-9 tablet:py-6'>Today’s Hightlights</h3>
                <ul className='grid grid-cols-[repeat(auto-fill,328px)] gap-10 justify-center tablet:gap-6'>
                    <HightlightsCard
                    title={'Wind status'}
                    value={data.today.windStatus.windSpeed}
                    unit={data.today.windStatus.windUnits}
                    height='h-[200px]'
                    >
                        <div className='w-full text-center flex justify-center gap-3 pb-7  tablet:pb-4'>
                            <div className={`bg-[#6E707A] text-[#E7E7EB] w-[30px] h-[30px] rounded-full cursor-pointer flex justify-center items-center`} style={{ rotate: `${data.today.windStatus.windDegree}deg`}}>
                                <i className={`fa-solid fa-location-arrow `}></i>
                            </div>
                            <h4 className='text-[#E7E7EB] text-[14px] font-medium leading-[16.44px] content-center'>{data.today.windStatus.windDirection}</h4>
                        </div>
                    </HightlightsCard>
                    <HightlightsCard
                    title={'Humidity'}
                    value={data.today.humidity}
                    unit='%'
                    height='h-[200px]'
                    >
                        <InputRange 
                        range={data.today.humidity}
                        />
                    </HightlightsCard>
                    <HightlightsCard
                    title={'Visibility'}
                    value={data.today.visibility.visibilityValue}
                    unit={data.today.visibility.visibilityUnits}
                    height='h-[170px]'
                    >
                    </HightlightsCard>
                    <HightlightsCard
                    title={'Air Pressure'}
                    value={data.today.airPressure}
                    unit='mb'
                    height='h-[170px]'
                    >
                    </HightlightsCard>
                </ul>
            </section>
            <footer className='font-Montserrat mx-auto content-center text-center mb-2 mt-5'>
                <p className='text-[#A09FB1] text-[14px] leading-[17.07px] font-medium'>created by <span className='text-[#A09FB1] text-[15px] leading-[19.07px] font-semibold'>aronSV23</span>  -  devChallenges.io</p>
            </footer>
        </article>
    )
}
