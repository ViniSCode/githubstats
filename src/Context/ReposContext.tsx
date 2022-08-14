import { createContext, ReactNode, useEffect, useState } from "react";
import { useAppContext } from "../hooks/useAppContext";

interface Repo{
  name: string;
  description?: string;
  html_url: string;
  language: string;
  stargazers_count?: number;
}

interface ReposContextData {
  repos: Repo[];
  reposTotalCount: number;
}

interface ReposProviderProps {
  children: ReactNode;
}

export const ReposContext = createContext<ReposContextData>({} as ReposContextData);

export function ReposProvider ({children}: ReposProviderProps) {

  const { handleSetIsLoading, handleSetIsError } = useAppContext();
  const [repos, setRepos] = useState<Repo[]>();
  const [reposTotalCount, setReposTotalCount] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
        try {
              // const userId = session.user.image.split('/').pop().split('?')[0];
              // const response = await fetch(`https://api.github.com/user/${userId}/repos`)
              // const data = await response.json();
              
              // if (!response.ok) {
              //   throw new Error("Error Status " + response.status)
              // }
              
              // setRepos(data);
              // setReposTotalCount(data.length);
              handleSetIsLoading(false)
            } 
            catch (err) {
              console.log(err.message)
              handleSetIsError(true);
            }
        }
      fetchUserData();
    }, [])  

  return (
  <ReposContext.Provider value={{repos, reposTotalCount}}>
    {children}
  </ReposContext.Provider>
  )
}