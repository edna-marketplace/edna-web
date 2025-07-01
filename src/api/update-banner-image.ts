import { api } from "@/lib/axios";

export async function updateBannerImage(image: File) {
  const formData = new FormData();

  formData.append("file", image);

  return await api.post("/stores/images/banner", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
