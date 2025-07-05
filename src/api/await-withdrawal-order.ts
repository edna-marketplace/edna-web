import { api } from '@/lib/axios'

export async function awaitWithdrawalOrder(orderId: string) {
  try {
    await api.put(`/orders/stores/${orderId}/await-withdrawal`)
  } catch (error: any) {
    throw error
  }
}
