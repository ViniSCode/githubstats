import { createContext, ReactNode, useState } from "react";

interface AppContextData {
  handleSetIsLoading: (value: boolean) => void;
  handleSetIsError: (value: boolean) => void;
  handleSetIsSearchModalOpen: (value: boolean) => void;
  handleSetUser: (id, type: string) => void;
  isError: boolean;
  isLoading: boolean;
  isSearchModalOpen: boolean;
  user: {
    id: string;
    type: string;
  };
}

interface AppProviderProps {
  children: ReactNode;
}

type User = {
  id: string;
  type: string;
}

export const AppContext = createContext<AppContextData>({} as AppContextData);

export function AppProvider ({children}: AppProviderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [user, setUser] = useState<User>({
    id: '',
    type: ''
  });

  function handleSetIsLoading(value: boolean) {
    setIsLoading(value);
  }

  function handleSetIsError(value: boolean) {
    setIsError(value);
  }

  function handleSetIsSearchModalOpen (value: boolean) {
    setIsSearchModalOpen(value);
  }

  function handleSetUser(id, type: string) {
    setUser({
      id: id,
      type: type
    });
  }

  return (
    <AppContext.Provider value={{isLoading, handleSetIsLoading, isError, handleSetIsError, handleSetIsSearchModalOpen, isSearchModalOpen, handleSetUser, user}}>
      {children}
    </AppContext.Provider>
  )
}