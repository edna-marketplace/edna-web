import { api } from "@/lib/axios";
import { brands, categories, genders, sizes } from "@/utils/enums";

export interface ClotheSummary {
  id: string;
  name: string;
  priceInCents: number;
  brand: (typeof brands)[number];
  brandOther: string;
  size: (typeof sizes)[number];
  sizeOther: string;
  imageURL: string;
  storeImageUrl: string | null;
}

export interface FetchClothesWithFilterResponse {
  clothes: ClotheSummary[];
  meta: {
    pageIndex: number;
    perPage: number;
    totalCount: number;
  };
}

export interface FetchClothesWithFilterRequest {
  limit?: number;
  page?: number;
  name?: string;
  fabric?: string;
  color?: string;
  storeId?: string;
  category?: (typeof categories)[number];
  size?: (typeof sizes)[number];
  brand?: (typeof brands)[number];
  gender?: (typeof genders)[number];
}

export async function fetchClothesWithFilter({
  limit,
  page,
  name,
  category,
  brand,
  color,
  fabric,
  gender,
  size,
  storeId,
}: FetchClothesWithFilterRequest): Promise<FetchClothesWithFilterResponse> {
  const response = await api.post("/clothes/filter", {
    limit,
    page,
    name,
    category,
    brand,
    color,
    fabric,
    gender,
    size,
    storeId,
  });

  return response.data;
}
