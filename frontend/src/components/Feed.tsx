import { createContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import MasonryLayout from './MasonryLayout'
import Spinner from './Spinner'
import { client } from '@/client'
import type { Pin } from '@/types'
import { feedQuery, searchQuery } from '@/utils/data'

export const FeedContext = createContext(() => {})
const Feed = () => {
  const [loading, setLoading] = useState(false)
  const { categoryName } = useParams()
  const [pins, setPins] = useState<Pin[]>([])
  const loadPins = () => {
    setLoading(true)
    const query = categoryName ? searchQuery(categoryName) : feedQuery
    setTimeout(() => {
      client.fetch(query).then((data) => {
        setPins(data)
        setLoading(false)
      })
    }, 250)
  }

  useEffect(() => {
    loadPins()
  }, [categoryName])

  if (loading)
    return <Spinner message="We are adding new ideas to your feed!"></Spinner>

  if (!pins?.length)
    return <h2 className='flex justify-center items-center text-gray-400 text-2xl'>No pins available</h2>

  return (
    <FeedContext.Provider value={loadPins}>
      <div>
        {pins && <MasonryLayout pins={pins}></MasonryLayout>}
      </div>
    </FeedContext.Provider>
  )
}

export default Feed
