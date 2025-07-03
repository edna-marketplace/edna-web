import { StoreContext } from "@/contexts/StoreContext";
import { useContext } from "react";

export function useStore() {
  const context = useContext(StoreContext);

  return context;
}
