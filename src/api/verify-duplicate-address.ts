import { api } from '@/lib/axios'

export async function verifyDuplicateAddress(data: any) {
  try {
    const response = await api.post('/public/addresses/verify-duplicate', data)

    return response.data
  } catch (error) {
    throw error
  }
}
