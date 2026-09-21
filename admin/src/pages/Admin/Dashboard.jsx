import React, { useContext, useEffect } from 'react'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'

const Dashboard = () => {

  const { aToken, getDashData, cancelAppointment, dashData } = useContext(AdminContext)
  const { slotDateFormat } = useContext(AppContext)

  useEffect(() => {
    if (aToken) {
      getDashData()
    }
  }, [aToken])

  return dashData && (
    <main className='min-w-0 flex-1 p-4 sm:p-6 lg:p-8'>
      <div className='mx-auto max-w-7xl'>
        <header className='mb-7'>
          <p className='mb-2 text-xs font-semibold uppercase tracking-wider text-primary'>Synapse administration</p>
          <h1 className='text-2xl font-semibold tracking-tight text-heading sm:text-3xl'>Dashboard</h1>
          <p className='mt-2 text-sm text-muted'>Overview of your healthcare platform.</p>
        </header>

        <section aria-labelledby='statistics-heading'>
          <h2 id='statistics-heading' className='sr-only'>Platform statistics</h2>
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-3'>
            <div className='flex min-w-0 items-center gap-4 rounded-xl border border-border bg-surface p-5 shadow-sm transition-shadow hover:shadow-md'>
              <div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary-light'>
                <img className='h-7 w-7 object-contain' src={assets.doctor_icon} alt='Doctors' />
              </div>
              <div>
                <p className='text-2xl font-semibold tracking-tight text-heading'>{dashData.doctors}</p>
                <p className='mt-1 text-sm text-muted'>Doctors</p>
              </div>
            </div>
            <div className='flex min-w-0 items-center gap-4 rounded-xl border border-border bg-surface p-5 shadow-sm transition-shadow hover:shadow-md'>
              <div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary-light'>
                <img className='h-7 w-7 object-contain' src={assets.appointments_icon} alt='Appointments' />
              </div>
              <div>
                <p className='text-2xl font-semibold tracking-tight text-heading'>{dashData.appointments}</p>
                <p className='mt-1 text-sm text-muted'>Appointments</p>
              </div>
            </div>
            <div className='flex min-w-0 items-center gap-4 rounded-xl border border-border bg-surface p-5 shadow-sm transition-shadow hover:shadow-md'>
              <div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary-light'>
                <img className='h-7 w-7 object-contain' src={assets.patients_icon} alt='Patients' />
              </div>
              <div>
                <p className='text-2xl font-semibold tracking-tight text-heading'>{dashData.patients}</p>
                <p className='mt-1 text-sm text-muted'>Patients</p>
              </div>
            </div>
          </div>
        </section>

        <section className='mt-8 overflow-hidden rounded-xl border border-border bg-surface shadow-sm' aria-labelledby='bookings-heading'>
          <div className='flex items-center gap-3 border-b border-border px-5 py-4 sm:px-6'>
            <div className='flex h-9 w-9 items-center justify-center rounded-lg bg-primary-light'>
              <img className='h-5 w-5 object-contain' src={assets.list_icon} alt='' />
            </div>
            <h2 id='bookings-heading' className='font-semibold text-heading'>Latest Bookings</h2>
          </div>

          <div className='divide-y divide-border'>
            {dashData.latestAppointments.slice(0, 5).map((item, index) => (
              <div className='flex flex-wrap items-center gap-3 px-5 py-4 transition-colors hover:bg-slate-50 sm:flex-nowrap sm:px-6' key={index}>
                <img className='h-10 w-10 shrink-0 rounded-full object-cover' src={item.docData.image} alt={item.docData.name} />
                <div className='min-w-0 flex-1 text-sm'>
                  <p className='truncate font-medium text-heading'>{item.docData.name}</p>
                  <p className='mt-1 text-xs text-muted'>Booking on {slotDateFormat(item.slotDate)}</p>
                </div>
                {item.cancelled ? <p className='rounded-full bg-red-50 px-3 py-1 text-xs font-medium text-red-600'>Cancelled</p> : item.isCompleted ? <p className='rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700'>Completed</p> : <button type='button' onClick={() => cancelAppointment(item._id)} className='flex min-h-10 min-w-10 items-center justify-center rounded-lg transition-colors hover:bg-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2' aria-label={`Cancel appointment for ${item.docData.name}`}><img className='h-5 w-5 object-contain' src={assets.cancel_icon} alt='' /></button>}
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}

export default Dashboard