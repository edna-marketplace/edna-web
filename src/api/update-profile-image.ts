import { api } from "@/lib/axios";

export async function updateProfileImage(image: File) {
  const formData = new FormData();

  formData.append("file", image);

  return await api.post("/stores/images/profile", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
