import { createContext, ReactNode, useState } from "react";

interface SignInContextDataProps {
  email: string;
  password: string;
  setValue: (type: string, value: string) => void;
}

export type SignInContextProviderProps = {
  children: ReactNode;
};

export const SignInContext = createContext<SignInContextDataProps>(
  {} as SignInContextDataProps
);

export function SignInContextProvider({
  children,
}: SignInContextProviderProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function setValue(type: string, value: string) {
    type === "email" && setEmail(value);

    type === "password" && setPassword(value);
  }

  function clearValues() {
    setEmail("");
    setPassword("");
  }

  return (
    <SignInContext.Provider
      value={{
        email,
        password,
        setValue,
      }}
    >
      {children}
    </SignInContext.Provider>
  );
}
