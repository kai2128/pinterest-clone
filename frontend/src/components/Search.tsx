import type { Dispatch, SetStateAction } from 'react'
import React from 'react'
interface Props { searchTerm: string; setSearchTerm: Dispatch<SetStateAction<string>> }

const Search = ({ searchTerm, setSearchTerm }: Props) => {
  return (
    <div>Search</div>
  )
}

export default Search
