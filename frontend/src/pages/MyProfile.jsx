import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const MyProfile = () => {

    const [isEdit, setIsEdit] = useState(false)

    const [image, setImage] = useState(false)

    const { token, backendUrl, userData, setUserData, loadUserProfileData } = useContext(AppContext)

    // Function to update user profile data using API
    const updateUserProfileData = async () => {

        try {

            const formData = new FormData();

            formData.append('name', userData.name)
            formData.append('phone', userData.phone)
            formData.append('address', JSON.stringify(userData.address))
            formData.append('gender', userData.gender)
            formData.append('dob', userData.dob)

            image && formData.append('image', image)

            const { data } = await axios.post(backendUrl + '/api/user/update-profile', formData, { headers: { token } })

            if (data.success) {
                toast.success(data.message)
                await loadUserProfileData()
                setIsEdit(false)
                setImage(false)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }

    }

    return userData ? (
        <div className='bg-background py-8 text-sm text-body sm:py-10'>
            <div className='mx-auto max-w-4xl'>
                <div className='mb-8'>
                    <p className='text-3xl font-semibold text-heading'>My profile</p>
                    <p className='mt-2 text-body'>Keep your personal information up to date.</p>
                </div>

                <div className='grid gap-6 lg:grid-cols-[260px_1fr]'>
                    <div className='rounded-2xl border border-border bg-surface p-6 text-center shadow-sm'>
                        {isEdit
                            ? <label htmlFor='image' className='group inline-block cursor-pointer'>
                                <div className='relative'>
                                    <img className='h-40 w-40 rounded-full object-cover opacity-75 ring-4 ring-primary-light' src={image ? URL.createObjectURL(image) : userData.image} alt={userData.name} />
                                    <img className='absolute bottom-12 right-12 w-10' src={image ? '' : assets.upload_icon} alt='' />
                                </div>
                                <span className='mt-3 block text-xs font-medium text-primary group-hover:text-primary-dark'>Change profile photo</span>
                                <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden />
                            </label>
                            : <img className='mx-auto h-40 w-40 rounded-full object-cover ring-4 ring-primary-light' src={userData.image} alt={userData.name} />
                        }

                        {isEdit
                            ? <input aria-label='Name' className='mt-5 w-full rounded-lg border border-border bg-surface px-3 py-2 text-center text-xl font-semibold text-heading outline-none focus:border-primary focus:ring-2 focus:ring-primary/20' type="text" onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))} value={userData.name} />
                            : <p className='mt-5 text-2xl font-semibold text-heading'>{userData.name}</p>
                        }
                    </div>

                    <div className='flex flex-col gap-6'>
                        <div className='rounded-2xl border border-border bg-surface p-6 shadow-sm'>
                            <p className='mb-5 text-base font-semibold text-heading'>Contact information</p>
                            <div className='grid gap-5 sm:grid-cols-[140px_1fr]'>
                                <p className='font-medium text-heading'>Email id</p>
                                <p className='text-primary'>{userData.email}</p>
                                <label className='font-medium text-heading' htmlFor='phone'>Phone</label>
                                {isEdit
                                    ? <input id='phone' className='w-full rounded-lg border border-border bg-surface px-3 py-2 text-heading outline-none focus:border-primary focus:ring-2 focus:ring-primary/20' type="text" onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))} value={userData.phone} />
                                    : <p className='text-body'>{userData.phone}</p>
                                }
                                <p className='font-medium text-heading'>Address</p>
                                {isEdit
                                    ? <div className='flex flex-col gap-2'>
                                        <input aria-label='Address line 1' className='w-full rounded-lg border border-border bg-surface px-3 py-2 text-heading outline-none focus:border-primary focus:ring-2 focus:ring-primary/20' type="text" onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} value={userData.address.line1} />
                                        <input aria-label='Address line 2' className='w-full rounded-lg border border-border bg-surface px-3 py-2 text-heading outline-none focus:border-primary focus:ring-2 focus:ring-primary/20' type="text" onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} value={userData.address.line2} />
                                    </div>
                                    : <p className='text-body'>{userData.address.line1} <br /> {userData.address.line2}</p>
                                }
                            </div>
                        </div>

                        <div className='rounded-2xl border border-border bg-surface p-6 shadow-sm'>
                            <p className='mb-5 text-base font-semibold text-heading'>Basic information</p>
                            <div className='grid gap-5 sm:grid-cols-[140px_1fr]'>
                                <p className='font-medium text-heading'>Gender</p>
                                {isEdit
                                    ? <select aria-label='Gender' className='w-full rounded-lg border border-border bg-surface px-3 py-2 text-heading outline-none focus:border-primary focus:ring-2 focus:ring-primary/20' onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))} value={userData.gender} >
                                        <option value="Not Selected">Not Selected</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                    : <p className='text-body'>{userData.gender}</p>
                                }
                                <label className='font-medium text-heading' htmlFor='birthday'>Birthday</label>
                                {isEdit
                                    ? <input id='birthday' className='w-full rounded-lg border border-border bg-surface px-3 py-2 text-heading outline-none focus:border-primary focus:ring-2 focus:ring-primary/20' type='date' onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))} value={userData.dob} />
                                    : <p className='text-body'>{userData.dob}</p>
                                }
                            </div>
                        </div>

                        <div className='flex justify-end'>
                            {isEdit
                                ? <button onClick={updateUserProfileData} className='rounded-full bg-primary px-7 py-2.5 font-semibold text-white transition-colors hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'>Save information</button>
                                : <button onClick={() => setIsEdit(true)} className='rounded-full border border-primary bg-surface px-7 py-2.5 font-semibold text-primary transition-colors hover:bg-primary hover:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'>Edit profile</button>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) : null
}

export default MyProfile