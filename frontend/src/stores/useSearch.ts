import { useState } from 'react'

const [searchTerm, setSearchTerm] = useState('')

export function useSearchTerm() {
  return {
    searchTerm,
    setSearchTerm,
  }
}
