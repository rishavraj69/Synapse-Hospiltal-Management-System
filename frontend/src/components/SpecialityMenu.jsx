import React from 'react'
import { specialityData } from '../assets/assets'
import { Link } from 'react-router-dom'

const SpecialityMenu = () => {
    return (
        <div id='speciality' className='flex flex-col items-center gap-4 bg-background py-14 text-heading sm:py-16'>
            <h1 className='text-3xl font-semibold sm:text-4xl'>Explore specialties</h1>
            <p className='max-w-xl px-4 text-center text-sm leading-relaxed text-body'>Find the right care for your needs from trusted medical specialists.</p>
            <div className='grid w-full grid-cols-2 gap-4 px-2 pt-6 sm:grid-cols-3 sm:gap-5 sm:px-4 lg:grid-cols-6 lg:gap-4 lg:px-0'>
                {specialityData.map((item, index) => (
                    <Link to={`/doctors/${item.speciality}`} onClick={() => scrollTo(0, 0)} className='group flex min-h-40 flex-col items-center justify-center gap-4 rounded-xl border border-border bg-surface px-3 py-5 text-center text-sm font-medium text-heading shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-md' key={index}>
                        <span className='flex h-20 w-20 items-center justify-center rounded-lg bg-primary-light p-4 transition-transform duration-300 group-hover:scale-105'>
                            <img className='h-full w-full object-contain' src={item.image} alt={`${item.speciality} specialty`} />
                        </span>
                        <p>{item.speciality}</p>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default SpecialityMenu