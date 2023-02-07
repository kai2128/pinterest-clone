import React from 'react'
import { Circles } from 'react-loader-spinner'

const Spinner = ({ message }: { message: string }) => {
  return (
    <div className='flex flex-col items-center justify-center w-full h-full'>
      <div className='m-5'>
        <Circles color="#00BFFF" height={50} width={200}></Circles>
      </div>
      <p className='text-lg text-center px-2'>{message}</p>
    </div>
  )
}

export default Spinner
