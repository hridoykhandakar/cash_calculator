import React from 'react'
type Name = {
  name: string;
};
export const NameContext = React.createContext<Name|null>(null);

