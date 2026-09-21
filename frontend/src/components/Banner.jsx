import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Banner = () => {

    const navigate = useNavigate()

    return (
        <div className='relative my-16 flex overflow-hidden rounded-2xl bg-primary-dark px-6 sm:my-20 sm:px-10 md:mx-10 md:flex-row md:px-14 lg:px-16'>

            <div className='absolute -right-20 -top-24 h-64 w-64 rounded-full border-[28px] border-primary opacity-30' />
            <div className='absolute bottom-[-9rem] left-1/3 h-64 w-64 rounded-full bg-primary opacity-20' />

            {/* ------- Left Side ------- */}
            <div className='relative z-10 flex flex-1 flex-col items-start justify-center py-12 sm:py-14 md:py-16 lg:py-20 lg:pl-5'>
                <div className='max-w-xl text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl'>
                    <h2>Ready to take care of your health?</h2>
                </div>
                <p className='mt-4 max-w-md text-sm leading-relaxed text-white/75 sm:text-base'>Find a trusted doctor and book your appointment today.</p>
                <button onClick={() => { navigate('/login'); scrollTo(0, 0) }} className='mt-7 rounded-full bg-white px-7 py-3 text-sm font-semibold text-primary-dark transition-colors duration-300 hover:bg-primary-light focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-dark'>Create free account &rarr;</button>
            </div>

            {/* ------- Right Side ------- */}
            <div className='relative z-10 flex w-full items-end justify-center md:w-1/2 lg:w-[410px]'>
                <img className='h-auto w-full max-w-sm object-contain object-bottom md:relative md:bottom-auto md:right-auto md:max-h-[28rem] md:w-auto md:max-w-full' src={assets.appointment_img} alt="Doctor appointment" />
            </div>
        </div>
    )
}

export default Banner