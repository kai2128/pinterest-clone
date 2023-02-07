import type { ChangeEvent } from 'react'
import React, { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'
import { AiOutlineCloudUpload } from 'react-icons/ai'
import type { SanityImageAssetDocument } from '@sanity/client'
import { MdDelete } from 'react-icons/md'
import Spinner from './Spinner'
import { useUserStore } from '@/stores/useUserStore'
import { categoriesStore } from '@/stores/categoryStore'
import { client } from '@/client'
import type { Category } from '@/types'

const CreatePin = () => {
  const { user } = useUserStore()
  const { categories, otherCategory } = categoriesStore()
  const [title, setTitle] = useState('')
  const [about, setAbout] = useState('')
  const [destination, setDestination] = useState('')
  const [loading, setLoading] = useState(false)
  const [fields, setFields] = useState(false)
  const [category, setCategory] = useState<Pick<Category, '_id'> | undefined>()
  const [image, setImage] = useState<SanityImageAssetDocument | undefined>()
  const [wrongImageType, setWrongImageType] = useState(false)

  const validTypes = ['image/png', 'image/svg', 'image/jpeg', 'image/gif', 'image/tiff']
  const navigate = useNavigate()
  const uploadImage = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files[0]

    if (validTypes.includes(selectedFile.type)) {
      setWrongImageType(false)
      setLoading(true)
      client.assets.upload('image', selectedFile, { contentType: selectedFile.type, filename: selectedFile.name })
        .then((document) => {
          setImage(document)
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log('Image upload error ', error)
        }).finally(() => {
          setLoading(false)
        })
    }
    else { setWrongImageType(true) }
  }

  const savePin = () => {
    if (title && about && destination && image?._id && category) {
      const doc = {
        _type: 'pin',
        title,
        about,
        destination,
        image: {
          _type: 'image',
          asset: {
            _type: 'ref',
            _ref: image?._id,
          },
        },
        userId: user._id,
        postedBy: {
          _type: 'postedBy',
          _ref: user._id,
        },
        category: {
          _type: 'ref',
          _ref: category,
        },
      }
      client.create(doc).then(() => navigate('/'))
    }
    else {
      setFields(true)
      setTimeout(() => {
        setFields(false)
      }, 2000)
    }
  }

  useEffect(() => {
    const listener = otherCategory.listen((c) => {
      setCategory(c?._id)
    })
    return () => {
      listener()
    }
  }, [])
  return (
    <div className='flex flex-col justify-center items-center'>
      {fields && (
        <div className='p-2  mb-3 w-full bg-red-50 text-center border rounded-md border-red-500 transition-all duration-150 ease-in'>
          <p className='text-red-500 text-xl'>Please fill in all the fields</p>
        </div>
      )}
      <div className='flex lg:flex-row flex-col justify-center items-center bg-white lg:p-5 p-3 lg:w-4/5 w-full'>
        <div className='bg-secondaryColor p-3 flex flex-0.7 w-full'>
          <div className='flex justify-center items-center border-2 border-dotted border-gray-300 p-3 w-full h-420'>
            {loading && <Spinner></Spinner>}
            {wrongImageType && <p>Wrong image type</p>}
            {(!image && !loading)
              ? (
                <label className='cursor-pointer'>
                  <div className='flex flex-col items-center justify-center h-full'>
                    <div className='flex flex-col justify-center items-center'>
                      <p className='font-bold text-2xl'><AiOutlineCloudUpload></AiOutlineCloudUpload></p>
                      <p className='text-lg'>Click to upload</p>
                    </div>
                    <p className='text-gray-400'>Use high-quality JPG, SVG, PNG, GIF or TIFF less than 20 MB</p>
                  </div>
                  <input type="file" name='upload-image' onChange={uploadImage} className='hidden' />
                </label>)
              : <div className='relative h-full'>
                <img src={image?.url} alt='uploaded-pic' className='w-full h-full'></img>
                <button className='absolute bottom-3 right-3 rounded-full p-3 bg-white text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out'
                  onClick={() => setImage(undefined)}
                ><MdDelete></MdDelete></button>
              </div>
            }
          </div>
        </div>
        <div className='flex flex-1 flex-col gap-6 lg:pl-5 mt-5 w-full'>
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder='Add your title' className='outline-none text-2xl sm:text-3xl font-bold border-b-2 border-gray-200 p-2' />
          {user
            && <div className='flex gap-2 my-2 items-center bg-white rounded-lg'>
              <img src={user.image} alt="user-image" className='w-10 h-10' />
              <p className='font-bold'>{user.username}</p>
            </div>
          }
          <input type='text' value={about} placeholder='What is your pin about?' onChange={e => setAbout(e.target.value)} className='outline-none text-base border-b-2 sm:text-lg border-gray-200 p-2'></input>
          <input type='text' value={destination} placeholder='Add a destination link' onChange={e => setDestination(e.target.value)} className='outline-none text-base border-b-2 sm:text-lg border-gray-200 p-2'></input>
          <div className='flex flex-col'>
            <div>
              <p className='mb-2 font-semibold text-lg sm:text-xl'>Choose category</p>
              <select value={category} onChange={e => setCategory(e.target.value)} className='outline-none w-4/5 text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer'>
                {categories.map(c =>
                  <option key={c._id} className="text-base border-0 outline-none capitalize bg-white text-black" value={c._id}>{c.name}</option>,
                )}
              </select>
            </div>
            <div className='flex justify-start items-end mt-5'>
              <button type='button' onClick={savePin} className='bg-red-500 text-white font-bold p-2 rounded-full w-28 outline-none'>Save Pin</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreatePin
