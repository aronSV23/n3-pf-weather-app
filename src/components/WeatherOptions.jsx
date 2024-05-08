import React from 'react'
import { FutureWeatherCard } from './FutureWeatherCard'
import { HightlightsCard } from './HightlightsCard'
import { InputRange } from './InputRange'

export const WeatherOptions = () => {
    return (
        <article className="bg-[#100E1D] min-h-lvh  min-w-[375px] p-14" >
            <section className='text-[18px] pb-2 font-semibold leading-[21.13px] flex flex-row justify-end gap-4'>
                <button className='bg-[#6E707A] active:text-[#110E3C] active:bg-[#E7E7EB] w-[40px] h-[40px] rounded-full cursor-pointer hover:bg-[#55565d] shadow-[#00000040]'>
                    °C
                </button>
                <button className='bg-[#6E707A] active:text-[#110E3C] active:bg-[#E7E7EB] w-[40px] h-[40px] rounded-full cursor-pointer hover:bg-[#55565d] shadow-[#00000040]'>
                    °F
                </button>
            </section>
            <section className='container mx-auto py-6'>
                <div className='grid grid-cols-[repeat(auto-fill,120px)] gap-4 justify-center'>
                    <FutureWeatherCard />
                    <FutureWeatherCard />
                    <FutureWeatherCard />
                    <FutureWeatherCard />
                    <FutureWeatherCard />
                </div>
            </section>
            <section>
                <h3 className='text-[#E7E7EB] text-[24px] leading-[28.18px] font-bold py-9'>Today’s Hightlights</h3>
                <div className='grid grid-cols-[repeat(auto-fill,328px)] gap-10 justify-center'>
                    <HightlightsCard>
                        <div className='w-full text-center flex justify-center gap-3 pb-7'>
                            <div className='bg-[#6E707A] rotate-180 text-[#E7E7EB] w-[30px] h-[30px] rounded-full cursor-pointer flex justify-center items-center'>
                                <i className="fa-solid fa-location-arrow"></i>
                            </div>
                            <h4 className='text-[#E7E7EB] text-[14px] font-medium leading-[16.44px] content-center'>WSW</h4>
                        </div>
                    </HightlightsCard>
                    <HightlightsCard>
                        <InputRange />
                    </HightlightsCard>
                </div>
            </section>
        </article>
    )
}
