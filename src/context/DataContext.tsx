import { createContext, useState } from "react";

export const DataContext = createContext() 

export const DataProvider = ({children}) =>{
  const [fishName, setFishName] = useState("Rui")
  
<DataContext.Provider>
  {children}
</DataContext.Provider>
}