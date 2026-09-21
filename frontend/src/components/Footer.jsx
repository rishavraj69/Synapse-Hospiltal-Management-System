import React from 'react'
import { assets } from '../assets/assets'
import { Link, useNavigate } from 'react-router-dom'

const Footer = () => {
  const navigate = useNavigate()

  const handleNavigation = (event, path) => {
    event.preventDefault()
    navigate(path)
    setTimeout(() => window.scrollTo(0, 0), 100)
  }

  return (
    <footer className='mt-16 bg-background text-sm text-body sm:mt-20 md:mx-10'>
      <div className='grid gap-10 border-t border-border py-12 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr] lg:gap-16'>

        <div className='max-w-lg'>
          <img className='mb-5 w-40' src={assets.logo} alt="Synapse" />
              <p className='leading-6 text-body'>Find trusted healthcare professionals and book appointments with ease.</p>
        </div>

        <nav aria-label='Company' className='sm:justify-self-start'>
          <p className='mb-5 text-base font-semibold text-heading'>COMPANY</p>
          <ul className='flex flex-col gap-3 text-body'>
                <li><Link to='/' onClick={(event) => handleNavigation(event, '/')} className='block transition-colors hover:text-primary'>Home</Link></li>
                <li><Link to='/about' onClick={(event) => handleNavigation(event, '/about')} className='block transition-colors hover:text-primary'>About us</Link></li>
            <li className='transition-colors hover:text-primary'>Delivery</li>
            <li className='transition-colors hover:text-primary'>Privacy policy</li>
          </ul>
        </nav>

        <div>
          <p className='mb-5 text-base font-semibold text-heading'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-3 text-body'>
            <li>+1-212-456-7890</li>
            <li>synapse@gmail.com</li>
          </ul>
        </div>

      </div>

      <div className='border-t border-border'>
        <p className='py-5 text-center text-sm text-muted'>Copyright 2024 @ Synapse.com - All Right Reserved.</p>
      </div>

    </footer>
  )
}

export default Footer
