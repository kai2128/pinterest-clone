import { useStore } from '@nanostores/react'
import { map } from 'nanostores'
import { categoriesQuery } from './../utils/data'
import type { Category } from '@/types'
import { client } from '@/client'

export const categories = map<Category[]>([])

export function categoriesStore() {
  if (categories.get()?.length === 0)
    fetchCategories()
  return {
    categories: useStore(categories),
    fetchCategories,
  }
}
function fetchCategories() {
  client.fetch(categoriesQuery).then(c => categories.set(c))
}
