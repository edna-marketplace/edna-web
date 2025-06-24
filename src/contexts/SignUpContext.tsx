import {
  AddressInfo,
  DayScheduleInfo,
  signUp,
  SignUpBody,
  StoreInfo,
} from "@/api/sign-up";
import { createContext, ReactNode, useState } from "react";

interface SignUpContextDataProps {
  email?: string | null;
  registerStore: (data: StoreInfo) => void;
  registerAddress: (data: AddressInfo) => void;
  registerSchedule: (data: DayScheduleInfo[]) => void;
  submitSignUp: (password: string) => Promise<void>;
}

export type SignUpContextProviderProps = {
  children: ReactNode;
};

export const SignUpContext = createContext<SignUpContextDataProps>(
  {} as SignUpContextDataProps
);

export function SignUpContextProvider({
  children,
}: SignUpContextProviderProps) {
  const [storeInfo, setStoreInfo] = useState<StoreInfo>({} as StoreInfo);
  const [addressInfo, setAdressInfo] = useState<AddressInfo>({} as AddressInfo);
  const [schedule, setScheduleInfo] = useState<DayScheduleInfo[]>([]);

  function registerStore(data: StoreInfo) {
    setStoreInfo(data);
  }

  function registerAddress(data: AddressInfo) {
    setAdressInfo(data);
  }

  function registerSchedule(data: DayScheduleInfo[]) {
    setScheduleInfo(data);
  }

  async function submitSignUp(password: string) {
    try {
      const signUpBody: SignUpBody = {
        store: { ...storeInfo, password },
        address: addressInfo,
        schedule: schedule,
      };

      const { onboardingUrl } = await signUp(signUpBody);

      window.location.href = onboardingUrl;
    } catch (error) {
      throw error;
    }
  }

  return (
    <SignUpContext.Provider
      value={{
        email: storeInfo.email,
        registerStore,
        registerAddress,
        registerSchedule,
        submitSignUp,
      }}
    >
      {children}
    </SignUpContext.Provider>
  );
}
