import { useContext } from "react";
import { GithubDataContext } from "../Context/GithubDataContext";

export function useGithubData () {
  const { isLoading, userData, isError } = useContext(GithubDataContext);

  return {
    isLoading,
    userData,
    isError,
  }
}