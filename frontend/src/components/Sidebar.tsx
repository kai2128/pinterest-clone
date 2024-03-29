import type { Dispatch, SetStateAction } from 'react'
import React from 'react'

import { Link, NavLink } from 'react-router-dom'
import { RiHomeFill } from 'react-icons/ri'
import logo from '../assets/logo.png'
import { useUserStore } from '@/stores/useUserStore'
import { categoriesStore } from '@/stores/categoryStore'

const isActiveStyle = 'flex items-center px-5 gap-3 font-extrabold border-r-2 border-black text-black transition-colors duration-200 ease-in-out capitalize'
const isNotActiveStyle = 'flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-colors duration-200 ease-in-out capitalize '

const Sidebar = ({ closeToggle }: { closeToggle?: Dispatch<SetStateAction<boolean>> }) => {
  const { user } = useUserStore()
  const { categories } = categoriesStore()
  const handleCloseSideBar = () => {
    if (closeToggle)
      closeToggle(false)
  }
  return (
    <div className='flex flex-col justify-between bg-white h-full overflow-y-scroll min-w-210 hide-scrollbar'>
      <div className='flex flex-col'>
        <Link to="/" className="flex px-5 gap-2 my-6 pt-1 w-190 items-center" onClick={handleCloseSideBar}>
            <img src={logo} alt='logo' className='w-full'></img>
        </Link>
        <div className='flex flex-col gap-5'>
          <NavLink onClick={handleCloseSideBar} to="/" className={({ isActive }) => isActive ? isActiveStyle : isNotActiveStyle}>
            <RiHomeFill></RiHomeFill>
            Home
          </NavLink>
          <h3 className='mt-2 px-5 text-base 2xl:text-xl'>Discover categories</h3>
          {categories.slice(0, categories.length - 1).map(c => (
             <NavLink key={c.name} onClick={handleCloseSideBar} to={`/category/${c.name}`} className={({ isActive }) => isActive ? isActiveStyle : isNotActiveStyle}>
              <img src={c.image} className='w-8 h-8 rounded-full shadow-sm' alt='category'></img>
              {c.name}
            </NavLink>
          ))}
        </div>
      </div>
      {
        user && (
          <Link to={`user-profile/${user._id}`} className='flex my-5 mb-3 gap-2 p-2 items-center bg-white rounded-lg shadow-lg mx-3' onClick={handleCloseSideBar}>
            <img src={user.image} className='w-10 h-10 rounded-full' alt='user'></img>
            <p>{user.username}</p>
          </Link>
        )
      }
    </div>
  )
}

export default Sidebar
