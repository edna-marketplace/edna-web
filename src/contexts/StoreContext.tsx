import {
  getAuthenticatedStore,
  GetAuthenticatedStoreResponse,
} from "@/api/get-authenticated-store";
import { updateStoreInfo } from "@/api/update-store-info";
import { createContext, ReactNode, useState } from "react";

export interface GeneralInfoData {
  name: string;
  cnpj: string;
  email: string;
  phone: string;
  targetCustomer: "MALE" | "FEMALE" | "ALL";
  description?: string | null;
}

export interface AddressInfoData {
  id: string;
  number: string;
  cep: string;
  street: string;
  neighborhood: string;
  city: string;
}

export interface DayScheduleData {
  id: string;
  dayOfWeek: number;
  enabled: boolean;
  openingTimeInMinutes: number;
  closingTimeInMinutes: number;
}

interface StoreContextDataProps {
  fetchStoreInfo: () => Promise<GetAuthenticatedStoreResponse>;
  getValue: (type: string) => any;
}

export type StoreContextProviderProps = {
  children: ReactNode;
};

export const StoreContext = createContext<StoreContextDataProps>(
  {} as StoreContextDataProps
);

export function StoreContextProvider({ children }: StoreContextProviderProps) {
  const [generalInfo, setGeneralInfo] = useState<GeneralInfoData>();
  const [address, setAddress] = useState<AddressInfoData>();
  const [schedule, setSchedule] = useState<DayScheduleData[]>([]);

  function getValue(value: string) {
    if (value === "generalInfo") {
      return generalInfo;
    }

    if (value === "address") {
      return address;
    }

    if (value === "schedule") {
      return schedule;
    }
  }

  async function fetchStoreInfo() {
    const data = await getAuthenticatedStore();

    setGeneralInfo({
      name: data.name,
      cnpj: data.cnpj,
      email: data.email,
      phone: data.phone,
      description: data.description,
      targetCustomer: data.targetCustomer,
    });

    setAddress(data.address);

    setSchedule(data.schedule);

    return data;
  }

  return (
    <StoreContext.Provider
      value={{
        fetchStoreInfo,
        getValue,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}
