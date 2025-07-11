import { api } from "@/lib/axios";

import { genders, brands, categories, sizes } from "@/utils/enums";

export interface Clothe {
  id?: string;
  name: string;
  priceInCents: number;
  description?: string | null;
  fabric: string;
  color: string;
  deleted: boolean;
  category: (typeof categories)[number];
  categoryOther?: string | null;
  gender: (typeof genders)[number];
  brand: (typeof brands)[number];
  brandOther?: string | null;
  size: (typeof sizes)[number];
  sizeOther?: string | null;
  height?: number | null;
  width?: number | null;
}

export interface CreateClotheBody {
  clothe: Clothe;
  images: File[];
}

export async function createClothe({ clothe, images }: CreateClotheBody) {
  const formData = new FormData();

  formData.append("clothe", JSON.stringify(clothe));

  images.forEach((image) => {
    formData.append("images", image);
  });

  return await api.post("/clothes", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
