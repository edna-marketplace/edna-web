import { api } from '@/lib/axios'

export async function deleteClothe(id: string) {
  await api.delete(`/clothes/${id}`)
}
