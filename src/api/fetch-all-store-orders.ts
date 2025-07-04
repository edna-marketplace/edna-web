import { api } from '@/lib/axios'
import { StoreOrderDTO } from './fetch-orders-with-filter'

export async function fetchAllStoreOrders(): Promise<StoreOrderDTO[]> {
  try {
    const response = await api.get(`/orders/stores/all`)
    return response.data
  } catch (error) {
    throw error
  }
}
