import { api } from "@/lib/axios";

export interface GetMonthRevenueMetricsResponse {
  weekRevenue: number;
  percentageChange: number;
}

export async function getMonthRevenueMetrics(): Promise<GetMonthRevenueMetricsResponse> {
  const response = await api.get<GetMonthRevenueMetricsResponse>(
    "/store/metrics/month-revenue"
  );

  return response.data;
}
