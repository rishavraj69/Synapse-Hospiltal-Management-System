import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div className='bg-background py-8 text-body sm:py-10'>

      <div className='mb-10 text-center'>
        <h1 className='text-3xl font-semibold text-heading sm:text-4xl'>Contact us</h1>
      </div>

      <div className='grid gap-8 rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-8 md:grid-cols-[minmax(280px,360px)_1fr] md:items-center'>
        <img className='h-full max-h-[360px] w-full rounded-xl object-cover' src={assets.contact_image} alt='Synapse contact office' />
        <div className='flex flex-col items-start gap-6 text-sm leading-relaxed'>
          <section>
            <h2 className='mb-2 text-base font-semibold text-heading'>Our office</h2>
            <p className='text-body'>54709 Willms Station <br /> Suite 350, Washington, USA</p>
          </section>
          <section>
            <h2 className='mb-2 text-base font-semibold text-heading'>Get in touch</h2>
            <p className='text-body'>Tel: (415) 555-0132 <br /> Email: synapse@gmail.com</p>
          </section>
          <section>
            <h2 className='mb-2 text-base font-semibold text-heading'>Careers at Synapse</h2>
            <p className='text-body'>Learn more about our teams and job openings.</p>
          </section>
          <button type='button' className='rounded-full border border-primary bg-surface px-7 py-2.5 text-sm font-medium text-primary transition-colors duration-300 hover:bg-primary hover:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'>Explore Jobs</button>
        </div>
      </div>

    </div>
  )
}

export default Contact
