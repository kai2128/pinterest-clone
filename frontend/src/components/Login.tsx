import React from 'react'
import type { CredentialResponse } from '@react-oauth/google'
import { GoogleLogin } from '@react-oauth/google'
import jwtDecode from 'jwt-decode'
import { useNavigate } from 'react-router-dom'
import shareVideo from '../assets/share.mp4'
import logo from '../assets/logowhite.png'
import { client } from '@/client'
import { useUserStore } from '@/stores/useUserStore'

const Login = () => {
  const navigate = useNavigate()
  const userStore = useUserStore(navigate)
  const responseGoogle = (res: CredentialResponse) => {
    const cre = jwtDecode(res.credential!) as OAuthUser
    userStore.login(cre)
  }
  return (
    <div className='relative flex justify-center items-center flex-col h-screen'>
      <div className='bg-blackOverlay z-10 w-full h-full flex items-center justify-center flex-col'>
        <div className='p-5'>
          <img src={logo} width="130px" alt='logo' />
        </div>
        <div className='shadow-2xl'>
          <GoogleLogin
          onSuccess={responseGoogle}
          onError={() => {
            console.error('Failed to login google')
          }}
          />
        </div>
      </div>
      <div className=' w-full h-full absolute inset-0'>
        <video className='w-full h-full object-cover' src={shareVideo} autoPlay loop controls={false} muted></video>
      </div>
    </div>
  )
}

export default Login
