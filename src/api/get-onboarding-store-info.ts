import { api } from "@/lib/axios";

interface GetOnboardingStoreStatusResponse {
  isStripeOnbardingCompleted: boolean;
}

export async function getOnboardingStoreStatus(
  email: string
): Promise<GetOnboardingStoreStatusResponse> {
  try {
    const resposne = await api.get(`/public/get-onboarding-status/${email}`);

    return resposne.data;
  } catch (error) {
    throw error;
  }
}
