import React, { useContext } from 'react'
import { WeatherContext } from '../context/weather'

export const CurrentWeather = () => {
    const { getGeoLocation, data } = useContext(WeatherContext)

    return (
        <aside className="bg-[#1E213A] min-h-lvh min-w-[375px] font-Raleway">
            <div className='text-[#E7E7EB] flex justify-between px-[14px] py-[18px]'>
                <button className='w-[161px] h-[40px] bg-[#6E707A] cursor-pointer hover:bg-[#55565d] shadow-[#00000040] active:text-[#110E3C] active:bg-[#E7E7EB]'>Seach for places</button>
                <button className='bg-[#6E707A] w-[40px] h-[40px] rounded-full cursor-pointer hover:bg-[#55565d] shadow-[#00000040] mr-2 active:text-[#110E3C] active:bg-[#E7E7EB]' onClick={getGeoLocation} >
                    <i className="fa-solid fa-location-crosshairs"></i>
                </button>
            </div>
            <div>
                <div className='w-full bg-cloudBackgound bg-no-repeat bg-cover opacity-5 bg-center h-[326px]'>
                </div>
                <div className='w-[150px] m-auto h-0'>
                    <img src={`/src/assets/${data.today.icon}d.png`} alt={data.today.iconName} className='m-auto relative bottom-64' />
                </div>
            </div>
            <div className='w-full text-center font-medium'>
                <h2 className=' text-[144px] text-white leading-[169.06px]'>15<span className='text-[#A09FB1] text-[48px] leading-[56.35px]'>°C</span> </h2>
            </div>
            <h3 className='w-full text-center text-[#A09FB1] text-[36px] leading-[42.26px] font-thin'>Shower</h3>
            <div className='w-full text-center text-[#A09FB1] text-[16px] leading-[21.13px] font-thin flex justify-center gap-4 pt-8'>
            <p>Today </p>
            • 
            <p> Fri, 5 Jun</p>
            </div>
            <p className='w-full text-center text-[#A09FB1] text-[16px] leading-[21.13px] font-thin flex justify-center gap-4 pt-9 content-center'>
                <i className="fa-solid fa-location-dot"></i>
                Helsinki
            </p>
        </aside>
    )

}
