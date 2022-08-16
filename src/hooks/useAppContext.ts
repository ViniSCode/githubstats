import { useContext } from "react";
import { AppContext } from "../Context/AppContext";

export function useAppContext () {
  const { handleSetIsError, handleSetIsLoading, isError, isLoading, handleSetIsSearchModalOpen, isSearchModalOpen} = useContext(AppContext);

  return {
    handleSetIsError, 
    handleSetIsLoading, 
    isError, 
    isLoading,
    handleSetIsSearchModalOpen,
    isSearchModalOpen
  }
}