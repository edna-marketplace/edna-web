import { api } from '@/lib/axios'

export async function getOrderById(orderId: string) {
  const response = await api.get(`/orders/stores/${orderId}`)

  return response.data
}
