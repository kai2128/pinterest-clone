import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { IoMdDownload } from 'react-icons/io'
import { BsFillArrowUpRightCircleFill } from 'react-icons/bs'
import * as uuid from 'uuid'
import { AiTwotoneDelete } from 'react-icons/ai'
import { client, urlFor } from '@/client'
import type { MorePin, Pin as PinType } from '@/types'
import { useUserStore } from '@/stores/useUserStore'

const Pin = ({ pin: { postedBy, image, _id, destination, save, imageUrl } }: { pin: PinType | MorePin }) => {
  const [postHovered, setPostHovered] = useState(false)
  const { user } = useUserStore()
  const navigate = useNavigate()
  const alreadySaved = !!(save?.filter(item => item.postedBy._id === user._id))?.length
  const savePin = (id: string) => {
    if (!alreadySaved) {
      client.patch(id)
        .setIfMissing({ save: [] })
        .insert('after', 'save[-1]', [{
          _key: uuid.v4(),
          userId: user._id,
          postedBy: {
            _type: 'postedBy',
            _ref: user._id,
          },
        }])
        .commit()
        .then(() => {
          window.location.reload()
        })
    }
  }
  function deletePin(id: string) {
    client.delete(id)
      .then(() => {
        window.location.reload()
      })
  }

  return (
    <div className='m-2'>
      <div
        onMouseEnter={() => setPostHovered(true)}
        onMouseLeave={() => setPostHovered(false)}
        onClick={() => navigate(`/pin-detail/${_id}`)}
        className='relative cursor-zoom-in w-auto hover:shadow-lg overflow-hidden transition-all duration-500 ease-in-out'
      >
        <img className='rounded-lg w-full' alt='user-post' src={urlFor(image).width(250).url()}></img>
        {postHovered && (
          <div className='absolute inset-0 w-full h-full justify-between z-50' style={{ height: '100%' }}>
            <div className='flex items-center justify-between px-2 pt-2'>
              <div className='flex gap-2 justify-start'>
                <a href={`${imageUrl}?dl=`} download onClick={e => e.stopPropagation()} className='bg-white w-9 aspect-square flex items-center justify-center text-xl text-dark opacity-75 hover:opacity-100 transition-opacity ease-in-out hover:shadow-md outline-none rounded-full'>
                  <IoMdDownload></IoMdDownload>
                </a>
              </div>
              {alreadySaved
                ? (
                  <button type="button" className='bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none'>{save?.length} Saved</button>
                  )
                : (<button
                    type="button"
                    className='bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text- rounded-3xl hover:shadow-md outline-none'
                    onClick={(e) => {
                      e.stopPropagation()
                      savePin(_id)
                    }}>Save</button>)
              }
            </div>
            <div className='px-2 pb-3 flex gap-2 w-full absolute bottom-0 justify-between items-center'>
              {
                destination && (
                  <a href={destination} target='_blank' rel='noreferrer' className='bg-white flex items-center gap-2 text-black font-bold p-2 pl-4 pr-4 rounded-full opacity-70 hover:opacity-100 hover:shadow-md max-w-[80%]'>
                    <BsFillArrowUpRightCircleFill className='flex-shrink-0'></BsFillArrowUpRightCircleFill>
                    <p className='text-ellipsis whitespace-nowrap overflow-hidden'>{destination}</p>
                  </a>
                )
              }
              {postedBy._id === user._id
                && (<button type='button'
                  onClick={(e) => {
                    e.stopPropagation()
                    deletePin(_id)
                  }}
                  className='bg-white p-2 opacity-70 hover:opacity-100 font-bold text-black text-base rounded-full'
                  >
                    <AiTwotoneDelete></AiTwotoneDelete>
                </button>)
              }
            </div>
          </div>
        )}
      </div>
      <Link to={`user-profile/${postedBy?._id}`} className='flex gap-2 mt-2 items-center'>
          <img src={postedBy?.image} className='aspect-square w-8 rounded-full object-cover' alt='user-profile'></img>
          <p className='font-semibold capitalize'>{postedBy?.username}</p>
      </Link>
    </div>
  )
}

export default Pin
