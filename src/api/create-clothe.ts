import { api } from '@/lib/axios'

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
  category:
  | 'T_SHIRT'
  | 'SOCIAL_SHIRT'
  | 'SUIT'
  | 'ACTIVEWEAR'
  | 'DRESS'
  | 'PANTS'
  | 'SHORTS'
  | 'JACKET_HOODIE'
  | 'UNDERWEAR'
  | 'FOOTWEAR'
  | 'ACCESSORIES'
  | 'SLEEPWEAR'
  | 'SWIMWEAR'
  size:
  | 'XS'
  | 'S'
  | 'M'
  | 'L'
  | 'XL_LARGER'
  | 'N_34'
  | 'N_36'
  | 'N_38'
  | 'N_40'
  | 'N_42'
  | 'N_44'
  | 'N_46'
  | 'N_48'
  | 'N_50'
  | 'N_52'
  | 'N_54'
  | 'N_56_LARGER'
  | 'OTHER'
  brand:
  | 'NIKE'
  | 'ADIDAS'
  | 'HERING'
  | 'ZARA'
  | 'FARM'
  | 'CEA'
  | 'RENNER'
  | 'OTHER'
  gender: 'MALE' | 'FEMALE' | 'UNISEX'
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
