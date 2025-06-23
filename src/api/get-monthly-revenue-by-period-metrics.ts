import { api } from "@/lib/axios";

export interface RevenuePeriod {
  year: number;
  month: number;
  revenuePeriod: number;
}

export async function fetchRevenueByPeriod(): Promise<RevenuePeriod[]> {
  const token = localStorage.getItem("token");

  const response = await api.get<RevenuePeriod[]>("/store/metrics/dashboard", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
