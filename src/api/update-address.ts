import { AddressInfoData } from "@/contexts/StoreContext";
import { api } from "@/lib/axios";

export async function updateAddress(data: AddressInfoData) {
  try {
    await api.put("/addresses", data);
  } catch (error) {
    throw error;
  }
}
