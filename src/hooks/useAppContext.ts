import { useContext } from "react";
import { AppContext } from "../Context/AppContext";

export function useAppContext () {
  const {  handleSetIsSearchModalOpen, isSearchModalOpen, handleSetUser, user} = useContext(AppContext);

  return {
    handleSetIsSearchModalOpen,
    isSearchModalOpen,
    handleSetUser, 
    user
  }
}