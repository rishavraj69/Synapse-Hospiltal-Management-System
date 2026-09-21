import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const [state, setState] = useState('Sign Up')

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()
  const { backendUrl, token, setToken } = useContext(AppContext)

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (state === 'Sign Up') {

      const { data } = await axios.post(backendUrl + '/api/user/register', { name, email, password })

      if (data.success) {
        localStorage.setItem('token', data.token)
        setToken(data.token)
      } else {
        toast.error(data.message)
      }

    } else {

      const { data } = await axios.post(backendUrl + '/api/user/login', { email, password })

      if (data.success) {
        localStorage.setItem('token', data.token)
        setToken(data.token)
      } else {
        toast.error(data.message)
      }

    }

  }

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token])

  return (
    <form onSubmit={onSubmitHandler} className='flex min-h-[80vh] items-center justify-center bg-background py-10'>
      <div className='grid w-full max-w-4xl overflow-hidden rounded-2xl border border-border bg-surface shadow-sm md:grid-cols-[0.9fr_1.1fr]'>
        <div className='relative hidden min-h-[520px] overflow-hidden bg-primary-light p-8 md:flex md:flex-col md:justify-between'>
          <div className='relative z-10'>
            <img className='h-auto w-36' src={assets.logo} alt='Synapse' />
            <p className='mt-16 max-w-xs text-3xl font-semibold leading-tight text-heading'>Care that fits your life.</p>
            <p className='mt-4 max-w-xs text-sm leading-relaxed text-body'>Connect with trusted healthcare professionals and manage your care with confidence.</p>
          </div>
          <img className='relative z-10 mt-8 h-auto w-full object-contain object-bottom' src={assets.login_img} alt='Doctor appointment' />
          <div className='absolute -bottom-20 -right-20 h-64 w-64 rounded-full border-[28px] border-white opacity-70' />
        </div>
        <div className='w-full p-6 text-sm text-body sm:p-8 md:p-10'>
          <div className='mb-7'>
            <p className='text-2xl font-semibold text-heading'>{state === 'Sign Up' ? 'Create Account' : 'Login'}</p>
            <p className='mt-2 text-body'>Please {state === 'Sign Up' ? 'sign up' : 'log in'} to book appointment</p>
          </div>
          {state === 'Sign Up'
            ? <div className='mb-4 w-full'>
              <label className='mb-1.5 block font-medium text-heading' htmlFor='full-name'>Full Name</label>
              <input id='full-name' onChange={(e) => setName(e.target.value)} value={name} className='w-full rounded-lg border border-border bg-surface px-3 py-2.5 text-heading outline-none transition-colors placeholder:text-muted focus:border-primary focus:ring-2 focus:ring-primary/20' type="text" required />
            </div>
            : null
          }
          <div className='mb-4 w-full'>
            <label className='mb-1.5 block font-medium text-heading' htmlFor='email'>Email</label>
            <input id='email' onChange={(e) => setEmail(e.target.value)} value={email} className='w-full rounded-lg border border-border bg-surface px-3 py-2.5 text-heading outline-none transition-colors placeholder:text-muted focus:border-primary focus:ring-2 focus:ring-primary/20' type="email" required />
          </div>
          <div className='w-full'>
            <label className='mb-1.5 block font-medium text-heading' htmlFor='password'>Password</label>
            <input id='password' onChange={(e) => setPassword(e.target.value)} value={password} className='w-full rounded-lg border border-border bg-surface px-3 py-2.5 text-heading outline-none transition-colors placeholder:text-muted focus:border-primary focus:ring-2 focus:ring-primary/20' type="password" required />
          </div>
          <button className='my-6 w-full rounded-lg bg-primary py-3 text-base font-semibold text-white transition-colors hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'>{state === 'Sign Up' ? 'Create account' : 'Login'}</button>
          {state === 'Sign Up'
            ? <p className='text-center'>Already have an account? <button type='button' onClick={() => setState('Login')} className='font-medium text-primary underline underline-offset-2 transition-colors hover:text-primary-dark focus:outline-none focus:ring-2 focus:ring-primary'>Login here</button></p>
            : <p className='text-center'>Create an new account? <button type='button' onClick={() => setState('Sign Up')} className='font-medium text-primary underline underline-offset-2 transition-colors hover:text-primary-dark focus:outline-none focus:ring-2 focus:ring-primary'>Click here</button></p>
          }
        </div>
      </div>
    </form>
  )
}

export default Login