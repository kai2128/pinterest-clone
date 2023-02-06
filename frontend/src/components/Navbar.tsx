import { IoMdSearch } from 'react-icons/io'
import type { Dispatch, SetStateAction } from 'react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import type { User } from '@/types'

interface Props { searchTerm: string; setSearchTerm: Dispatch<SetStateAction<string>>; user?: User }
const Navbar = ({ searchTerm, setSearchTerm, user }: Props) => {
  const navigate = useNavigate()

  if (!user)
    return null

  return (
    <div className='flex gap-2 md:gap-5 w-full mt-5 pb-7'>
      <div className='flex justify-start items-center w-full px-2 rounded-md bg-white border-none outline-none focus-within:shadow-sm'>
        <IoMdSearch fontSize={21} className='ml-1'></IoMdSearch>
        <input type="text" onChange={e => setSearchTerm(e.target.value)} placeholder='Search' value={searchTerm} onFocus={() => navigate('/search')} className='p-2 w-full outline-none'></input>
      </div>
    </div>
  )
}

export default Navbar
