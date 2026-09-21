import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import RelatedDoctors from '../components/RelatedDoctors'
import axios from 'axios'
import { toast } from 'react-toastify'

const Appointment = () => {

    const { docId } = useParams()
    const { doctors, currencySymbol, backendUrl, token, getDoctosData } = useContext(AppContext)
    const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

    const [docInfo, setDocInfo] = useState(false)
    const [docSlots, setDocSlots] = useState([])
    const [slotIndex, setSlotIndex] = useState(0)
    const [slotTime, setSlotTime] = useState('')

    const navigate = useNavigate()

    const fetchDocInfo = async () => {
        const docInfo = doctors.find((doc) => doc._id === docId)
        setDocInfo(docInfo)
    }

    const getAvailableSolts = async () => {

        setDocSlots([])

        // getting current date
        let today = new Date()

        for (let i = 0; i < 7; i++) {

            // getting date with index 
            let currentDate = new Date(today)
            currentDate.setDate(today.getDate() + i)

            // setting end time of the date with index
            let endTime = new Date()
            endTime.setDate(today.getDate() + i)
            endTime.setHours(21, 0, 0, 0)

            // setting hours 
            if (today.getDate() === currentDate.getDate()) {
                currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
                currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
            } else {
                currentDate.setHours(10)
                currentDate.setMinutes(0)
            }

            let timeSlots = [];


            while (currentDate < endTime) {
                let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                let day = currentDate.getDate()
                let month = currentDate.getMonth() + 1
                let year = currentDate.getFullYear()

                const slotDate = day + "_" + month + "_" + year
                const slotTime = formattedTime

                const isSlotAvailable = docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(slotTime) ? false : true

                if (isSlotAvailable) {

                    // Add slot to array
                    timeSlots.push({
                        datetime: new Date(currentDate),
                        time: formattedTime
                    })
                }

                // Increment current time by 30 minutes
                currentDate.setMinutes(currentDate.getMinutes() + 30);
            }

            setDocSlots(prev => ([...prev, timeSlots]))

        }

    }

    const bookAppointment = async () => {

        if (!token) {
            toast.warning('Login to book appointment')
            return navigate('/login')
        }

        const date = docSlots[slotIndex][0].datetime

        let day = date.getDate()
        let month = date.getMonth() + 1
        let year = date.getFullYear()

        const slotDate = day + "_" + month + "_" + year

        try {

            const { data } = await axios.post(backendUrl + '/api/user/book-appointment', { docId, slotDate, slotTime }, { headers: { token } })
            if (data.success) {
                toast.success(data.message)
                getDoctosData()
                navigate('/my-appointments')
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }

    }

    useEffect(() => {
        if (doctors.length > 0) {
            fetchDocInfo()
        }
    }, [doctors, docId])

    useEffect(() => {
        if (docInfo) {
            getAvailableSolts()
        }
    }, [docInfo])

    return docInfo ? (
        <div className='bg-background py-6 text-body sm:py-8'>
            <div className='mb-6'>
                <p className='text-3xl font-semibold text-heading'>Book an appointment</p>
                <p className='mt-2 text-sm text-body'>Review your doctor details and choose a convenient time.</p>
            </div>

            {/* ---------- Doctor Details ----------- */}
            <div className='grid gap-6 lg:grid-cols-[minmax(240px,320px)_1fr]'>
                <div className='overflow-hidden rounded-2xl border border-border bg-primary-light shadow-sm'>
                    <img className='h-full max-h-[360px] w-full object-cover object-top' src={docInfo.image} alt={docInfo.name} />
                </div>

                <div className='flex flex-col justify-center rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8'>
                    {/* ----- Doc Info : name, degree, experience ----- */}
                    <p className='flex items-center gap-2 text-2xl font-semibold text-heading sm:text-3xl'>{docInfo.name} <img className='w-5' src={assets.verified_icon} alt="Verified doctor" /></p>
                    <div className='mt-2 flex flex-wrap items-center gap-2 text-body'>
                        <p>{docInfo.degree} - {docInfo.speciality}</p>
                        <span className='rounded-full border border-primary px-2.5 py-1 text-xs font-medium text-primary'>{docInfo.experience}</span>
                    </div>

                    {/* ----- Doc About ----- */}
                    <div>
                        <p className='mt-6 flex items-center gap-1 text-sm font-semibold text-heading'>About <img className='w-3' src={assets.info_icon} alt="About this doctor" /></p>
                        <p className='mt-2 max-w-[700px] text-sm leading-relaxed text-body'>{docInfo.about}</p>
                    </div>

                    <p className='mt-5 font-medium text-body'>Appointment fee: <span className='text-heading'>{currencySymbol}{docInfo.fees}</span> </p>
                </div>
            </div>

            {/* Booking slots */}
            <div className='mt-8 rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-7 lg:mt-10'>
                <p className='text-lg font-semibold text-heading'>Booking slots</p>
                <div className='mt-4 flex w-full items-center gap-3 overflow-x-auto pb-2'>
                    {docSlots.length && docSlots.map((item, index) => (
                        <button type='button' onClick={() => setSlotIndex(index)} key={index} className={`min-w-16 rounded-xl px-3 py-4 text-center transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${slotIndex === index ? 'bg-primary text-white' : 'border border-border bg-surface text-body hover:border-primary hover:text-primary'}`}>
                            <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                            <p>{item[0] && item[0].datetime.getDate()}</p>
                        </button>
                    ))}
                </div>

                <div className='mt-5 flex w-full items-center gap-3 overflow-x-auto pb-2'>
                    {docSlots.length && docSlots[slotIndex].map((item, index) => (
                        <button type='button' onClick={() => setSlotTime(item.time)} key={index} className={`flex-shrink-0 rounded-full px-5 py-2.5 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${item.time === slotTime ? 'bg-primary text-white' : 'border border-border bg-surface text-muted hover:border-primary hover:text-primary'}`}>{item.time.toLowerCase()}</button>
                    ))}
                </div>

                <button onClick={bookAppointment} className='my-6 rounded-full bg-primary px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 sm:px-12'>Book an appointment</button>
            </div>

            {/* Listing Releated Doctors */}
            <RelatedDoctors speciality={docInfo.speciality} docId={docId} />
        </div>
    ) : null
}

export default Appointment
