
import { grid } from 'ldrs'

grid.register()

export const Loader = () => {
    return (
        <div className='w-full h-screen flex justify-center items-center content-center'>
            <l-grid
                size="60"
                speed="1.5"
                color="black"
            >

            </l-grid>
        </div>
    )
}
