import { useContext } from "react"
import { CurrentWeather } from "./components/CurrentWeather"
import { Loader } from "./components/Loader"
import { WeatherOptions } from "./components/WeatherOptions"
import { WeatherContext } from "./context/weather"

function App() {
  const { loader } = useContext(WeatherContext)

  return (
    <>
      <main className="min-h-screen w-screen tablet:flex tablet:flex-row font-Raleway">
        {loader ?
          <Loader /> :
          <>
            <CurrentWeather />
            <WeatherOptions />
          </>
        }
      </main>
    </>
  )
}

export default App
