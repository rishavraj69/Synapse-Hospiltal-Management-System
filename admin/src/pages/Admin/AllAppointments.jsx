import { useContext, useEffect } from 'react'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'

const AllAppointments = () => {

  const { aToken, appointments, cancelAppointment, getAllAppointments } = useContext(AdminContext)
  const { slotDateFormat, calculateAge, currency } = useContext(AppContext)

  useEffect(() => {
    if (aToken) {
      getAllAppointments()
    }
  }, [aToken])

  return (
    <main className='min-w-0 flex-1 p-4 sm:p-6 lg:p-8'>
      <div className='mx-auto max-w-7xl'>
        <header className='mb-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
          <div>
            <p className='mb-1.5 text-xs font-semibold uppercase tracking-wider text-primary'>Appointment management</p>
            <h1 className='text-2xl font-semibold tracking-tight text-heading sm:text-3xl'>All Appointments</h1>
            <p className='mt-1 text-sm text-muted'>Monitor, review, and manage all scheduled patient consultations.</p>
          </div>
          {appointments && appointments.length > 0 && (
            <div className='flex items-center gap-2'>
              <span className='inline-flex items-center rounded-lg border border-border bg-surface px-3 py-1.5 text-xs font-medium text-body shadow-sm'>
                Total Bookings: <strong className='ml-1.5 font-semibold text-heading'>{appointments.length}</strong>
              </span>
            </div>
          )}
        </header>

        {appointments && appointments.length > 0 ? (
          <section className='overflow-hidden rounded-xl border border-border bg-surface shadow-sm' aria-labelledby='appointments-heading'>
            <h2 id='appointments-heading' className='sr-only'>Appointments list</h2>

            {/* Desktop & Tablet Table */}
            <div className='hidden max-h-[calc(100vh-12rem)] overflow-y-auto sm:block'>
              <table className='w-full border-collapse text-left text-sm'>
                <thead className='sticky top-0 z-10 border-b border-border bg-slate-50 text-xs font-semibold uppercase tracking-wider text-muted'>
                  <tr>
                    <th scope='col' className='py-3.5 pl-6 pr-3 text-center w-12'>#</th>
                    <th scope='col' className='px-4 py-3.5'>Patient</th>
                    <th scope='col' className='px-4 py-3.5 text-center'>Age</th>
                    <th scope='col' className='px-4 py-3.5'>Date & Time</th>
                    <th scope='col' className='px-4 py-3.5'>Doctor</th>
                    <th scope='col' className='px-4 py-3.5'>Fees</th>
                    <th scope='col' className='py-3.5 pl-4 pr-6 text-center'>Action</th>
                  </tr>
                </thead>
                <tbody className='divide-y divide-border text-body'>
                  {appointments.map((item, index) => (
                    <tr key={item._id || index} className='transition-colors hover:bg-slate-50/70'>
                      <td className='py-4 pl-6 pr-3 text-center text-xs font-medium text-muted'>
                        {index + 1}
                      </td>
                      <td className='px-4 py-4'>
                        <div className='flex items-center gap-3'>
                          <img
                            src={item.userData.image}
                            alt={item.userData.name}
                            className='h-9 w-9 shrink-0 rounded-full border border-border bg-slate-100 object-cover'
                          />
                          <span className='font-medium text-heading'>{item.userData.name}</span>
                        </div>
                      </td>
                      <td className='px-4 py-4 text-center text-sm text-body'>
                        {calculateAge(item.userData.dob)}
                      </td>
                      <td className='px-4 py-4 text-sm'>
                        <p className='font-medium text-heading'>{slotDateFormat(item.slotDate)}</p>
                        <p className='text-xs text-muted'>{item.slotTime}</p>
                      </td>
                      <td className='px-4 py-4'>
                        <div className='flex items-center gap-3'>
                          <img
                            src={item.docData.image}
                            alt={item.docData.name}
                            className='h-9 w-9 shrink-0 rounded-full border border-border bg-primary-light object-cover'
                          />
                          <span className='font-medium text-heading'>{item.docData.name}</span>
                        </div>
                      </td>
                      <td className='px-4 py-4 font-semibold text-heading'>
                        {currency}{item.amount}
                      </td>
                      <td className='py-4 pl-4 pr-6 text-center'>
                        {item.cancelled ? (
                          <span className='inline-flex items-center rounded-full bg-red-50 px-2.5 py-1 text-xs font-medium text-red-600 border border-red-100'>
                            Cancelled
                          </span>
                        ) : item.isCompleted ? (
                          <span className='inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 border border-emerald-100'>
                            Completed
                          </span>
                        ) : (
                          <button
                            type='button'
                            onClick={() => cancelAppointment(item._id)}
                            className='inline-flex h-8 w-8 items-center justify-center rounded-lg transition-colors hover:bg-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2'
                            aria-label={`Cancel appointment for ${item.userData.name}`}
                            title='Cancel appointment'
                          >
                            <img src={assets.cancel_icon} className='h-5 w-5 object-contain' alt='' />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card List (< sm screens) */}
            <div className='divide-y divide-border sm:hidden max-h-[calc(100vh-12rem)] overflow-y-auto'>
              {appointments.map((item, index) => (
                <article key={item._id || index} className='p-4 space-y-3 bg-surface'>
                  <div className='flex items-center justify-between gap-2'>
                    <div className='flex items-center gap-2.5 min-w-0'>
                      <img
                        src={item.userData.image}
                        alt={item.userData.name}
                        className='h-9 w-9 shrink-0 rounded-full border border-border bg-slate-100 object-cover'
                      />
                      <div className='min-w-0'>
                        <p className='truncate text-sm font-semibold text-heading'>{item.userData.name}</p>
                        <p className='text-xs text-muted'>Age: {calculateAge(item.userData.dob)}</p>
                      </div>
                    </div>
                    <div>
                      {item.cancelled ? (
                        <span className='inline-flex items-center rounded-full bg-red-50 px-2 py-0.5 text-xs font-medium text-red-600 border border-red-100'>
                          Cancelled
                        </span>
                      ) : item.isCompleted ? (
                        <span className='inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700 border border-emerald-100'>
                          Completed
                        </span>
                      ) : (
                        <button
                          type='button'
                          onClick={() => cancelAppointment(item._id)}
                          className='inline-flex h-8 w-8 items-center justify-center rounded-lg transition-colors hover:bg-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary'
                          aria-label={`Cancel appointment for ${item.userData.name}`}
                          title='Cancel appointment'
                        >
                          <img src={assets.cancel_icon} className='h-5 w-5 object-contain' alt='' />
                        </button>
                      )}
                    </div>
                  </div>

                  <div className='rounded-lg bg-slate-50 p-3 space-y-2 text-xs'>
                    <div className='flex items-center justify-between'>
                      <span className='text-muted font-medium'>Doctor:</span>
                      <div className='flex items-center gap-1.5 font-medium text-heading'>
                        <img
                          src={item.docData.image}
                          alt={item.docData.name}
                          className='h-5 w-5 rounded-full object-cover bg-primary-light'
                        />
                        <span>{item.docData.name}</span>
                      </div>
                    </div>

                    <div className='flex items-center justify-between'>
                      <span className='text-muted font-medium'>Schedule:</span>
                      <span className='font-medium text-heading'>{slotDateFormat(item.slotDate)} • {item.slotTime}</span>
                    </div>

                    <div className='flex items-center justify-between border-t border-slate-200/70 pt-2'>
                      <span className='text-muted font-medium'>Fee:</span>
                      <span className='font-semibold text-heading'>{currency}{item.amount}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ) : (
          <div className='flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-surface p-12 text-center'>
            <div className='flex h-12 w-12 items-center justify-center rounded-full bg-primary-light text-primary'>
              <img className='h-6 w-6 object-contain opacity-70' src={assets.appointments_icon} alt='' />
            </div>
            <h3 className='mt-4 text-base font-semibold text-heading'>No appointments found</h3>
            <p className='mt-1 max-w-sm text-sm text-muted'>
              There are currently no patient appointments scheduled in the system.
            </p>
          </div>
        )}
      </div>
    </main>
  )
}

export default AllAppointments