import { createContext, ReactNode, useState } from "react";

interface AppContextData {
  handleSetIsLoading: (value: boolean) => void;
  handleSetIsError: (value: boolean) => void;
  isError: boolean;
  isLoading: boolean;
}

interface AppProviderProps {
  children: ReactNode;
}

export const AppContext = createContext<AppContextData>({} as AppContextData);

export function AppProvider ({children}: AppProviderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  function handleSetIsLoading (value: boolean) {
    setIsLoading(value);
  }

  function handleSetIsError (value: boolean) {
    setIsError(value);
  }

  return (
    <AppContext.Provider value={{isLoading, handleSetIsLoading, isError, handleSetIsError}}>
      {children}
    </AppContext.Provider>
  )
}