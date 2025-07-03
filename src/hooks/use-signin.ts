import { SignInContext } from "@/contexts/SignInContext";
import { useContext } from "react";

export function useSignIn() {
  const context = useContext(SignInContext);

  return context;
}
