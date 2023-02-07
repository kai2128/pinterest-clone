import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { CreatePin, Feed, Navbar, PinDetail, Search } from '@/components'
import { useUserStore } from '@/stores/useUserStore'

const Pins = () => {
  const { user } = useUserStore()
  const [searchTerm, setSearchTerm] = useState('')
  return (
    <div className='px-2 md:px-5'>
      <div className='bg-gray-50'>
        <Navbar {...{ searchTerm, setSearchTerm }}></Navbar>
      </div>
      <div className='h-full'>
        <Routes>
          <Route path='/' element={<Feed></Feed>}></Route>
          <Route path='/category/:categoryId' element={<Feed></Feed>}></Route>
          <Route path='/pin-detail/:pinId' element={<PinDetail></PinDetail>}></Route>
          <Route path='/create-pin' element={<CreatePin></CreatePin>}></Route>
          <Route path='search' element={<Search {...{ searchTerm, setSearchTerm }}></Search>}></Route>
        </Routes>
      </div>
    </div>
  )
}

export default Pins
