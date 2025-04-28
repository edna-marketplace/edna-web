import { api } from '@/lib/axios'
import { Clothe } from './create-clothe'

export async function updateClothe({
  id,
  name,
  priceInCents,
  description,
  category,
  gender,
  brand,
  brandOther,
  size,
  sizeOther,
  fabric,
  color,
}: Clothe) {
  await api.put('/clothes', {
    id,
    name,
    priceInCents,
    description,
    category,
    gender,
    brand,
    brandOther,
    size,
    sizeOther,
    fabric,
    color,
  })
}
