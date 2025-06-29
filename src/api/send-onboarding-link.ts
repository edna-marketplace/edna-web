import { api } from "@/lib/axios";

export async function sendOnboardingLink(email: string) {
  try {
    await api.post(`/public/send-onboarding-link/${email}`);
  } catch (error) {
    throw error;
  }
}
