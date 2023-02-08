import type { Dispatch, SetStateAction } from 'react'
import React, { useEffect, useState } from 'react'

import Spinner from './Spinner'
import MasonryLayout from './MasonryLayout'
import type { Pin as PinType } from '@/types'
import { client } from '@/client'
import { feedQuery, searchQuery } from '@/utils/data'
interface Props { searchTerm: string; setSearchTerm: Dispatch<SetStateAction<string>> }

const Search = ({ searchTerm, setSearchTerm }: Props) => {
  const [pins, setPins] = useState<PinType[]>()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    setPins([])
    if (searchTerm) {
      client.fetch(searchQuery(searchTerm.toLowerCase())).then((r) => {
        setPins(r)
      }).finally(() => {
        setLoading(false)
      })
    }
    else {
      client.fetch(feedQuery).then((r) => {
        setPins(r)
      }).finally(() => {
        setLoading(false)
      })
    }
  }, [searchTerm])
  return (
    <div>
      {loading && <Spinner message='Searching for pins...'></Spinner>}
      {pins?.length !== 0 && <MasonryLayout pins={pins!}></MasonryLayout>}
      {pins?.length === 0 && searchTerm !== '' && !loading
        && <div className="mt-10 text-center text-xl">No pins found</div>
      }
    </div>
  )
}

export default Search
