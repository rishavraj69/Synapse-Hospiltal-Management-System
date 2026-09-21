import { useContext, useEffect } from 'react'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../context/AdminContext'

const DoctorsList = () => {

  const { doctors, changeAvailability, aToken, getAllDoctors } = useContext(AdminContext)

  useEffect(() => {
    if (aToken) {
      getAllDoctors()
    }
  }, [aToken])

  return (
    <main className='min-w-0 flex-1 p-4 sm:p-6 lg:p-8'>
      <div className='mx-auto max-w-7xl'>
        <header className='mb-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
          <div>
            <p className='mb-1.5 text-xs font-semibold uppercase tracking-wider text-primary'>Care team directory</p>
            <h1 className='text-2xl font-semibold tracking-tight text-heading sm:text-3xl'>Doctors List</h1>
            <p className='mt-1 text-sm text-muted'>Manage your healthcare providers and real-time availability status.</p>
          </div>
          {doctors && doctors.length > 0 && (
            <div className='flex items-center gap-2'>
              <span className='inline-flex items-center rounded-lg border border-border bg-surface px-3 py-1.5 text-xs font-medium text-body shadow-sm'>
                Total Doctors: <strong className='ml-1.5 font-semibold text-heading'>{doctors.length}</strong>
              </span>
            </div>
          )}
        </header>

        <section className='max-h-[calc(100vh-12rem)] overflow-y-auto pr-1' aria-labelledby='doctor-directory-heading'>
          <h2 id='doctor-directory-heading' className='sr-only'>Doctor directory</h2>

          {doctors && doctors.length > 0 ? (
            <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4'>
              {doctors.map((item, index) => (
                <article
                  key={item._id || index}
                  className='group flex flex-col justify-between overflow-hidden rounded-xl border border-border bg-surface shadow-sm transition-all duration-200 hover:border-slate-300 hover:shadow-md'
                >
                  <div className='aspect-[4/3] w-full overflow-hidden bg-primary-light'>
                    <img
                      className='h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.03]'
                      src={item.image}
                      alt={item.name}
                    />
                  </div>

                  <div className='flex flex-1 flex-col justify-between p-4 sm:p-5'>
                    <div>
                      <h3 className='truncate text-base font-semibold text-heading'>{item.name}</h3>
                      <p className='mt-1 truncate text-sm text-muted'>{item.speciality}</p>
                    </div>

                    <div className='mt-5 flex items-center justify-between border-t border-border pt-3.5'>
                      <div className='flex items-center gap-1.5'>
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            item.available
                              ? 'border border-teal-100 bg-teal-50 text-primary'
                              : 'border border-slate-200 bg-slate-100 text-muted'
                          }`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${
                              item.available ? 'bg-primary' : 'bg-slate-400'
                            }`}
                          />
                          {item.available ? 'Available' : 'Unavailable'}
                        </span>
                      </div>

                      <label
                        htmlFor={`availability-${item._id}`}
                        className='relative inline-flex cursor-pointer items-center'
                        title={`Set ${item.name} availability`}
                      >
                        <input
                          id={`availability-${item._id}`}
                          type='checkbox'
                          checked={item.available}
                          onChange={() => changeAvailability(item._id)}
                          aria-label={`Toggle availability for ${item.name}`}
                          className='peer sr-only'
                        />
                        <div className="h-5 w-9 rounded-full bg-slate-200 transition-colors duration-200 after:absolute after:left-[2px] after:top-[2px] after:h-4 after:w-4 after:rounded-full after:bg-white after:shadow-sm after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2"></div>
                      </label>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className='flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-surface p-12 text-center'>
              <div className='flex h-12 w-12 items-center justify-center rounded-full bg-primary-light text-primary'>
                <img className='h-6 w-6 object-contain opacity-70' src={assets.doctor_icon} alt='' />
              </div>
              <h3 className='mt-4 text-base font-semibold text-heading'>No doctors found</h3>
              <p className='mt-1 max-w-sm text-sm text-muted'>
                There are currently no healthcare providers registered in the directory.
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  )
}

export default DoctorsList