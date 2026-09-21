import { useContext, useState } from 'react'
import axios from 'axios'
import { DoctorContext } from '../context/DoctorContext'
import { AdminContext } from '../context/AdminContext'
import { assets } from '../assets/assets'
import { toast } from 'react-toastify'

const Login = () => {

  const [state, setState] = useState('Admin')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const backendUrl = import.meta.env.VITE_BACKEND_URL

  const { setDToken } = useContext(DoctorContext)
  const { setAToken } = useContext(AdminContext)

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (state === 'Admin') {

      const { data } = await axios.post(backendUrl + '/api/admin/login', { email, password })
      if (data.success) {
        setAToken(data.token)
        localStorage.setItem('aToken', data.token)
      } else {
        toast.error(data.message)
      }

    } else {

      const { data } = await axios.post(backendUrl + '/api/doctor/login', { email, password })
      if (data.success) {
        setDToken(data.token)
        localStorage.setItem('dToken', data.token)
      } else {
        toast.error(data.message)
      }

    }

  }

  return (
    <div className='flex min-h-screen flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8'>
      <div className='w-full max-w-md space-y-6'>
        {/* Branding */}
        <div className='flex flex-col items-center text-center'>
          <img
            src={assets.admin_logo}
            alt='Synapse Healthcare'
            className='h-10 w-auto object-contain cursor-pointer mb-2'
          />
          <h1 className='text-2xl font-bold tracking-tight text-heading sm:text-3xl'>
            Synapse Portal
          </h1>
          <p className='mt-1 text-sm text-muted'>
            Secure management portal for clinical providers & administrators.
          </p>
        </div>

        {/* Login Card */}
        <div className='rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8'>
          {/* Role Switcher Tabs */}
          <div className='mb-6 grid grid-cols-2 rounded-xl border border-border bg-slate-100 p-1'>
            <button
              type='button'
              onClick={() => setState('Admin')}
              className={`rounded-lg py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                state === 'Admin'
                  ? 'bg-surface text-primary shadow-sm'
                  : 'text-muted hover:text-heading'
              }`}
            >
              Admin Portal
            </button>
            <button
              type='button'
              onClick={() => setState('Doctor')}
              className={`rounded-lg py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                state === 'Doctor'
                  ? 'bg-surface text-primary shadow-sm'
                  : 'text-muted hover:text-heading'
              }`}
            >
              Doctor Portal
            </button>
          </div>

          <form onSubmit={onSubmitHandler} className='space-y-5'>
            <div>
              <label
                htmlFor='login-email'
                className='mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted'
              >
                {state === 'Admin' ? 'Admin Email' : 'Doctor Email'}
              </label>
              <input
                id='login-email'
                type='email'
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={state === 'Admin' ? 'admin@synapse.org' : 'doctor@synapse.org'}
                className='w-full rounded-lg border border-border bg-surface px-3.5 py-2.5 text-sm text-heading placeholder:text-slate-400 transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary'
              />
            </div>

            <div>
              <label
                htmlFor='login-password'
                className='mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted'
              >
                Password
              </label>
              <input
                id='login-password'
                type='password'
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='••••••••'
                className='w-full rounded-lg border border-border bg-surface px-3.5 py-2.5 text-sm text-heading placeholder:text-slate-400 transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary'
              />
            </div>

            <button
              type='submit'
              className='w-full rounded-full bg-primary py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2'
            >
              Sign In as {state}
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className='text-center text-xs text-muted'>
          © {new Date().getFullYear()} Synapse Healthcare System. All rights reserved.
        </p>
      </div>
    </div>
  )
}

export default Login