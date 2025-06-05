import { api } from "@/lib/axios";

export interface GetWeekRevenueMetricsResponse {
  total: number;
  percentageChange: number;
}

export async function getWeekRevenueMetrics(): Promise<GetWeekRevenueMetricsResponse> {
  const token = localStorage.getItem("token");

  const response = await api.get<GetWeekRevenueMetricsResponse>(
    "/store/metrics/week-revenue",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
}
