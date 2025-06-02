import { api } from "@/lib/axios";

export interface GetWeekOrdersMetricsResponse {
  newOrders: number;
  percentageChange: number;
}

const mockData = {
  newOrders: 26,
  percentageChange: 31.2,
};

export async function getWeekOrdersMetrics(): Promise<GetWeekOrdersMetricsResponse> {
  const response = mockData;

  return response;
}
