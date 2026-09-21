import { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { toast } from 'react-toastify'
import axios from 'axios'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'

const AddDoctor = () => {

    const [docImg, setDocImg] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [experience, setExperience] = useState('1 Year')
    const [fees, setFees] = useState('')
    const [about, setAbout] = useState('')
    const [speciality, setSpeciality] = useState('General physician')
    const [degree, setDegree] = useState('')
    const [address1, setAddress1] = useState('')
    const [address2, setAddress2] = useState('')

    const { backendUrl } = useContext(AppContext)
    const { aToken } = useContext(AdminContext)

    const onSubmitHandler = async (event) => {
        event.preventDefault()

        try {

            if (!docImg) {
                return toast.error('Image Not Selected')
            }

            const formData = new FormData();

            formData.append('image', docImg)
            formData.append('name', name)
            formData.append('email', email)
            formData.append('password', password)
            formData.append('experience', experience)
            formData.append('fees', Number(fees))
            formData.append('about', about)
            formData.append('speciality', speciality)
            formData.append('degree', degree)
            formData.append('address', JSON.stringify({ line1: address1, line2: address2 }))

            // console log formdata            
            formData.forEach((value, key) => {
                console.log(`${key}: ${value}`);
            });

            const { data } = await axios.post(backendUrl + '/api/admin/add-doctor', formData, { headers: { aToken } })
            if (data.success) {
                toast.success(data.message)
                setDocImg(false)
                setName('')
                setPassword('')
                setEmail('')
                setAddress1('')
                setAddress2('')
                setDegree('')
                setAbout('')
                setFees('')
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }

    }

    return (
        <main className='min-w-0 flex-1 p-4 sm:p-6 lg:p-8'>
            <div className='mx-auto max-w-5xl'>
                <header className='mb-7'>
                    <p className='mb-1.5 text-xs font-semibold uppercase tracking-wider text-primary'>Provider onboarding</p>
                    <h1 className='text-2xl font-semibold tracking-tight text-heading sm:text-3xl'>Add Doctor</h1>
                    <p className='mt-1 text-sm text-muted'>Register a new healthcare provider to the Synapse clinical directory.</p>
                </header>

                <form onSubmit={onSubmitHandler} className='rounded-xl border border-border bg-surface p-6 shadow-sm sm:p-8 lg:p-10'>
                    {/* Image Upload Section */}
                    <div className='mb-8 rounded-xl border border-dashed border-border bg-primary-light/50 p-5 transition-colors hover:border-primary/50'>
                        <div className='flex flex-col gap-4 sm:flex-row sm:items-center'>
                            <label
                                htmlFor='doc-img'
                                className='group relative flex h-20 w-20 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-border bg-surface transition-all duration-200 hover:border-primary focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2'
                            >
                                <img
                                    className={`h-full w-full ${docImg ? 'object-cover' : 'p-4 object-contain opacity-70 group-hover:opacity-100'}`}
                                    src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
                                    alt='Upload preview'
                                />
                                <input
                                    onChange={(e) => setDocImg(e.target.files[0])}
                                    type='file'
                                    id='doc-img'
                                    accept='image/*'
                                    className='sr-only'
                                />
                            </label>
                            <div className='text-sm'>
                                <label htmlFor='doc-img' className='cursor-pointer font-medium text-heading hover:text-primary transition-colors'>
                                    Upload doctor picture
                                </label>
                                <p className='mt-0.5 text-xs text-muted'>
                                    {docImg ? docImg.name : 'PNG, JPG, or WEBP. Clear clinical portrait recommended.'}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Form Grid */}
                    <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                        {/* Left Column */}
                        <div className='space-y-5'>
                            <div>
                                <label htmlFor='doc-name' className='mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted'>
                                    Doctor Name <span className='text-red-500'>*</span>
                                </label>
                                <input
                                    id='doc-name'
                                    onChange={e => setName(e.target.value)}
                                    value={name}
                                    type='text'
                                    placeholder='e.g. Dr. Sarah Jenkins'
                                    required
                                    className='w-full rounded-lg border border-border bg-surface px-3.5 py-2.5 text-sm text-heading placeholder:text-slate-400 transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary'
                                />
                            </div>

                            <div>
                                <label htmlFor='doc-email' className='mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted'>
                                    Doctor Email <span className='text-red-500'>*</span>
                                </label>
                                <input
                                    id='doc-email'
                                    onChange={e => setEmail(e.target.value)}
                                    value={email}
                                    type='email'
                                    placeholder='doctor@synapse.org'
                                    required
                                    className='w-full rounded-lg border border-border bg-surface px-3.5 py-2.5 text-sm text-heading placeholder:text-slate-400 transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary'
                                />
                            </div>

                            <div>
                                <label htmlFor='doc-password' className='mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted'>
                                    Set Password <span className='text-red-500'>*</span>
                                </label>
                                <input
                                    id='doc-password'
                                    onChange={e => setPassword(e.target.value)}
                                    value={password}
                                    type='password'
                                    placeholder='••••••••'
                                    required
                                    className='w-full rounded-lg border border-border bg-surface px-3.5 py-2.5 text-sm text-heading placeholder:text-slate-400 transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary'
                                />
                            </div>

                            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                                <div>
                                    <label htmlFor='doc-experience' className='mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted'>
                                        Experience
                                    </label>
                                    <select
                                        id='doc-experience'
                                        onChange={e => setExperience(e.target.value)}
                                        value={experience}
                                        className='w-full rounded-lg border border-border bg-surface px-3.5 py-2.5 text-sm text-heading transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary'
                                    >
                                        <option value='1 Year'>1 Year</option>
                                        <option value='2 Year'>2 Years</option>
                                        <option value='3 Year'>3 Years</option>
                                        <option value='4 Year'>4 Years</option>
                                        <option value='5 Year'>5 Years</option>
                                        <option value='6 Year'>6 Years</option>
                                        <option value='8 Year'>8 Years</option>
                                        <option value='9 Year'>9 Years</option>
                                        <option value='10 Year'>10 Years</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor='doc-fees' className='mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted'>
                                        Consultation Fee <span className='text-red-500'>*</span>
                                    </label>
                                    <input
                                        id='doc-fees'
                                        onChange={e => setFees(e.target.value)}
                                        value={fees}
                                        type='number'
                                        placeholder='50'
                                        required
                                        className='w-full rounded-lg border border-border bg-surface px-3.5 py-2.5 text-sm text-heading placeholder:text-slate-400 transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary'
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className='space-y-5'>
                            <div>
                                <label htmlFor='doc-speciality' className='mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted'>
                                    Speciality
                                </label>
                                <select
                                    id='doc-speciality'
                                    onChange={e => setSpeciality(e.target.value)}
                                    value={speciality}
                                    className='w-full rounded-lg border border-border bg-surface px-3.5 py-2.5 text-sm text-heading transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary'
                                >
                                    <option value='General physician'>General physician</option>
                                    <option value='Gynecologist'>Gynecologist</option>
                                    <option value='Dermatologist'>Dermatologist</option>
                                    <option value='Pediatricians'>Pediatricians</option>
                                    <option value='Neurologist'>Neurologist</option>
                                    <option value='Gastroenterologist'>Gastroenterologist</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor='doc-degree' className='mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted'>
                                    Degree / Qualification <span className='text-red-500'>*</span>
                                </label>
                                <input
                                    id='doc-degree'
                                    onChange={e => setDegree(e.target.value)}
                                    value={degree}
                                    type='text'
                                    placeholder='e.g. MBBS, MD, MS'
                                    required
                                    className='w-full rounded-lg border border-border bg-surface px-3.5 py-2.5 text-sm text-heading placeholder:text-slate-400 transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary'
                                />
                            </div>

                            <div>
                                <label htmlFor='doc-address1' className='mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted'>
                                    Clinic Address <span className='text-red-500'>*</span>
                                </label>
                                <div className='space-y-2'>
                                    <input
                                        id='doc-address1'
                                        onChange={e => setAddress1(e.target.value)}
                                        value={address1}
                                        type='text'
                                        placeholder='Address line 1'
                                        required
                                        className='w-full rounded-lg border border-border bg-surface px-3.5 py-2.5 text-sm text-heading placeholder:text-slate-400 transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary'
                                    />
                                    <input
                                        id='doc-address2'
                                        onChange={e => setAddress2(e.target.value)}
                                        value={address2}
                                        type='text'
                                        placeholder='Address line 2'
                                        required
                                        className='w-full rounded-lg border border-border bg-surface px-3.5 py-2.5 text-sm text-heading placeholder:text-slate-400 transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary'
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* About Section */}
                    <div className='mt-6'>
                        <label htmlFor='doc-about' className='mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted'>
                            About Doctor
                        </label>
                        <textarea
                            id='doc-about'
                            onChange={e => setAbout(e.target.value)}
                            value={about}
                            rows={4}
                            placeholder='Write a concise professional bio detailing clinical focus and background...'
                            className='w-full resize-y rounded-lg border border-border bg-surface px-3.5 py-2.5 text-sm text-heading placeholder:text-slate-400 transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary'
                        />
                    </div>

                    {/* Submit Button */}
                    <div className='mt-8 flex justify-end border-t border-border pt-5'>
                        <button
                            type='submit'
                            className='w-full rounded-full bg-primary px-9 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 sm:w-auto'
                        >
                            Add Doctor
                        </button>
                    </div>
                </form>
            </div>
        </main>
    )
}

export default AddDoctor