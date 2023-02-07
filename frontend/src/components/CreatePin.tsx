import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AiOutlineCloudUpload } from 'react-icons/ai'
import type { SanityImageAssetDocument } from '@sanity/client'
import { MdDelete } from 'react-icons/md'
import Spinner from './Spinner'
import { useUserStore } from '@/stores/useUserStore'
import { categoriesStore } from '@/stores/categoryStore'
import { client } from '@/client'

const CreatePin = () => {
  const { user } = useUserStore()
  const { categories } = categoriesStore()
  const [title, setTitle] = useState('')
  const [about, setAbout] = useState('')
  const [destination, setDestination] = useState('')
  const [loading, setLoading] = useState(false)
  const [fields, setFields] = useState(null)
  const [category, setCategory] = useState(null)
  const [image, setImage] = useState<SanityImageAssetDocument>(null)
  const [wrongImageType, setWrongImageType] = useState(false)

  const validTypes = ['image/png', 'image/svg', 'image/jpeg', 'image/gif', 'image/tiff']
  const navigate = useNavigate()
  const uploadImage = (e: Event) => {
    const selectedFile = e.target?.files[0]

    if (validTypes.includes(selectedFile.type)) {
      setWrongImageType(false)
      setLoading(true)
      client.assets.upload('image', selectedFile, { contentType: selectedFile.type, filename: selectedFile.name })
        .then((document) => {
          setImage(document)
          setLoading(false)
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log('Image upload error ', error)
        })
    }
    else { setWrongImageType(true) }
  }
  return (
    <div className='flex flex-col justify-center items-center'>
      {fields && (
        <p className='text-red-500 mb-5 text-xl transition-all duration-150 ease-in'>Please fill in all the fields</p>
      )}
      <div className='flex lg:flex-row flex-col justify-center items-center bg-white lg:p-5 p-3 lg:w-4/5 w-full'>
        <div className='bg-secondaryColor p-3 flex flex-0.7 w-full'>
          <div className='flex justify-center items-center border-2 border-dotted border-gray-300 p-3 w-full h-420'>
            {loading && <Spinner></Spinner>}
            {wrongImageType && <p>Wrong image type</p>}
            {!image
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
                  onClick={() => setImage(null)}
                ><MdDelete></MdDelete></button>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreatePin
