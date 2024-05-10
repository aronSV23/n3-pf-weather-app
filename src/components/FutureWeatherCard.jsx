import React from 'react'

export const FutureWeatherCard = ({ fecha, minTemp, maxTemp, iconDir, iconAlt, unit}) => {
    return (
        <li className='w-[120px] h-[177px] tablet:h-[157px] text-center bg-[#1E213A] flex flex-col justify-center p-3 mb-3 tablet:p-2 tablet:mb-2'>
            <h3 className='text-[#E7E7EB] text-[16px] leading-[18.78px] font-medium'>{fecha}</h3>
            <img src={`icons/${iconDir}d.png`} alt={iconAlt} className='m-auto w-[58.44px]' />
            <div className='flex justify-around gap-2  text-[16px] leading-[18.78px] font-medium'>
                <p className='text-[#E7E7EB]'>{maxTemp}{unit}</p>
                <p className='text-[#A09FB1]'>{minTemp}{unit}</p>
            </div>
        </li>
    )
}
