import { api } from "@/lib/axios";
import { brands, genders, sizes } from "@/utils/enums";

export async function getClotheById(clotheId: string) {
  const response = await api.get(`/clothes/${clotheId}`);

  return response.data;
}
