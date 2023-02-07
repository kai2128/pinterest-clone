import { IoMdAdd, IoMdSearch } from 'react-icons/io'
import type { Dispatch, SetStateAction } from 'react'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useUserStore } from '@/stores/useUserStore'

interface Props { searchTerm: string; setSearchTerm: Dispatch<SetStateAction<string>> }
const Navbar = ({ searchTerm, setSearchTerm }: Props) => {
  const navigate = useNavigate()
  const { user } = useUserStore()

  if (!user)
    return null

  return (
    <div className='flex gap-2 md:gap-5 w-full mt-5 pb-7'>
      <div className='flex justify-start items-center w-full px-2 rounded-md bg-white border-none outline-none focus-within:shadow-sm'>
        <IoMdSearch fontSize={21} className='ml-1'></IoMdSearch>
        <input type="text" onChange={e => setSearchTerm(e.target.value)} placeholder='Search' value={searchTerm} onFocus={() => navigate('/search')} className='p-2 w-full outline-none'></input>
      </div>
      <div className='flex gap-3 flex-shrink-0'>
        <Link to={`user-profile/${user?._id}`} className="hidden md:block">
          <img src={user.image} alt="image" className='w-14 h-14 rounded-lg' />
        </Link>
        <Link to={'create-pin'} className="bg-black text-white rounded-lg aspect-square w-12 flex items-center justify-center md:w-14 ">
          <IoMdAdd></IoMdAdd>
        </Link>
      </div>
    </div>
  )
}

export default Navbar
