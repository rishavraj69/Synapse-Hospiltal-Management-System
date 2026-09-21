import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const MyAppointments = () => {

    const { backendUrl, token } = useContext(AppContext)
    const navigate = useNavigate()

    const [appointments, setAppointments] = useState([])
    const [payment, setPayment] = useState('')

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    // Function to format the date eg. ( 20_01_2000 => 20 Jan 2000 )
    const slotDateFormat = (slotDate) => {
        const dateArray = slotDate.split('_')
        return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
    }

    // Getting User Appointments Data Using API
    const getUserAppointments = async () => {
        try {

            const { data } = await axios.get(backendUrl + '/api/user/appointments', { headers: { token } })
            setAppointments(data.appointments.reverse())

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    // Function to cancel appointment Using API
    const cancelAppointment = async (appointmentId) => {

        try {

            const { data } = await axios.post(backendUrl + '/api/user/cancel-appointment', { appointmentId }, { headers: { token } })

            if (data.success) {
                toast.success(data.message)
                getUserAppointments()
            } else {
                toast.error(data.message)
            }   

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }

    }

    const initPay = (order) => {
        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: order.amount,
            currency: order.currency,
            name: 'Appointment Payment',
            description: "Appointment Payment",
            order_id: order.id,
            receipt: order.receipt,
            handler: async (response) => {

                console.log(response)

                try {
                    const { data } = await axios.post(backendUrl + "/api/user/verifyRazorpay", response, { headers: { token } });
                    if (data.success) {
                        navigate('/my-appointments')
                        getUserAppointments()
                    }
                } catch (error) {
                    console.log(error)
                    toast.error(error.message)
                }
            }
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    // Function to make payment using razorpay
    const appointmentRazorpay = async (appointmentId) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/user/payment-razorpay', { appointmentId }, { headers: { token } })
            if (data.success) {
                initPay(data.order)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    // Function to make payment using stripe
    const appointmentStripe = async (appointmentId) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/user/payment-stripe', { appointmentId }, { headers: { token } })
            if (data.success) {
                const { session_url } = data
                window.location.replace(session_url)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }



    useEffect(() => {
        if (token) {
            getUserAppointments()
        }
    }, [token])

    return (
        <div className='bg-background py-8 text-body sm:py-10'>
            <div className='mx-auto max-w-5xl'>
                <div className='mb-8'>
                    <p className='text-3xl font-semibold text-heading'>My Appointments</p>
                    <p className='mt-2 text-sm leading-relaxed text-body'>View and manage your upcoming appointments in one place.</p>
                </div>
                <div className='flex flex-col gap-5'>
                    {appointments.length === 0
                        ? <div className='rounded-2xl border border-border bg-surface px-6 py-14 text-center shadow-sm'>
                            <p className='text-lg font-semibold text-heading'>No appointments yet</p>
                            <p className='mt-2 text-sm text-body'>You currently have no appointments scheduled.</p>
                            <button onClick={() => navigate('/doctors')} className='mt-6 rounded-full bg-primary px-7 py-2.5 font-semibold text-white transition-colors hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'>Find a doctor</button>
                        </div>
                        : appointments.map((item, index) => (
                            <article key={index} className='grid gap-5 rounded-2xl border border-border bg-surface p-4 shadow-sm transition-shadow duration-300 hover:shadow-md sm:grid-cols-[160px_1fr] sm:p-5 lg:grid-cols-[180px_1fr_auto]'>
                                <div className='flex justify-center sm:block'>
                                    <img className='h-40 w-full max-w-[180px] rounded-xl bg-primary-light object-cover sm:h-44' src={item.docData.image} alt={item.docData.name} />
                                </div>
                                <div className='text-sm text-body'>
                                    <p className='text-lg font-semibold text-heading'>{item.docData.name}</p>
                                    <p className='mt-1 font-medium text-primary'>{item.docData.speciality}</p>
                                    <div className='mt-5 space-y-1.5'>
                                        <p className='font-medium text-heading'>Address</p>
                                        <p>{item.docData.address.line1}</p>
                                        <p>{item.docData.address.line2}</p>
                                    </div>
                                    <p className='mt-5'><span className='font-medium text-heading'>Date &amp; Time</span><span className='mx-2 text-border'>|</span>{slotDateFormat(item.slotDate)} <span className='text-border'>|</span> {item.slotTime}</p>
                                </div>
                                <div className='flex flex-col justify-end gap-2 text-center text-sm sm:col-span-2 lg:col-span-1 lg:min-w-48'>
                                    {!item.cancelled && !item.payment && !item.isCompleted && payment !== item._id && <button onClick={() => setPayment(item._id)} className='rounded-lg border border-primary px-4 py-2 text-primary transition-colors duration-300 hover:bg-primary hover:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'>Pay Online</button>}
                                    {!item.cancelled && !item.payment && !item.isCompleted && payment === item._id && <button onClick={() => appointmentStripe(item._id)} className='flex items-center justify-center rounded-lg border border-border px-4 py-2 transition-colors duration-300 hover:border-primary hover:bg-primary-light focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'><img className='max-h-5 max-w-20' src={assets.stripe_logo} alt="Pay with Stripe" /></button>}
                                    {!item.cancelled && !item.payment && !item.isCompleted && payment === item._id && <button onClick={() => appointmentRazorpay(item._id)} className='flex items-center justify-center rounded-lg border border-border px-4 py-2 transition-colors duration-300 hover:border-primary hover:bg-primary-light focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'><img className='max-h-5 max-w-20' src={assets.razorpay_logo} alt="Pay with Razorpay" /></button>}
                                    {!item.cancelled && item.payment && !item.isCompleted && <button className='rounded-lg border border-primary-light bg-primary-light px-4 py-2 text-primary'>Paid</button>}

                                    {item.isCompleted && <button className='rounded-lg border border-success px-4 py-2 text-success'>Completed</button>}

                                    {!item.cancelled && !item.isCompleted && <button onClick={() => cancelAppointment(item._id)} className='rounded-lg border border-border px-4 py-2 text-body transition-colors duration-300 hover:border-red-600 hover:bg-red-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2'>Cancel appointment</button>}
                                    {item.cancelled && !item.isCompleted && <button className='rounded-lg border border-red-500 px-4 py-2 text-red-500'>Appointment cancelled</button>}
                                </div>
                            </article>
                        ))}
                </div>
            </div>
        </div>
    )
}

export default MyAppointments
