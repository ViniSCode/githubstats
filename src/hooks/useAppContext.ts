import { useContext } from "react";
import { AppContext } from "../Context/AppContext";

export function useAppContext () {
  const { handleSetIsError, handleSetIsLoading, isError, isLoading } = useContext(AppContext);

  return {
    handleSetIsError, 
    handleSetIsLoading, 
    isError, 
    isLoading
  }
}