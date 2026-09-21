import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
    return (
        <div className='relative flex flex-col md:flex-row overflow-hidden rounded-2xl bg-primary-light px-6 md:px-10 lg:px-16'>

            <div className='absolute -right-20 -top-24 h-64 w-64 rounded-full bg-primary opacity-5' />
            <div className='absolute bottom-[-7rem] left-1/3 h-56 w-56 rounded-full border-[24px] border-white opacity-70' />

            {/* --------- Header Left --------- */}
            <div className='relative z-10 flex w-full flex-col items-start justify-center gap-5 py-12 sm:py-16 md:w-1/2 md:py-20 lg:py-24'>
                <h1 className='max-w-xl text-4xl font-semibold leading-tight text-heading sm:text-5xl lg:text-[3.25rem]'>
                    Find the right doctor.<br />
                    Book with confidence.
                </h1>
                <div className='flex flex-col items-start gap-4 text-sm text-body sm:flex-row sm:items-center'>
                    <img className='w-28' src={assets.group_profiles} alt="" />
                    <div className='flex flex-col gap-1.5'>
                        <p className='max-w-md leading-relaxed'>Connect with trusted healthcare professionals and schedule your appointment effortlessly.</p>
                        <p className='flex items-center gap-2'><span className='text-success'>✓</span>Verified doctors</p>
                        <p className='flex items-center gap-2'><span className='text-success'>✓</span>Easy appointment booking</p>
                    </div>
                </div>
                <a href='#speciality' className='flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:bg-primary-dark'>
                    Find a doctor <img className='w-3' src={assets.arrow_icon} alt="" />
                </a>
            </div>

            {/* --------- Header Right --------- */}
            <div className='relative z-10 flex w-full items-end justify-center md:w-1/2'>
                <img className='h-auto w-full max-w-md object-contain object-bottom md:absolute md:bottom-0 md:right-0 md:max-w-lg' src={assets.header_img} alt="" />
            </div>
        </div>
    )
}

export default Header