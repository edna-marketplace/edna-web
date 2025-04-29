import { api } from '@/lib/axios'

export interface ClotheSummary {
  id: string
  name: string
  priceInCents: number
  brand: string
  brandOther: string
  size: string
  sizeOther: string
  imageURL: string
  storeImageUrl: string | null
}

export interface FetchClothesWithFilterResponse {
  clothes: ClotheSummary[]
  meta: {
    pageIndex: number
    perPage: number
    totalCount: number
  }
}

export interface FetchClothesWithFilterRequest {
  limit?: string
  page?: string
  name?: string
  fabric?: string
  color?: string
  storeId?: string
  gender?:
  | "MALE"
  | "FEMALE"
  | "UNISEX"
  category?:
  | 'ALL'
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
  | null
  size?:
  | 'ALL'
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
  | null
  brand?:
  | 'ALL'
  | 'NIKE'
  | 'ADIDAS'
  | 'HERING'
  | 'ZARA'
  | 'FARM'
  | 'CEA'
  | 'RENNER'
  | 'OTHER'
  | null
}

export async function fetchClothesWithFilter({
  limit,
  page,
  name,
  category,
  brand,
  color,
  fabric,
  gender,
  size,
  storeId
}: FetchClothesWithFilterRequest) {
  const response = await api.post('/clothes/filter', {
    limit,
    page,
    name,
    category,
    brand,
    color,
    fabric,
    gender,
    size,
    storeId
  })

  return response.data
}
