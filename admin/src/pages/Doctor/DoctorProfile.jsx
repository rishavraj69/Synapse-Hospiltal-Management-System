import { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const DoctorProfile = () => {

    const { dToken, profileData, setProfileData, getProfileData } = useContext(DoctorContext)
    const { currency, backendUrl } = useContext(AppContext)
    const [isEdit, setIsEdit] = useState(false)

    const updateProfile = async () => {

        try {

            const updateData = {
                address: profileData.address,
                fees: profileData.fees,
                about: profileData.about,
                available: profileData.available
            }

            const { data } = await axios.post(backendUrl + '/api/doctor/update-profile', updateData, { headers: { dToken } })

            if (data.success) {
                toast.success(data.message)
                setIsEdit(false)
                getProfileData()
            } else {
                toast.error(data.message)
            }

            setIsEdit(false)

        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }

    }

    useEffect(() => {
        if (dToken) {
            getProfileData()
        }
    }, [dToken])

    return profileData && (
        <main className='min-w-0 flex-1 p-4 sm:p-6 lg:p-8'>
            <div className='mx-auto max-w-5xl'>
                <header className='mb-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
                    <div>
                        <p className='mb-1.5 text-xs font-semibold uppercase tracking-wider text-primary'>Account & Profile</p>
                        <h1 className='text-2xl font-semibold tracking-tight text-heading sm:text-3xl'>Doctor Profile</h1>
                        <p className='mt-1 text-sm text-muted'>Manage your public credentials, clinical bio, fees, and appointment availability.</p>
                    </div>
                    <div className='hidden sm:flex sm:items-center sm:gap-2'>
                        {isEdit ? (
                            <>
                                <button
                                    type='button'
                                    onClick={() => { setIsEdit(false); getProfileData(); }}
                                    className='rounded-full border border-border bg-surface px-5 py-2 text-sm font-medium text-body shadow-sm transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary'
                                >
                                    Cancel
                                </button>
                                <button
                                    type='button'
                                    onClick={updateProfile}
                                    className='rounded-full bg-primary px-6 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2'
                                >
                                    Save Changes
                                </button>
                            </>
                        ) : (
                            <button
                                type='button'
                                onClick={() => setIsEdit(true)}
                                className='rounded-full border border-primary bg-surface px-6 py-2 text-sm font-medium text-primary shadow-sm transition-colors hover:bg-primary hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2'
                            >
                                Edit Profile
                            </button>
                        )}
                    </div>
                </header>

                <div className='flex flex-col gap-6 lg:flex-row lg:items-start'>
                    {/* Left Column: Portrait & Availability Card */}
                    <div className='w-full lg:w-72 shrink-0 space-y-4'>
                        <div className='overflow-hidden rounded-xl border border-border bg-primary-light shadow-sm'>
                            <img
                                className='h-64 w-full object-cover object-top sm:h-72 lg:h-80'
                                src={profileData.image}
                                alt={profileData.name}
                            />
                        </div>

                        {/* Availability Card */}
                        <div className='rounded-xl border border-border bg-surface p-4 shadow-sm'>
                            <div className='flex items-center justify-between'>
                                <div>
                                    <p className='text-xs font-semibold uppercase tracking-wider text-muted'>Practice Status</p>
                                    <p className={`mt-1 text-sm font-medium ${profileData.available ? 'text-primary' : 'text-muted'}`}>
                                        {profileData.available ? 'Available for booking' : 'Currently unavailable'}
                                    </p>
                                </div>
                                <label
                                    htmlFor='doc-availability'
                                    className={`relative inline-flex items-center ${isEdit ? 'cursor-pointer' : 'cursor-default'}`}
                                    title={isEdit ? 'Toggle availability' : 'Click Edit Profile to change'}
                                >
                                    <input
                                        id='doc-availability'
                                        type='checkbox'
                                        disabled={!isEdit}
                                        checked={profileData.available}
                                        onChange={() => isEdit && setProfileData(prev => ({ ...prev, available: !prev.available }))}
                                        aria-label='Toggle doctor availability'
                                        className='peer sr-only'
                                    />
                                    <div className={`h-5 w-9 rounded-full bg-slate-200 transition-colors after:absolute after:left-[2px] after:top-[2px] after:h-4 after:w-4 after:rounded-full after:bg-white after:shadow-sm after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full ${
                                        isEdit
                                            ? 'peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2'
                                            : 'opacity-70'
                                    }`}></div>
                                </label>
                            </div>
                            {!isEdit && (
                                <p className='mt-2 border-t border-border pt-2 text-[11px] text-muted'>
                                    To modify availability, click <strong className='font-medium text-heading'>Edit Profile</strong>.
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Right Column: Main Profile Information */}
                    <div className='flex-1 rounded-xl border border-border bg-surface p-6 shadow-sm sm:p-8 space-y-6'>
                        {/* Doctor Name, Specialty, Experience */}
                        <div>
                            <h2 className='text-2xl font-semibold tracking-tight text-heading sm:text-3xl'>{profileData.name}</h2>
                            <div className='mt-2 flex flex-wrap items-center gap-2.5 text-sm'>
                                <span className='font-medium text-heading'>{profileData.degree}</span>
                                <span className='text-muted'>•</span>
                                <span className='text-body'>{profileData.speciality}</span>
                                <span className='rounded-full border border-teal-200 bg-teal-50 px-3 py-0.5 text-xs font-semibold text-primary'>
                                    {profileData.experience}
                                </span>
                            </div>
                        </div>

                        {/* About Section */}
                        <div className='border-t border-border pt-5'>
                            <label htmlFor='doc-about' className='mb-2 block text-xs font-semibold uppercase tracking-wider text-muted'>
                                About Doctor
                            </label>
                            {isEdit ? (
                                <textarea
                                    id='doc-about'
                                    rows={5}
                                    value={profileData.about}
                                    onChange={(e) => setProfileData(prev => ({ ...prev, about: e.target.value }))}
                                    className='w-full resize-y rounded-lg border border-border bg-surface px-3.5 py-2.5 text-sm text-heading placeholder:text-slate-400 transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary'
                                    placeholder='Write about your clinical experience and patient care philosophy...'
                                />
                            ) : (
                                <p className='text-sm leading-relaxed text-body whitespace-pre-line'>
                                    {profileData.about || 'No detailed biography provided.'}
                                </p>
                            )}
                        </div>

                        {/* Consultation Fee */}
                        <div className='border-t border-border pt-5'>
                            <label htmlFor='doc-fees' className='mb-2 block text-xs font-semibold uppercase tracking-wider text-muted'>
                                Appointment Consultation Fee
                            </label>
                            {isEdit ? (
                                <div className='max-w-xs'>
                                    <div className='relative rounded-lg shadow-sm'>
                                        <span className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-sm font-semibold text-muted'>
                                            {currency}
                                        </span>
                                        <input
                                            id='doc-fees'
                                            type='number'
                                            value={profileData.fees}
                                            onChange={(e) => setProfileData(prev => ({ ...prev, fees: e.target.value }))}
                                            className='w-full rounded-lg border border-border bg-surface py-2 pl-8 pr-3.5 text-sm font-semibold text-heading transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary'
                                        />
                                    </div>
                                </div>
                            ) : (
                                <p className='text-lg font-semibold text-heading'>
                                    {currency} {profileData.fees}
                                </p>
                            )}
                        </div>

                        {/* Clinic Address */}
                        <div className='border-t border-border pt-5'>
                            <label className='mb-2 block text-xs font-semibold uppercase tracking-wider text-muted'>
                                Clinic Location / Address
                            </label>
                            {isEdit ? (
                                <div className='space-y-2 max-w-lg'>
                                    <input
                                        type='text'
                                        aria-label='Address line 1'
                                        value={profileData.address.line1}
                                        onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))}
                                        placeholder='Address Line 1'
                                        className='w-full rounded-lg border border-border bg-surface px-3.5 py-2 text-sm text-heading transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary'
                                    />
                                    <input
                                        type='text'
                                        aria-label='Address line 2'
                                        value={profileData.address.line2}
                                        onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))}
                                        placeholder='Address Line 2'
                                        className='w-full rounded-lg border border-border bg-surface px-3.5 py-2 text-sm text-heading transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary'
                                    />
                                </div>
                            ) : (
                                <div className='text-sm text-body space-y-0.5'>
                                    <p className='font-medium text-heading'>{profileData.address.line1}</p>
                                    <p className='text-muted'>{profileData.address.line2}</p>
                                </div>
                            )}
                        </div>

                        {/* Mobile Action Controls (< sm) */}
                        <div className='border-t border-border pt-5 flex justify-end sm:hidden'>
                            {isEdit ? (
                                <div className='flex w-full gap-2'>
                                    <button
                                        type='button'
                                        onClick={() => { setIsEdit(false); getProfileData(); }}
                                        className='flex-1 rounded-full border border-border bg-surface py-2.5 text-sm font-medium text-body shadow-sm'
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type='button'
                                        onClick={updateProfile}
                                        className='flex-1 rounded-full bg-primary py-2.5 text-sm font-semibold text-white shadow-sm'
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            ) : (
                                <button
                                    type='button'
                                    onClick={() => setIsEdit(true)}
                                    className='w-full rounded-full border border-primary bg-surface py-2.5 text-sm font-medium text-primary shadow-sm'
                                >
                                    Edit Profile
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default DoctorProfile