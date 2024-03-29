import sanityClient from '@sanity/client'

import imageUrlBuider from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

export const client = sanityClient({
  projectId: import.meta.env.VITE_REACT_APP_SANITY_PROJECT_ID,
  dataset: 'production',
  apiVersion: '2021-11-16',
  useCdn: true,
  token: import.meta.env.VITE_REACT_APP_SANITY_TOKEN,
})

const builder = imageUrlBuider(client)

export const urlFor = (src: SanityImageSource | string) => builder.image(src)
