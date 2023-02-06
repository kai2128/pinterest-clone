import { SanityBase } from './types';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

export interface SanityBase{
  _id: string
  _type: string
}


export interface User extends SanityBase{
  _type: 'user'
  username: string
  image: string
}
