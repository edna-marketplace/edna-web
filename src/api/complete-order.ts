import { api } from '@/lib/axios'

export async function completeOrder(orderId: string) {
  try {
    await api.put(`/orders/stores/${orderId}/complete`)
  } catch (error: any) {
    throw error
  }
}
