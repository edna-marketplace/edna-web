import { api } from "@/lib/axios";

export interface PendingOrder {
  id: string;
  customerName: string;
  total: number;
  createdAt: string;
  status: string;
}

export async function fetchPendingOrders(): Promise<PendingOrder[]> {
  const token = localStorage.getItem("token");

  const response = await api.get<PendingOrder[]>(
    "/store/metrics/pending-orders",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
}
