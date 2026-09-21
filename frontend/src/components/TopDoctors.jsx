import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
const TopDoctors = () => {

    const navigate = useNavigate()

    const { doctors } = useContext(AppContext)

    return (
        <div className='flex flex-col items-center gap-4 bg-background py-14 text-heading sm:py-16 md:px-10'>
            <h1 className='text-3xl font-semibold sm:text-4xl'>Top Doctors</h1>
            <p className='max-w-xl px-4 text-center text-sm leading-relaxed text-body'>Meet trusted healthcare professionals ready to care for you.</p>
            <div className='grid w-full grid-cols-1 gap-5 px-3 pt-6 sm:grid-cols-2 lg:grid-cols-4'>
                {doctors.slice(0, 10).map((item, index) => (
                    <button type='button' onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }} className='group overflow-hidden rounded-xl border border-border bg-surface text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2' key={index}>
                        <div className='aspect-[4/3] overflow-hidden bg-primary-light'>
                            <img className='h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]' src={item.image} alt={item.name} />
                        </div>
                        <div className='p-4'>
                            <div className={`mb-2 flex items-center gap-2 text-sm ${item.available ? 'text-success' : 'text-muted'}`}>
                                <span className={`h-2 w-2 rounded-full ${item.available ? 'bg-success' : 'bg-muted'}`} />
                                <p>{item.available ? 'Available' : 'Not Available'}</p>
                            </div>
                            <p className='text-lg font-semibold text-heading'>{item.name}</p>
                            <p className='text-sm text-muted'>{item.speciality}</p>
                        </div>
                    </button>
                ))}
            </div>
            <button onClick={() => { navigate('/doctors'); scrollTo(0, 0) }} className='mt-6 rounded-full border border-primary bg-surface px-7 py-2.5 text-sm font-medium text-primary transition-colors duration-300 hover:bg-primary hover:text-white'>View all doctors &rarr;</button>
        </div>

    )
}

export default TopDoctors