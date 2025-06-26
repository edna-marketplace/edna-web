import { api } from "@/lib/axios";

export interface GetWeekOrdersMetricsResponse {
  newOrders: number;
  percentageChange: number;
}

export async function getWeekOrdersMetrics(): Promise<GetWeekOrdersMetricsResponse> {
  const response = await api.get<GetWeekOrdersMetricsResponse>(
    "/store/metrics/week-orders"
  );

  return response.data;
}
