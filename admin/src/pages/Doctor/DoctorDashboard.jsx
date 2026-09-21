import { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext'

const DoctorDashboard = () => {

  const { dToken, dashData, getDashData, cancelAppointment, completeAppointment } = useContext(DoctorContext)
  const { slotDateFormat, currency } = useContext(AppContext)

  useEffect(() => {
    if (dToken) {
      getDashData()
    }
  }, [dToken])

  return dashData && (
    <main className='min-w-0 flex-1 p-4 sm:p-6 lg:p-8'>
      <div className='mx-auto max-w-7xl'>
        <header className='mb-7'>
          <p className='mb-2 text-xs font-semibold uppercase tracking-wider text-primary'>Clinical overview</p>
          <h1 className='text-2xl font-semibold tracking-tight text-heading sm:text-3xl'>Doctor Dashboard</h1>
          <p className='mt-2 text-sm text-muted'>Overview of your clinical practice, patient appointments, and earnings.</p>
        </header>

        <section aria-labelledby='statistics-heading'>
          <h2 id='statistics-heading' className='sr-only'>Practice statistics</h2>
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-3'>
            {/* Earnings Card */}
            <div className='flex min-w-0 items-center gap-4 rounded-xl border border-border bg-surface p-5 shadow-sm transition-shadow hover:shadow-md'>
              <div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary-light'>
                <img className='h-7 w-7 object-contain' src={assets.earning_icon} alt='Earnings' />
              </div>
              <div className='min-w-0'>
                <p className='text-2xl font-semibold tracking-tight text-heading truncate'>
                  {currency} {dashData.earnings}
                </p>
                <p className='mt-1 text-sm text-muted'>Earnings</p>
              </div>
            </div>

            {/* Appointments Card */}
            <div className='flex min-w-0 items-center gap-4 rounded-xl border border-border bg-surface p-5 shadow-sm transition-shadow hover:shadow-md'>
              <div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary-light'>
                <img className='h-7 w-7 object-contain' src={assets.appointments_icon} alt='Appointments' />
              </div>
              <div className='min-w-0'>
                <p className='text-2xl font-semibold tracking-tight text-heading truncate'>
                  {dashData.appointments}
                </p>
                <p className='mt-1 text-sm text-muted'>Appointments</p>
              </div>
            </div>

            {/* Patients Card */}
            <div className='flex min-w-0 items-center gap-4 rounded-xl border border-border bg-surface p-5 shadow-sm transition-shadow hover:shadow-md'>
              <div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary-light'>
                <img className='h-7 w-7 object-contain' src={assets.patients_icon} alt='Patients' />
              </div>
              <div className='min-w-0'>
                <p className='text-2xl font-semibold tracking-tight text-heading truncate'>
                  {dashData.patients}
                </p>
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

          {dashData.latestAppointments && dashData.latestAppointments.length > 0 ? (
            <div className='divide-y divide-border'>
              {dashData.latestAppointments.slice(0, 5).map((item, index) => (
                <div
                  key={item._id || index}
                  className='flex flex-wrap items-center justify-between gap-3 px-5 py-4 transition-colors hover:bg-slate-50 sm:flex-nowrap sm:px-6'
                >
                  <div className='flex min-w-0 items-center gap-3.5'>
                    <img
                      className='h-10 w-10 shrink-0 rounded-full border border-border bg-slate-100 object-cover'
                      src={item.userData.image}
                      alt={item.userData.name}
                    />
                    <div className='min-w-0'>
                      <p className='truncate text-sm font-medium text-heading'>{item.userData.name}</p>
                      <p className='mt-0.5 text-xs text-muted'>Booking on {slotDateFormat(item.slotDate)}</p>
                    </div>
                  </div>

                  <div className='flex items-center gap-2'>
                    {item.cancelled ? (
                      <span className='inline-flex items-center rounded-full bg-red-50 px-3 py-1 text-xs font-medium text-red-600 border border-red-100'>
                        Cancelled
                      </span>
                    ) : item.isCompleted ? (
                      <span className='inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 border border-emerald-100'>
                        Completed
                      </span>
                    ) : (
                      <div className='flex items-center gap-1.5'>
                        <button
                          type='button'
                          onClick={() => cancelAppointment(item._id)}
                          className='flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:bg-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2'
                          aria-label={`Cancel appointment for ${item.userData.name}`}
                          title='Cancel appointment'
                        >
                          <img className='h-5 w-5 object-contain' src={assets.cancel_icon} alt='' />
                        </button>
                        <button
                          type='button'
                          onClick={() => completeAppointment(item._id)}
                          className='flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:bg-emerald-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2'
                          aria-label={`Mark appointment completed for ${item.userData.name}`}
                          title='Complete appointment'
                        >
                          <img className='h-5 w-5 object-contain' src={assets.tick_icon} alt='' />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className='p-8 text-center text-sm text-muted'>
              No recent bookings found.
            </div>
          )}
        </section>
      </div>
    </main>
  )
}

export default DoctorDashboard