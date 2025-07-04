import { api } from '@/lib/axios'

export async function refundOrder(paymentIntentId: string) {
  try {
    await api.post(`/orders/create-full-refund/${paymentIntentId}`)
  } catch (error: any) {
    throw error
  }
}
