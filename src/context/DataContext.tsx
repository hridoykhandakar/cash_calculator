import { ReactNode, createContext, useState } from "react";
type Name = {
  name: string;
  addName: (name: string) => void;
};
export const NameContext = createContext<Name | null>(null);

export function NameProvider({ children }: { children: ReactNode }) {
  const [name, setName] = useState("");
  const addName = (name: string): void => {
    setName(name);
  };
  return (
    <NameContext.Provider value={{ name, addName }}>
      {children}
    </NameContext.Provider>
  );
}
