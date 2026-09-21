import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Navbar = () => {

  const navigate = useNavigate()

  const [showMenu, setShowMenu] = useState(false)
  const { token, setToken, userData } = useContext(AppContext)

  const logout = () => {
    localStorage.removeItem('token')
    setToken(false)
    navigate('/login')
  }

  return (
    <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-border'>
      <img onClick={() => navigate('/')} className='w-40 sm:w-44 cursor-pointer' src={assets.logo} alt="" />
      <ul className='md:flex items-start gap-7 font-medium text-heading hidden'>
        <NavLink to='/' >
          <li className='py-1 transition-colors hover:text-primary'>Home</li>
          <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
        </NavLink>
        <NavLink to='/doctors' >
          <li className='py-1 transition-colors hover:text-primary'>Doctors</li>
          <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
        </NavLink>
        <NavLink to='/about' >
          <li className='py-1 transition-colors hover:text-primary'>About</li>
          <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
        </NavLink>
        <NavLink to='/contact' >
          <li className='py-1 transition-colors hover:text-primary'>Contact</li>
          <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
        </NavLink>
      </ul>

      <div className='flex items-center gap-4'>
        {
          token && userData
            ? <div className='flex items-center gap-2 cursor-pointer group relative rounded-full p-1 transition-colors hover:bg-primary-light'>
              <img className='w-8 rounded-full' src={userData.image} alt="" />
              <img className='w-2.5' src={assets.dropdown_icon} alt="" />
              <div className='absolute top-0 right-0 pt-12 text-sm font-medium text-body z-20 hidden group-hover:block'>
                <div className='min-w-48 bg-surface border border-border rounded-lg shadow-lg flex flex-col gap-1 p-2'>
                  <p onClick={() => navigate('/my-profile')} className='px-3 py-2 rounded-md hover:bg-primary-light hover:text-primary cursor-pointer'>My Profile</p>
                  <p onClick={() => navigate('/my-appointments')} className='px-3 py-2 rounded-md hover:bg-primary-light hover:text-primary cursor-pointer'>My Appointments</p>
                  <p onClick={logout} className='px-3 py-2 rounded-md hover:bg-primary-light hover:text-primary cursor-pointer'>Logout</p>
                </div>
              </div>
            </div>
            : <button onClick={() => navigate('/login')} className='bg-primary text-white px-6 py-2.5 rounded-full font-semibold hidden md:block transition-colors hover:bg-primary-dark'>Create account</button>
        }
        <img onClick={() => setShowMenu(true)} className='w-6 cursor-pointer md:hidden' src={assets.menu_icon} alt="" />

        {/* ---- Mobile Menu ---- */}
        <div className={`md:hidden ${showMenu ? 'fixed w-full' : 'h-0 w-0'} right-0 top-0 bottom-0 z-20 overflow-hidden bg-surface transition-all`}>
          <div className='flex items-center justify-between px-5 py-6'>
            <img onClick={() => navigate('/')} src={assets.logo} className='w-36 cursor-pointer' alt="" />
            <img onClick={() => setShowMenu(false)} src={assets.cross_icon} className='w-7 cursor-pointer' alt="" />
          </div>
          <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium text-heading'>
            <NavLink onClick={() => setShowMenu(false)} to='/'><p className='px-6 py-3 rounded-full inline-block'>Home</p></NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/doctors' ><p className='px-6 py-3 rounded-full inline-block'>Doctors</p></NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/about' ><p className='px-6 py-3 rounded-full inline-block'>About</p></NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/contact' ><p className='px-6 py-3 rounded-full inline-block'>Contact</p></NavLink>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar