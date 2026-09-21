import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div className='bg-background py-8 text-body sm:py-10'>
        <div className='mb-10 text-center'>
            <h1 className='text-3xl font-semibold text-heading sm:text-4xl'>About Synapse</h1>
        </div>
        <div className='grid gap-8 rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-8 md:grid-cols-[minmax(280px,360px)_1fr] md:items-center'>
            <img className='h-full max-h-[360px] w-full rounded-xl object-cover' src={assets.about_image} alt='Synapse healthcare team' />
            <div className='flex flex-col justify-center gap-6 text-sm leading-relaxed text-body'>
                <p>Welcome To Synapse, Your Trusted Partner In Managing Your HealthCare Needs Conveniently And Efficiently.
                    At Synapse, We Understand The Challenges Individuals Face When It Comes To Scheduling Doctor Appointments And Managing Their Health Records.
                </p>
                <p>Synapse Is Commited To Excellence In Healthcare Technology.
                    We Continously Strive To Enhance Our Platform, Integrating The Latest Advancements To Improve User Experience And Deliver Superior Service.
                    Whether You're Booking Your First Appointment Or Managing Ongoing Care, Synapse Is Here To Support You Every Step Of The Way.
                </p>
                <h2 className='font-semibold text-heading'>Our Vision</h2>
                <p>Our Vision At Synapse Is To Create A Seamless HealthCare Experience For Every User.
                    We Aim To Bridge The Gap Between Patients And HealthCare Providers, Making It Easier For You To Access The Care You Need, When You Need It.
                </p>
            </div>
        </div>
        <div className='mb-5 mt-12'>
            <h2 className='text-2xl font-semibold text-heading'>Why choose us</h2>
        </div>
        <div className='mb-12 grid gap-5 md:grid-cols-3'>
            <div className='rounded-xl border border-border bg-surface p-6 text-sm text-body shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-md'>
                <h3 className='mb-4 font-semibold text-heading'>Efficiency</h3>
                <p>Streamlined Appointment Scheduling That Fits Into Your Busy Lifestyle.</p>
            </div>
            <div className='rounded-xl border border-border bg-surface p-6 text-sm text-body shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-md'>
                <h3 className='mb-4 font-semibold text-heading'>Convenience</h3>
                <p>Access To A Network Of Trusted HealthCare Professionals In Your Area.</p>
            </div>
            <div className='rounded-xl border border-border bg-surface p-6 text-sm text-body shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-md'>
                <h3 className='mb-4 font-semibold text-heading'>Personalization</h3>
                <p>Tailored Recommenations And Remainders To Help You Stay On Top Of Your Health.</p>
            </div>
        </div>
    </div>
  )
}

export default About
