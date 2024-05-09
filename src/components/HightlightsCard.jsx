import React from 'react'

export const HightlightsCard = ({ children, value, title, unit, height }) => {
  return (
    <li className={`w-[328px] ${height} text-center bg-[#1E213A] flex flex-col justify-center`}>
        <h4 className='text-[#E7E7EB] text-[16px] leading-[18.78px] font-medium pt-5 pb-2'>{title}</h4>
        <h2 className='text-[#E7E7EB] text-[64px] leading-[75.14px] font-bold  pt-3 pb-5'>{value}<span className='text-[#E7E7EB] text-[36px] leading-[42.26px] font-thin'>{unit}</span> </h2>
        { children }
    </li>
  )
}
