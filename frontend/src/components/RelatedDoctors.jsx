import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
const RelatedDoctors = ({ speciality, docId }) => {

    const navigate = useNavigate()
    const { doctors } = useContext(AppContext)

    const [relDoc, setRelDoc] = useState([])

    useEffect(() => {
        if (doctors.length > 0 && speciality) {
            const doctorsData = doctors.filter((doc) => doc.speciality === speciality && doc._id !== docId)
            setRelDoc(doctorsData)
        }
    }, [doctors, speciality, docId])

    return (
        <div className='flex flex-col items-center gap-4 bg-background py-14 text-heading sm:py-16'>
            <h2 className='text-3xl font-semibold sm:text-4xl'>Related Doctors</h2>
            <p className='max-w-xl px-4 text-center text-sm leading-relaxed text-body'>Explore other trusted specialists who can help with your care.</p>
            <div className='grid w-full grid-cols-1 gap-5 px-3 pt-6 sm:grid-cols-2 lg:grid-cols-3'>
                {relDoc.map((item, index) => (
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
            {/* <button className='bg-primary-light text-gray-600 px-12 py-3 rounded-full mt-10'>more</button> */}
        </div>
    )
}

export default RelatedDoctors