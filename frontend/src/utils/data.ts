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
