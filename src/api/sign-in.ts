import { api } from "@/lib/axios"
import { setCookie } from "nookies"

export interface SignInBody {
  email: string
  password: string
}

export async function signIn({ email, password }: SignInBody) {
  try {
    const response = await api.post('/auth', {
      email,
      password
    })

    const token = response.data

    setCookie(null, '@edna:auth-token', token, {
      maxAge: 10 * 60 * 60, // 10 hours
      path: '/',
      sameSite: 'lax',
    })
  } catch (error) {
    throw error
  }
}