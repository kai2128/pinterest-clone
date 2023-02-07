import { useStore } from '@nanostores/react'
import { computed, map } from 'nanostores'
import { categoriesQuery } from './../utils/data'
import type { Category } from '@/types'
import { client } from '@/client'

export const categories = map<Category[]>([])
let loading = false
export function categoriesStore() {
  if (categories.get()?.length === 0)
    fetchCategories()
  return {
    categories: useStore(categories),
    fetchCategories,
    otherCategory: computed(categories, categories => categories.find(c => c.name === 'Others')),
  }
}
function fetchCategories() {
  if (loading)
    return
  loading = true
  client.fetch(categoriesQuery).then(c => categories.set(c)).finally(() => loading = false)
}
