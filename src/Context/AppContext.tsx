import { createContext, ReactNode, useState } from "react";

interface AppContextData {
  handleSetIsLoading: (value: boolean) => void;
  handleSetIsError: (value: boolean) => void;
  handleSetSearchedUser: (searchedUser: string) => void;
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
  const [user ,setUser] = useState("");

  function handleSetIsLoading (value: boolean) {
    setIsLoading(value);
  }

  function handleSetIsError (value: boolean) {
    setIsError(value);
  }

  function handleSetSearchedUser (searchedUser: string) {
    setUser(searchedUser)
    console.log(user)
  }

  return (
    <AppContext.Provider value={{isLoading, handleSetIsLoading, isError, handleSetIsError, handleSetSearchedUser}}>
      {children}
    </AppContext.Provider>
  )
}