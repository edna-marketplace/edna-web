import { api } from "@/lib/axios";
import { brands, genders, sizes } from "@/utils/enums";
export interface GetOrderByIdResponse {
  orderId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  orderStatus: string;
  clotheName: string;
  clothePriceInCents: number;
  clotheGender: (typeof genders)[number];
  clotheSize: (typeof sizes)[number];
  clotheSizeOther: string;
  clotheBrand: (typeof brands)[number];
  clotheBrandOther: string;
  createdAt: string;
}

export async function getClotheById(
  clotheId: string
): Promise<GetOrderByIdResponse> {
  const response = await api.get(`/clothes/${clotheId}`);

  return response.data;
}
