import { GeneralInfoData } from "@/contexts/StoreContext";
import { api } from "@/lib/axios";

export async function updateStoreInfo(data: GeneralInfoData) {
  try {
    await api.put("/stores", data);
  } catch (error) {
    throw error;
  }
}
