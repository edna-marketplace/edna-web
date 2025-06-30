import { api } from "@/lib/axios";
import { jwtDecode } from "jwt-decode";
import { parseCookies } from "nookies";

export interface GetAuthenticatedStoreResponse {
  id: string;
  bannerImageUrl: string | null;
  profileImageUrl: string | null;
  name: string;
  phone: string;
  targetCustomer: "ALL" | "MALE" | "FEMALE";
  distanceInKilometers: null;
  avgRating: string;
  description: string | null;
  cnpj: string;
  address: {
    id: string;
    number: string;
    cep: string;
    street: string;
    neighborhood: string;
    city: string;
  };
  schedule: {
    id: string;
    dayOfWeek: number;
    enabled: boolean;
    openingTimeInMinutes: number;
    closingTimeInMinutes: number;
  }[];
}

export async function getAuthenticatedStore(): Promise<GetAuthenticatedStoreResponse> {
  try {
    const { "@edna:auth-token": authToken } = parseCookies();

    const decodedToken = jwtDecode(authToken);

    const response = await api.get(`/stores/${decodedToken.sub}`);

    return response.data;
  } catch (error) {
    throw error;
  }
}
