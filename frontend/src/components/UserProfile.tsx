import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AiOutlineLogout } from 'react-icons/ai'
import Spinner from './Spinner'
import MasonryLayout from './MasonryLayout'
import { useUserStore } from '@/stores/useUserStore'
import { client } from '@/client'
import { userCreatedPinsQuery, userSavedPinsQuery } from '@/utils/data'
import type { Pin } from '@/types'

const randomImg = 'https://source.unsplash.com/1600x900/?nature,photography,technology'
const activeBtnStyles = 'bg-red-500 text-white font-bold p-2 rounded-full w-20 outline-none'
const notActiveBtnStyles = 'bg-primary mr-4 text-black font-bold p-2 rounded-full w-20 outline-none'

const UserProfile = () => {
  const navigate = useNavigate()
  const { logout, user } = useUserStore(navigate)
  const [pins, setPins] = useState<Pin[]>()
  const [text, setText] = useState<'Created' | 'Saved' | string>('Created')
  const [activeBtn, setActiveBtn] = useState<'created' | 'saved'>('created')
  const { userId } = useParams()

  useEffect(() => {
    if (text === 'Created') {
      const createdPinsQuery = userCreatedPinsQuery(user._id)
      client.fetch(createdPinsQuery)
        .then((data) => {
          setPins(data)
        })
    }
    else {
      const savedPinsQuery = userSavedPinsQuery(user._id)
      client.fetch(savedPinsQuery)
        .then((data) => {
          setPins(data)
        })
    }
  }, [text])

  if (!user)
    return <Spinner message='Loading profile...'></Spinner>

  return (
    <div className='relative pb-2 h-full justify-center items-center'>
      <div className='flex flex-col pb-5'>
        <div className='flex relative flex-col mb-7'>
          <div className='flex flex-col justify-center items-center'>
            <img src={randomImg} alt="banner-image" className='w-full h-370 2xl:h-510 shadow-lg object-cover' />
            <img className="rounded-full w-20 h-20 -mt-10 shadow-xl" src={user?.image} alt="user-pic" />
            <h1 className='font-bold text-3xl text-center mt-3'>
              {user.username}
            </h1>
            <div className='absolute top-0 z-1 right-0 p-2'>
              <button type='button' className='bg-white flex justify-center items-center p-2 rounded-full cursor-pointer outline-none shadow-md' onClick={logout} >
                <AiOutlineLogout></AiOutlineLogout>
              </button>
            </div>
          </div>
          <div className="text-center mb-7">
            <button type='button' className={`${activeBtn === 'created' ? activeBtnStyles : notActiveBtnStyles}`} onClick={(e) => {
              setText((e.target as HTMLElement).textContent!)
              setActiveBtn('created')
            }}>
              Created
            </button>
            <button type='button' className={`${activeBtn === 'saved' ? activeBtnStyles : notActiveBtnStyles}`} onClick={(e) => {
              setText((e.target as HTMLElement).textContent!)
              setActiveBtn('saved')
            }}>
              Saved
            </button>
          </div>
          <div className="px-2">
            {
              pins?.length
                ? <MasonryLayout pins={pins}></MasonryLayout>
                : <div className='flex justify-center font-bold items-center w-full text-center'>No pins found</div>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfile
