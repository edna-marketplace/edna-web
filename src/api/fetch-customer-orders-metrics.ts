import { api } from "@/lib/axios";

export interface FetchCustomerOrdersRequest {
  status?: string;
  startDate?: string;
  endDate?: string;
  year?: number;
}

export interface Order {
  id: string;
  createdAt: string;
  total: number;
}

export interface FetchCustomerOrdersResponse {
  orders: Order[];
}

export async function fetchCustomerOrders(
  params: FetchCustomerOrdersRequest
): Promise<FetchCustomerOrdersResponse> {
  const token = localStorage.getItem("token");

  const response = await api.post<FetchCustomerOrdersResponse>(
    "/orders/customers/filter",
    params,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
}
