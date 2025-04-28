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

export async function fetchClothesWithFilter() {
  const response = await api.post('/clothes/filter', {})

  console.log(response)

  return response.data
}
