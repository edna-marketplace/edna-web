import { api } from "@/lib/axios";

export interface StoreInfo {
  name: string;
  cnpj: string;
  email: string;
  phone: string;
  targetCustomer: "MALE" | "FEMALE" | "ALL";
  password?: string;
}

export interface AddressInfo {
  number: number;
  cep: string;
  street: string;
  neighborhood: string;
  city: string;
}

export interface DayScheduleInfo {
  dayOfWeek: number;
  enabled: boolean;
  openingTimeInMinutes: number;
  closingTimeInMinutes: number;
}

export interface SignUpBody {
  store: StoreInfo;
  address: AddressInfo;
  schedule: DayScheduleInfo[];
}

export interface SignUpResponse {
  storeId: string;
  onboardingUrl: string;
}

export async function signUp(data: SignUpBody): Promise<SignUpResponse> {
  try {
    const response = await api.post("/public/stores", data);

    return response.data;
  } catch (error) {
    throw error;
  }
}
