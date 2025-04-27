import { api } from "@/lib/axios";

export async function getClotheById(clotheId: string) {
  const response = await api.get(`/clothes/${clotheId}`)

  return response.data
}