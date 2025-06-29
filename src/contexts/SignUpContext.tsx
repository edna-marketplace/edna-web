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
  getValue: (
    value: string
  ) => StoreInfo | AddressInfo | DayScheduleInfo[] | string | undefined;
  clearValues: () => void;
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
  const [stripeOnboardingUrl, setStripeOnboardingUrl] = useState("");
  const [storeInfo, setStoreInfo] = useState<StoreInfo>({} as StoreInfo);
  const [addressInfo, setAdressInfo] = useState<AddressInfo>({} as AddressInfo);
  const [schedule, setScheduleInfo] = useState<DayScheduleInfo[]>([]);

  function getValue(value: string) {
    if (value === "storeInfo") {
      return storeInfo;
    }

    if (value === "addressInfo") {
      return addressInfo;
    }

    if (value === "scheduleInfo") {
      return schedule;
    }

    if (value === "onboardingUrl") {
      return stripeOnboardingUrl;
    }
  }

  function clearValues() {
    setStoreInfo({} as StoreInfo);
    setAdressInfo({} as AddressInfo);
    setScheduleInfo([]);
  }

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

      setStripeOnboardingUrl(onboardingUrl);
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
        getValue,
        clearValues,
      }}
    >
      {children}
    </SignUpContext.Provider>
  );
}
