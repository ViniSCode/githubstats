import { useContext } from "react";
import { AppContext } from "../Context/AppContext";

export function useAppContext () {
  const { handleSetIsError, handleSetIsLoading, isError, isLoading, handleSetSearchType, searchType} = useContext(AppContext);

  return {
    handleSetIsError, 
    handleSetIsLoading, 
    isError, 
    isLoading,
    handleSetSearchType,
    searchType
  }
}