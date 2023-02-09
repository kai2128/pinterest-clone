import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { MdDownloadForOffline } from 'react-icons/md'
import * as uuid from 'uuid'
import Spinner from './Spinner'
import MasonryLayout from './MasonryLayout'
import { useUserStore } from '@/stores/useUserStore'
import { client, urlFor } from '@/client'
import { pinDetailMoreQuery, pinDetailQuery } from '@/utils/data'
import type { MorePin, PinDetail as PinDetailType } from '@/types'

const PinDetail = () => {
  const { user } = useUserStore()
  const [pins, setPins] = useState<MorePin[]>([])
  const [pinDetail, setPinDetail] = useState<PinDetailType>()
  const [comment, setComment] = useState('')
  const [addingComment, setAddingComment] = useState(false)
  const { pinId } = useParams()

  const fetchPinDetails = async () => {
    let query = pinDetailQuery(pinId!)
    if (query) {
      const data = await client.fetch(query)
      setPinDetail(data[0])
      // for recommendation of pins with same category
      if (data[0]) {
        query = pinDetailMoreQuery(data[0])
        const res = await client.fetch(query)
        setPins(res)
      }
    }
  }

  useEffect(() => {
    fetchPinDetails()
  }, [pinId])

  const addComment = () => {
    if (!comment)
      return
    setAddingComment(true)
    client.patch(pinId!)
      .setIfMissing({ comments: [] })
      .insert('after', 'comments[-1]', [{
        comment,
        _key: uuid.v4(),
        postedBy: {
          _type: 'postedBy',
          _ref: user._id,
        },
      }])
      .commit()
      .then(() => {
        setTimeout(() => {
          fetchPinDetails()
          setComment('')
          setAddingComment(false)
        }, 200)
      })
  }

  if (!pinDetail)
    return <Spinner message='Loading pin...'></Spinner>

  return (
    <>
    <div className='flex xl:flex-row flex-col m-auto bg-white' style={{ maxWidth: '1500px', borderRadius: '32px' }}>
      <div className='flex justify-center items-center md:items-start flex-initial'>
        <img className='rounded-t-3xl rounded-b-lg' alt='user-post' src={pinDetail?.image && urlFor(pinDetail.image).url()}></img>
      </div>
      <div className='w-full p-5 flex-1 xl:min-w-620'>
        <div className='flex items-center justify-between'>
          <div className='flex gap-2 items-center'>
            <a href={`${pinDetail.imageUrl}?dl=`} download onClick={e => e.stopPropagation()} className='bg-white w-9 aspect-square flex items-center justify-center text-xl text-dark opacity-75 hover:opacity-100 transition-opacity ease-in-out hover:shadow-md outline-none rounded-full'>
              <MdDownloadForOffline></MdDownloadForOffline>
            </a>
          </div>
          <a href={pinDetail.destination} target='_blank' rel='noreferrer'>
            {pinDetail.destination}
          </a>
        </div>
        <div>
          <h1 className='text-4xl font-bold break-words mt-3'>{pinDetail.title}</h1>
          <p className='mt-3'>{pinDetail.about}</p>
        </div>
        <Link to={`user-profile/${pinDetail?.postedBy?._id}`} className='flex gap-2 mt-5 items-center bg-white rounded-lg'>
          <img src={pinDetail?.postedBy?.image} className='aspect-square w-8 rounded-full object-cover' alt='user-profile'></img>
          <p className='font-semibold capitalize'>{pinDetail?.postedBy?.username}</p>
        </Link>
        <h2 className='mt-5 text-2xl'>Comments</h2>
        <div className='max-h-370 overflow-y-auto'>
            {pinDetail?.comments?.map((c, i) =>
              (<div className='flex gap-2 mt-5 items-center bg-white rounded-lg' key={c._key}>
                <img src={c.postedBy.image} alt="user-profile" className='w-10 h-10 rounded-full cursor-pointer' />
                <div className='flex flex-col'>
                  <p className='font-bold'>{c.postedBy.username}</p>
                  <p>{c.comment}</p>
                </div>
              </div>),
            )}
        </div>
        <div className='flex flex-wrap mt-6 gap-3 items-center'>
          <Link to={`user-profile/${pinDetail?.postedBy?._id}`}>
            <img src={pinDetail?.postedBy?.image} className='aspect-square w-8 rounded-full cursor-pointer' alt='user-profile'></img>
          </Link>
          <input type='text' className='flex-1 border-gray-100 bg-gray-50 p-2 rounded-2xl outline-none border focus:border-gray-500' placeholder='Add a comment' onChange={e => setComment(e.target.value)} value={comment}></input>
          <button type='button' disabled={addingComment} onClick={addComment} className='bg-red-500 text-white rounded-full px-6 py-2 text-base font-semibold outline-none'>{addingComment ? 'Posting the comment...' : 'Post'}</button>
        </div>
      </div>
    </div>
    {pins?.length > 0
      ? (
      <>
        <h2 className='text-center font-bold text-2xl mt-8 mb-4'>More like this</h2>
        <MasonryLayout pins={pins}></MasonryLayout>
      </>
        )
      : (<Spinner message='Loading more pins...'></Spinner>)}
    </>
  )
}

export default PinDetail
