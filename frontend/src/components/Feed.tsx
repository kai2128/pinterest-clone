import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Spinner from './Spinner'
import MasonryLayout from './MasonryLayout'
import { feedQuery, searchQuery } from '@/utils/data'
import { client } from '@/client'
import type { Pin } from '@/types'

const Feed = () => {
  const [loading, setLoading] = useState(false)
  const { categoryName } = useParams()
  const [pins, setPins] = useState<Pin[]>([])
  const loadPins = () => {
    setLoading(true)
    const query = categoryName ? searchQuery(categoryName) : feedQuery
    client.fetch(query).then((data) => {
      setPins(data)
      setLoading(false)
    })
  }

  useEffect(() => {
    loadPins()
  }, [categoryName])

  if (loading)
    return <Spinner message="We are adding new ideas to your feed!"></Spinner>

  if(!pins?.length)
    return <h2>No pins available</h2>

  return (
    <div>
      {pins && <MasonryLayout pins={pins}></MasonryLayout>}
    </div>
  )
}

export default Feed
