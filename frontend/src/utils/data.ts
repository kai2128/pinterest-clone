import { PinDetail } from './../types';
export const userQuery = (userId: string) => {
  const query
    // groq
    = `*[_type == "user" && _id == '${userId}']`
  return query
}

export const searchQuery = (searchTerm?: string) => {
  const query
    // groq
    = `*[_type == 'pin' && title match '${searchTerm}*' || category match '${searchTerm}*' || about match '${searchTerm}*']{
      image {
        asset -> {
          url
        }
      },
      imageUrl: image.asset->url ,
      _id,
      destination,
      postedBy -> {
        _id,
        username,
        image
      },
      save[]{
        _key,
        postedBy -> {
          _id,
          username,
          image
        },
      },
    }`

  return query
}

export const pinDetailQuery = (pinId: string) => {
  return `
    *[_type == 'pin' && _id == '${pinId}']{
      image{
        asset->{
          url
        }
      },
      "imageUrl": image.asset->url,
      _id,
      title,
      about,
      category->{
        _id,
        name
      },
      destination,
      postedBy->{
        _id,
        username,
        image
      },
      save[]{
        postedBy->{
          _id,
          username,
          image
        },
      },
      comments[]{
        comment,
        _key,
        postedBy->{
          _id,
          username,
          image
        }
      }
    }
  `
}

export const pinDetailMoreQuery = (pin: PinDetail) => {
  return `
    *[_type == 'pin' && category->_id == '${pin.category._id}' && _id != '${pin._id}']{
      image{
        asset->{
          url
        }
      },
      "imageUrl": image.asset.url,
      _id,
      destination,
      postedBy->{
        _id,
        username,
        image
      },
      save[]{
        _key,
        postedBy->{
          _id,
          username,
          image
        }
      }
    }
  `
}

// eslint-disable-next-line @typescript-eslint/quotes
export const categoriesQuery = `*[ _type == 'category']{image, name, _id, _type}`

export const feedQuery = `*[ _type == 'pin'] | order(_createdAt desc) {
      image {
        asset -> {
          url
        }
      },
      "imageUrl": image.asset->url,
      _id,
      destination,
      postedBy -> {
        _id,
        username,
        image
      },
      save[]{
        _key,
        postedBy -> {
          _id,
          username,
          image
        },
      },
}`
