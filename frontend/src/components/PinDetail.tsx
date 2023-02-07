import React from 'react'
import { useUserStore } from '@/stores/useUserStore'

const PinDetail = () => {
  const { user } = useUserStore()
  return (
    <div>PinDetail</div>
  )
}

export default PinDetail
