import type { NavigateFunction } from 'react-router-dom'
import { map } from 'nanostores'
import { useStore } from '@nanostores/react'
import { userQuery } from './../utils/data'
import { client } from '@/client'
import type { User } from '@/types'

export const userStore = map<User>()
export function useUserStore(navigate?: NavigateFunction) {
  function setUser(u: User) {
    userStore.set(u)
  }
  function fetchUserInfo() {
    const userInfo = JSON.parse(localStorage.getItem('user') || '""')
    if (!userInfo) {
      localStorage.clear()
      navigate && navigate('/login', { replace: true })
      return
    }

    const query = userQuery(userInfo.sub)
    client.fetch(query).then((r) => {
      setUser(r[0])
    })
  }
  function logout() {
    localStorage.clear()
    navigate && navigate('/login', { replace: true })
  }
  return {
    user: useStore(userStore),
    setUser,
    fetchUserInfo,
    logout,
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
        navigate && navigate('/', { replace: true })
      })
      fetchUserInfo()
    },
  }
}
