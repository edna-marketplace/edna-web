import { DayScheduleData } from "@/contexts/StoreContext";
import { api } from "@/lib/axios";

export async function updateSchedule(data: DayScheduleData[]) {
  try {
    await api.put("/schedules", data);
  } catch (error) {
    throw error;
  }
}
