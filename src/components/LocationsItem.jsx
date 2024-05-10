import React from 'react'

export const LocationsItem = ({location, handleSelectLocation}) => {
    return (
        <li onClick={() => handleSelectLocation(location)} className='flex w-full text-[16px] leading-[16.78px] font-extralight h-[64px] justify-between items-center cursor-pointer active:border-[#616475] active:border-[1px] hover:bg-[#2b2f57] p-2'>
            <p className='ml-3'>{location.place}</p>
            <i className="fa-solid fa-angle-right text-[#616475]"></i>
        </li>
    )
}
