import React from 'react'

export const InputRange = () => {
    return (
        <div className='flex flex-col pb-9 justify-center items-center'>
            <div className='w-[229px] relative'>
                <span className="text-[#A09FB1] text-[12px] leading-[14.09px] font-bold absolute start-0 bottom-[1px]">0</span>
                <span className="text-[#A09FB1] text-[12px] leading-[14.09px] font-bold absolute mx-0 bottom-[1px]">50</span>
                <span className="text-[#A09FB1] text-[12px] leading-[14.09px] font-bold absolute end-0 bottom-[1px]">100</span>
            </div>
            <input
                type="range"
                min='0'
                max='100'
                value='80'
                readOnly
                className='range-slider w-[229px] h-2 bg-[#E7E7EB] rounded-full appearance-none'
                style={{
                    background: 'linear-gradient(to right, #FFEC65 0%, #FFEC65 80%, #E7E7EB 80%, #E7E7EB 100%)'
                }}
            />
            <div className='w-[229px] relative'>
                <span className="text-[#A09FB1] text-[12px] leading-[14.09px] font-bold absolute end-0 top-1">%</span>
            </div>
        </div>
    )
}
