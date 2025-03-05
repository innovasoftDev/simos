import React from "react";
import { Service } from "../data/schema";

export type ServiceDialogType = "add" | "edit" | "delete";

interface ServiceContextType {
  open: ServiceDialogType | null;
  setOpen: (str: ServiceDialogType | null) => void;
  currentRow: Service | null;
  setCurrentRow: React.Dispatch<React.SetStateAction<Service | null>>;
}

const ServiceContext = React.createContext<ServiceContextType | null>(null);

interface Props {
  children: React.ReactNode;
  value: ServiceContextType;
}

export default function ServiceContextProvider({ children, value }: Props) {
  return (
    <ServiceContext.Provider value={value}>{children}</ServiceContext.Provider>
  );
}

export const useServiceContext = () => {
  const usersContext = React.useContext(ServiceContext);

  if (!usersContext) {
    throw new Error(
      "useServiceContext has to be used within <ServiceContext.Provider>"
    );
  }

  return usersContext;
};
