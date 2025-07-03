import { api } from "@/lib/axios";

export interface RevenuePeriod {
  year: number;
  month: number;
  revenuePeriod: number;
}

export async function fetchRevenueByPeriod(
  periodInMonths: number
): Promise<RevenuePeriod[]> {
  const response = await api.get(
    `/store/metrics/dashboard?period=${periodInMonths}`
  );

  return response.data;
}
