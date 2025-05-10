import { api } from '@/lib/axios'

import { genders, brands, categories, sizes } from '@/utils/enums'

export interface Clothe {
  id?: string
  name: string
  priceInCents: number
  description?: string | number | readonly string[] | undefined
  fabric: string
  color: string
  store: object
  deleted: boolean
  categoryOther?: string | null
  brandOther?: string | null
  sizeOther?: string | null
  category: typeof categories[number]
  size: typeof sizes[number]
  brand: typeof brands[number]
  gender: typeof genders[number]
}

export interface CreateClotheBody {
  clothe: Clothe
  files: File[]
}

export async function createClothe({ clothe, files }: CreateClotheBody) {
  const formData = new FormData()

  formData.append('clothe', JSON.stringify(clothe))

  files.forEach((file) => {
    formData.append('files', file)
  })

  return await api.post('/clothes', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}
