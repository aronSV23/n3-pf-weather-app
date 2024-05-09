import React, { useContext, useState } from 'react'
import { WeatherContext } from '../context/weather'
import { LocationsItem } from './LocationsItem'

export const SearchModal = ({ setIsOpen }) => {
    const [showLocations, setShowLocations] = useState(false)
    const { units, getCurrentWeatherDataSearchByCity } = useContext(WeatherContext)

    const [searchLocation, setSearchLocation] = useState('')

    const locations = ['London', 'Barcelona', 'Long Beach']

    const selectLocation = (location) => {
        setSearchLocation(location)
        setShowLocations(false)
    }

    const searchLocations = (e) => {
        setSearchLocation(e.target.value)
    }

    const handleShowLocation = (e) => {
        if(e.target.tagName === 'DIV') {
            setShowLocations(false)
        }
    }

    const handleSearchWeatherByLocation = () => {
        if (searchLocation != '') {
        getCurrentWeatherDataSearchByCity(searchLocation, units)
        setIsOpen(false)
        }
    }

    return (
        <div onClick={handleShowLocation} className='w-full h-screen bg-[#1E213A] absolute z-20 px-4 py-16'>
            <div onClick={() => setIsOpen(false)} className='p-1 absolute top-3 right-3 text-[#E7E7EB]'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
            </div>
            <div className='flex justify-center gap-3'>
                <div id='input-search'  onClick={()=>setShowLocations(true)}  className='text-[#E7E7EB] flex max-w-[268px] min-w-[252px] h-[48px] border-[#E7E7EB] border-[1px] items-center px-2 gap-3'>
                    <label htmlFor="search-city">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>

                    </label>
                    <input value={searchLocation} autoComplete='off' id='search-city' onChange={searchLocations} type="search" className='bg-[#1E213A] outline-none border-none focus:border-none' placeholder='search location'/>
                </div>
                <button onClick={handleSearchWeatherByLocation} className='h-[48px] w-[86px] cursor-pointer bg-[#3C47E9] hover:bg-[#2831af] active:bg-[#5962e2] text-[#E7E7EB] items-center justify-center'>
                    Search
                </button>
            </div>
            
            {locations &&
                <section id='location-list' className='flex mx-auto w-full text-[#E7E7EB] px-4 py-6'>
                    <ul className='flex py-4 w-full flex-col gap-4'>
                        { showLocations &&
                            locations.map((location, index) => <LocationsItem selectLocation={selectLocation} key={index} location={location} />)
                        }
                    </ul>
                </section>
            }
        </div>
    )
}
