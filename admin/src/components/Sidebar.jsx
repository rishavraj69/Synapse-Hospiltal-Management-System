import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { NavLink } from 'react-router-dom'
import { DoctorContext } from '../context/DoctorContext'
import { AdminContext } from '../context/AdminContext'

const Sidebar = () => {

  const { dToken } = useContext(DoctorContext)
  const { aToken } = useContext(AdminContext)

  const navItemClass = ({ isActive }) => `group relative flex min-h-12 items-center gap-3 rounded-lg px-3 text-sm font-medium transition-colors duration-200 md:px-4 ${isActive
    ? 'bg-primary-light text-primary after:absolute after:right-0 after:top-2 after:h-8 after:w-1 after:rounded-l-full after:bg-primary'
    : 'text-body hover:bg-slate-50 hover:text-heading'} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2`

  const iconClass = 'h-5 w-5 shrink-0 object-contain opacity-70 transition-opacity duration-200 group-hover:opacity-100'

  return (
    <aside className='min-h-screen w-[4.75rem] shrink-0 border-r border-border bg-surface px-2 py-5 md:w-72 md:px-4'>
      {aToken && <ul className='space-y-2' aria-label='Admin navigation'>

        <NavLink to={'/admin-dashboard'} className={navItemClass}>
          <img className={iconClass} src={assets.home_icon} alt='' />
          <p className='hidden md:block'>Dashboard</p>
        </NavLink>
        <NavLink to={'/all-appointments'} className={navItemClass}>
          <img className={iconClass} src={assets.appointment_icon} alt='' />
          <p className='hidden md:block'>Appointments</p>
        </NavLink>
        <NavLink to={'/add-doctor'} className={navItemClass}>
          <img className={iconClass} src={assets.add_icon} alt='' />
          <p className='hidden md:block'>Add Doctor</p>
        </NavLink>
        <NavLink to={'/doctor-list'} className={navItemClass}>
          <img className={iconClass} src={assets.people_icon} alt='' />
          <p className='hidden md:block'>Doctors List</p>
        </NavLink>
      </ul>}

      {dToken && <ul className='space-y-2' aria-label='Doctor navigation'>
        <NavLink to={'/doctor-dashboard'} className={navItemClass}>
          <img className={iconClass} src={assets.home_icon} alt='' />
          <p className='hidden md:block'>Dashboard</p>
        </NavLink>
        <NavLink to={'/doctor-appointments'} className={navItemClass}>
          <img className={iconClass} src={assets.appointment_icon} alt='' />
          <p className='hidden md:block'>Appointments</p>
        </NavLink>
        <NavLink to={'/doctor-profile'} className={navItemClass}>
          <img className={iconClass} src={assets.people_icon} alt='' />
          <p className='hidden md:block'>Profile</p>
        </NavLink>
      </ul>}
    </aside>
  )
}

export default Sidebar