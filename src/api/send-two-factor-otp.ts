import { api } from "@/lib/axios";

interface sendTwoFactorOTPBody {
  email: string;
  password: string;
}

export async function sendTwoFactorOTP({
  email,
  password,
}: sendTwoFactorOTPBody) {
  try {
    await api.post("/public/two-factor-otp", { email, password });
  } catch (error) {
    throw error;
  }
}
