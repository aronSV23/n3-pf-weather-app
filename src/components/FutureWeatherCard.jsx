import React from 'react'
import weatherLogo from '../assets/LightRain.png'

export const FutureWeatherCard = () => {
    return (
        <div className='w-[120px] h-[177px] text-center bg-[#1E213A] flex flex-col justify-center p-5 mb-3'>
            <h3 className='text-[#E7E7EB] text-[16px] leading-[18.78px] font-light'>Tomorrow</h3>
            <img src={weatherLogo} alt="wheater image" className='m-auto w-[56.44px]' />
            <div className='flex justify-around gap-2  text-[16px] leading-[18.78px] font-light'>
                <p className='text-[#E7E7EB]'>16°C</p>
                <p className='text-[#A09FB1]'>11°C</p>
            </div>
        </div>
    )
}
