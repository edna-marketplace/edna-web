import { api } from '@/lib/axios'

export async function verifyDuplicateSignUp(data: any) {
  try {
    const response = await api.post('/public/stores/verify-duplicate', data)

    return response.data
  } catch (error) {
    throw error
  }
}
