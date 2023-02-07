import React from 'react'
import { useUserStore } from '@/stores/useUserStore'

const CreatePin = () => {
  const { user } = useUserStore()
  return (
    <div>CreatePin</div>
  )
}

export default CreatePin
