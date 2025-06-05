import { api } from "@/lib/axios";

export interface GetWeekOrdersMetricsResponse {
  newOrders: number;
  percentageChange: number;
}

export async function getWeekOrdersMetrics(): Promise<GetWeekOrdersMetricsResponse> {
  const token = localStorage.getItem("token");

  const response = await api.get<GetWeekOrdersMetricsResponse>(
    "/store/metrics/week-orders",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
}
