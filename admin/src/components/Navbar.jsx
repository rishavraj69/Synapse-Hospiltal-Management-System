import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { DoctorContext } from '../context/DoctorContext'
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {

  const { dToken, setDToken } = useContext(DoctorContext)
  const { aToken, setAToken } = useContext(AdminContext)

  const navigate = useNavigate()

  const logout = () => {
    navigate('/')
    dToken && setDToken('')
    dToken && localStorage.removeItem('dToken')
    aToken && setAToken('')
    aToken && localStorage.removeItem('aToken')
  }

  return (
    <div className='flex items-center justify-between border-b border-border bg-surface px-4 py-3 sm:px-8 lg:px-10'>
      <div className='flex min-w-0 items-center gap-3 text-xs'>
        <img onClick={() => navigate('/')} className='w-32 cursor-pointer sm:w-40' src={assets.admin_logo} alt='Synapse dashboard' />
        <p className='rounded-full border border-primary-light bg-primary-light px-2.5 py-1 font-medium text-primary'>{aToken ? 'Admin' : 'Doctor'}</p>
      </div>
      <button onClick={() => logout()} className='rounded-full bg-primary px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 sm:px-8'>Logout</button>
    </div>
  )
}

export default Navbar