import React from 'react'
import Masonry from 'react-masonry-css'

import Pin from './Pin'
import type { MorePin, Pin as PinType } from '@/types'
const breakpointObj = {
  default: 4,
  3000: 6,
  2000: 5,
  1200: 3,
  1000: 2,
  500: 1,
}
const MasonryLayout = ({ pins }: { pins: PinType[] | MorePin[] }) => {
  return (
    <div>
      <Masonry className='flex animate-slide-fwd' breakpointCols={breakpointObj}>
        {pins?.map(p => <div className='w-max' key={p._id}><Pin pin={p}></Pin> </div>) }
      </Masonry>
    </div>
  )
}

export default MasonryLayout
