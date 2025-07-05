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

export async function getOrderById(
  orderId: string
): Promise<GetOrderByIdResponse> {
  const response = await api.get(`/orders/stores/${orderId}`);

  return response.data;
}
