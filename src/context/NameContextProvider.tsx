import { useState, ReactNode } from "react";
import { NameContext } from "./NameContext";
type Name = {
  name: string;
  email: string;
};
export const NameContextProvider = ({ children }: { children: ReactNode }) => {
  const { name, setName } = useState<Name | null>(null);
  return (
    <NameContext.Provider value={{ name }}>{children}</NameContext.Provider>
  );
};
