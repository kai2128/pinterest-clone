import React, { useEffect, useRef, useState } from 'react'
import { HiMenu } from 'react-icons/hi'
import { AiFillCloseCircle } from 'react-icons/ai'
import { Link, Route, Routes, useNavigate } from 'react-router-dom'
import { Sidebar, UserProfile } from '../components'
import logo from '../assets/logo.png'
import Pins from './Pins'
import { useUserStore } from '@/stores/useUserStore'

const Home = () => {
  const [toggleSideBar, setToggleSideBar] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()
  const { user, fetchUserInfo } = useUserStore(navigate)

  useEffect(() => {
    scrollRef.current?.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    if (Object.keys(user).length === 0)
      fetchUserInfo()
  }, [])

  return (
    <div className='flex bg-gray-50 md:flex-row flex-col h-screen transition-height duration-75 ease-out'>
      {/* desktop */}
      <div className='hidden md:flex h-screen flex-initial'><Sidebar/></div>
      {/* mobile */}
      <div className='flex md:hidden flex-row'>
        <div className='p-2 w-full flex flex-row justify-between items-center shadow-md'>
          <HiMenu fontSize={40} className='cursor-pointer' onClick={() => setToggleSideBar(true)} ></HiMenu>
          <Link to="/">
            <img src={logo} alt="logo" className='w-28'></img>
          </Link>
          <Link to={'user-profile'}>
            <img src={user?.image} alt="logo" className='w-28'></img>
          </Link>
        </div>
        {toggleSideBar && (
          <div className='fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in'>
            <div className='absolute w-full flex justify-end px-2'><AiFillCloseCircle fontSize={30} className="cursor-pointer" onClick={() => { setToggleSideBar(false) }}></AiFillCloseCircle></div>
            <Sidebar closeToggle={setToggleSideBar}></Sidebar>
          </div>
        )}
      </div>

      <div className='pb-2 flex-1 h-screen overflow-y-scroll' ref={scrollRef}>
        <Routes>
          <Route path="/user-profile/:userId" element={<UserProfile></UserProfile>}></Route>
          <Route path="/*" element={<Pins></Pins>}></Route>
        </Routes>
      </div>
    </div>
  )
}

export default Home
