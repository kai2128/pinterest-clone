import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Spinner from './Spinner'
import MasonryLayout from './MasonryLayout'
import { feedQuery, searchQuery } from '@/utils/data'
import { client } from '@/client'
import type { Pin } from '@/types'

const Feed = () => {
  const [loading, setLoading] = useState(false)
  const { categoryId } = useParams()
  const [pins, setPins] = useState<Pin[]>([])

  useEffect(() => {
    setLoading(true)
    const query = categoryId ? searchQuery(categoryId) : feedQuery
    client.fetch(query).then((data) => {
      setPins(data)
      setLoading(false)
    })
  }, [categoryId])

  if (loading)
    return <Spinner message="We are adding new ideas to your feed!"></Spinner>

  return (
    <div>
      {pins && <MasonryLayout pins={pins}></MasonryLayout>}
    </div>
  )
}

export default Feed
