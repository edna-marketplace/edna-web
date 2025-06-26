import { api } from "@/lib/axios";

export interface GetWeekRevenueMetricsResponse {
  weekRevenue: number;
  percentageChange: number;
}

export async function getWeekRevenueMetrics(): Promise<GetWeekRevenueMetricsResponse> {
  const response = await api.get<GetWeekRevenueMetricsResponse>(
    "/store/metrics/week-revenue"
  );

  return response.data;
}
