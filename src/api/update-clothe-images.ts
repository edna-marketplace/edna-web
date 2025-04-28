import { api } from '@/lib/axios'

export async function updateClotheImages(
  newImages: File[],
  removedImages: string[],
  clotheId: string,
) {
  const formData = new FormData()

  newImages.forEach((file) => {
    formData.append('newImages', file)
  })

  if (removedImages.length > 0) {
    formData.append('removedImages', removedImages.join(','))
  }

  return await api.put(`/clothes/images/${clotheId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}
