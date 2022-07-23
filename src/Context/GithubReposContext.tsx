import { useSession } from "next-auth/react";
import { createContext, ReactNode, useEffect, useState } from "react";
import { useAppContext } from "../hooks/useAppContext";

interface Repos{
  name: string;
  description?: string;
  html_url: string;
  language: string;
  stargazers_count?: number;
}

interface GithubReposContextData {
  repos: Repos[];
}

interface GithubReposProviderProps {
  children: ReactNode;
}

export const GithubReposContext = createContext<GithubReposContextData>({} as GithubReposContextData);

export function GithubReposProvider ({children}: GithubReposProviderProps) {

  const { handleSetIsLoading, handleSetIsError } = useAppContext();
  const [repos, setRepos] = useState<Repos[]>();
  const {data: session} = useSession();

  useEffect(() => {
    const fetchUserData = async () => {
      if (session) {
        try {
              const userId = session.user.image.split('/').pop().split('?')[0];
              const response = await fetch(`https://api.github.com/user/${userId}/repos`)
              const data = await response.json();
              
              if (!response.ok) {
                throw new Error("Error Status " + response.status)
              }
              
              setRepos(data);
              handleSetIsLoading(false)
            } 
            catch (err) {
              console.log(err.message)
              handleSetIsError(true);
            }
          }
        }
      fetchUserData();
    }, [])  

  return (
  <GithubReposContext.Provider value={{repos}}>
    {children}
  </GithubReposContext.Provider>
  )
}