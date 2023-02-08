import type { SanityImageSource } from '@sanity/image-url/lib/types/types'
import type { SanityBase } from './types'

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

export interface PinDetail extends SanityBase {
  about: string
  category: Category
  comments: Comment[]
  destination: string
  image: SanityImageSource
  imageUrl: string
  postedBy: PostedBy
  save: null
  title: string
}

export interface Comment {
  _key: string
  comment: string
  postedBy: PostedBy
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

export interface Category extends SanityBase {
  _type: 'category'
  _id: string
  name: string
  image: string
}

export interface MorePin extends SanityBase {
  destination: string
  image: SanityImageSource
  imageUrl: string
  postedBy: PostedBy
  save: Save[]
}
