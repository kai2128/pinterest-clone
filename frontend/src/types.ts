import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

export interface SanityBase {
  _id: string
  _type: string
}

export interface Pin {
  _id: string
  destination: string
  image: SanityImageSource
  imageUrl: string
  postedBy: PostedBy
  save: null | Save[]
}

export interface Save {
  postedBy: PostedBy
  userId: string
}

export interface PostedBy {
  _id: string
  image: string
  username: string
}

export interface User extends SanityBase {
  _type: 'user'
  username: string
  image: string
}
