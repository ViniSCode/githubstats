import { createContext, ReactNode, useEffect, useState } from "react";
import { useAppContext } from "../hooks/useAppContext";
import { useGithubUserData } from "../hooks/useGithubData";

type StarredRepos = {
  name: string;
  description: string;
  html_url: string;
  language: string;
  stargazers_count: number;
}

interface GithubReposContextData {
  starredRepos: StarredRepos;
}

interface GithubReposProviderProps {
  children: ReactNode;
}

export const GithubReposContext = createContext<GithubReposContextData>({} as GithubReposContextData);

export function GithubReposProvider ({children}: GithubReposProviderProps) {
  const { handleSetIsLoading, handleSetIsError } = useAppContext();
  const [starredRepos, setStarredRepos] = useState<StarredRepos>();
  const { userGithubId } = useGithubUserData();

    useEffect(() => {
      const fetchUserData = async () => {
          try {
            const response = await fetch(`https://api.github.com/user/${userGithubId}/starred`)
            const data = await response.json();
            console.log(data)
            if (!response.ok) {
              throw new Error("Error Status " + response.status)
            }
            setStarredRepos(data);
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
  <GithubReposContext.Provider value={{starredRepos}}>
    {children}
  </GithubReposContext.Provider>
  )
}