import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { userQuery } from './../utils/data'
import { client } from '@/client'
import type { User } from '@/types'

const [user, setUser] = useState<User>()
function initUserInfo() {
  const userInfo = JSON.parse(localStorage.getItem('user') || '')
  if (!userInfo)
    return

  const query = userQuery(userInfo.sub)
  client.fetch(query).then((r) => {
    setUser(r[0])
  })
}
export function useUserStore() {
  const navigate = useNavigate()
  return {
    user,
    setUser,
    initUserInfo,
    login(_user: OAuthUser) {
      localStorage.setItem('user', JSON.stringify(_user))
      const { name, picture, sub: googleId } = _user
      const doc = {
        _id: googleId,
        _type: 'user',
        username: name,
        image: picture,
      }
      // sign up new user
      client.createIfNotExists(doc).then(() => {
        navigate('/', { replace: true })
      })
    },
  }
}
