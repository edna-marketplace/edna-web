import { api } from "@/lib/axios";

export interface GetWeekCustomersMetricsResponse {
  newCustomers: number;
  percentageChange: number;
}

const mockData = {
  newCustomers: 12,
  percentageChange: 10.2,
};

export async function getWeekCustomersMetrics(): Promise<GetWeekCustomersMetricsResponse> {
  const response = mockData;

  return response;
}
