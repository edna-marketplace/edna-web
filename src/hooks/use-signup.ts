import { SignUpContext } from "@/contexts/SignUpContext"
import { useContext } from "react"

export function useSignUp() {
  const context = useContext(SignUpContext)

  return context
}