import { api } from "@/lib/axios";

export interface GetWeekCustomersMetricsResponse {
  newCustomers: number;
  percentageChange: number;
}

export async function getWeekCustomersMetrics(): Promise<GetWeekCustomersMetricsResponse> {
  const response = await api.get<GetWeekCustomersMetricsResponse>(
    "/store/metrics/week-customers"
  );

  return response.data;
}
