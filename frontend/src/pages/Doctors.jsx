import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate, useParams } from 'react-router-dom'

const Doctors = () => {

  const { speciality } = useParams()

  const [filterDoc, setFilterDoc] = useState([])
  const [showFilter, setShowFilter] = useState(false)
  const navigate = useNavigate();

  const { doctors } = useContext(AppContext)

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality))
    } else {
      setFilterDoc(doctors)
    }
  }

  useEffect(() => {
    applyFilter()
  }, [doctors, speciality])

  return (
    <div className='bg-background pb-14 pt-4 text-heading sm:pb-16'>
      <div className='mb-8 text-center'>
        <h1 className='text-3xl font-semibold sm:text-4xl'>Find a doctor</h1>
        <p className='mx-auto mt-3 max-w-2xl px-4 text-sm leading-relaxed text-body'>Browse trusted healthcare professionals and find the right specialist for your needs.</p>
      </div>
      <div className='flex flex-col items-start gap-6 lg:flex-row'>
        <button onClick={() => setShowFilter(!showFilter)} className={`rounded-full border border-border px-4 py-2 text-sm font-medium transition-colors sm:hidden ${showFilter ? 'bg-primary text-white' : 'bg-surface text-heading hover:border-primary hover:text-primary'}`}>Filters</button>
        <div className={`w-full flex-col gap-2 text-sm ${showFilter ? 'flex' : 'hidden sm:flex lg:w-56 lg:flex-shrink-0'}`}>
          <button type='button' onClick={() => speciality === 'General physician' ? navigate('/doctors') : navigate('/doctors/General physician')} className={`w-full rounded-lg border px-4 py-3 text-left transition-colors focus:outline-none focus:ring-2 focus:ring-primary ${speciality === 'General physician' ? 'border-primary bg-primary text-white' : 'border-border bg-surface text-body hover:border-primary hover:text-primary'}`}>General physician</button>
          <button type='button' onClick={() => speciality === 'Gynecologist' ? navigate('/doctors') : navigate('/doctors/Gynecologist')} className={`w-full rounded-lg border px-4 py-3 text-left transition-colors focus:outline-none focus:ring-2 focus:ring-primary ${speciality === 'Gynecologist' ? 'border-primary bg-primary text-white' : 'border-border bg-surface text-body hover:border-primary hover:text-primary'}`}>Gynecologist</button>
          <button type='button' onClick={() => speciality === 'Dermatologist' ? navigate('/doctors') : navigate('/doctors/Dermatologist')} className={`w-full rounded-lg border px-4 py-3 text-left transition-colors focus:outline-none focus:ring-2 focus:ring-primary ${speciality === 'Dermatologist' ? 'border-primary bg-primary text-white' : 'border-border bg-surface text-body hover:border-primary hover:text-primary'}`}>Dermatologist</button>
          <button type='button' onClick={() => speciality === 'Pediatricians' ? navigate('/doctors') : navigate('/doctors/Pediatricians')} className={`w-full rounded-lg border px-4 py-3 text-left transition-colors focus:outline-none focus:ring-2 focus:ring-primary ${speciality === 'Pediatricians' ? 'border-primary bg-primary text-white' : 'border-border bg-surface text-body hover:border-primary hover:text-primary'}`}>Pediatricians</button>
          <button type='button' onClick={() => speciality === 'Neurologist' ? navigate('/doctors') : navigate('/doctors/Neurologist')} className={`w-full rounded-lg border px-4 py-3 text-left transition-colors focus:outline-none focus:ring-2 focus:ring-primary ${speciality === 'Neurologist' ? 'border-primary bg-primary text-white' : 'border-border bg-surface text-body hover:border-primary hover:text-primary'}`}>Neurologist</button>
          <button type='button' onClick={() => speciality === 'Gastroenterologist' ? navigate('/doctors') : navigate('/doctors/Gastroenterologist')} className={`w-full rounded-lg border px-4 py-3 text-left transition-colors focus:outline-none focus:ring-2 focus:ring-primary ${speciality === 'Gastroenterologist' ? 'border-primary bg-primary text-white' : 'border-border bg-surface text-body hover:border-primary hover:text-primary'}`}>Gastroenterologist</button>
        </div>
        <div className='grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {filterDoc.map((item, index) => (
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
      </div>
    </div>
  )
}

export default Doctors