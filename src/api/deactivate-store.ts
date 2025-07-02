import { api } from "@/lib/axios";

export async function deleteStore() {
  try {
    await api.delete("/stores");
  } catch (error) {
    throw error;
  }
}
