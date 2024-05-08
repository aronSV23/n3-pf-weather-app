import React from 'react'

export const HightlightsCard = ({ children }) => {
  return (
    <div className='w-[328px] h-[210px] text-center bg-[#1E213A] flex flex-col justify-center'>
        <h4 className='text-[#E7E7EB] text-[16px] leading-[18.78px] font-medium pt-5 pb-2'>Wind status</h4>
        <h2 className='text-[#E7E7EB] text-[64px] leading-[75.14px] font-bold  pt-3 pb-5'>7<span className='text-[#E7E7EB] text-[36px] leading-[42.26px] font-medium'>mph</span> </h2>
        { children }
    </div>
  )
}
