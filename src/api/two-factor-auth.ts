import { api } from "@/lib/axios";
import { setCookie } from "nookies";

export interface TwoFactorAuthBody {
  email: string;
  password: string;
  otp: string;
}

export async function twoFactorAuth({
  email,
  password,
  otp,
}: TwoFactorAuthBody) {
  try {
    const response = await api.post("/auth", {
      email,
      password,
      otp,
    });

    const token = response.data;

    setCookie(null, "@edna:auth-token", token, {
      maxAge: 10 * 60 * 60, // 10 hours
      path: "/",
      sameSite: "lax",
    });
  } catch (error) {
    throw error;
  }
}
