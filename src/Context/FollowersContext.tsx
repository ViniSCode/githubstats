import { useSession } from "next-auth/react";
import { createContext, ReactNode, useEffect, useState } from "react";
import { useAppContext } from "../hooks/useAppContext";

interface StarredRepos{
  name: string;
  login: string;
  avatar_url: string;
  html_url: string;
  organizations_url?: string;
  stargazers_count?: number;
}

interface GithubStarredReposContextData {
  starredRepos: StarredRepos[];
}

interface GithubStarredReposProviderProps {
  children: ReactNode;
}

export const GithubStarredReposContext = createContext<GithubStarredReposContextData>({} as GithubStarredReposContextData);

export function GithubStarredReposProvider ({children}: GithubStarredReposProviderProps) {

  const { handleSetIsLoading, handleSetIsError } = useAppContext();
  const [starredRepos, setStarredRepos] = useState<StarredRepos[]>();
  const {data: session} = useSession();

  useEffect(() => {
    const fetchUserData = async () => {
      if (session) {
        try {
              const userId = session.user.image.split('/').pop().split('?')[0];
              const response = await fetch(`https://api.github.com/user/${userId}/followers`)
              const data = await response.json();
              
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
        }
      fetchUserData();
    }, [])  

  return (
  <GithubStarredReposContext.Provider value={{ starredRepos }}>
    {children}
  </GithubStarredReposContext.Provider>
  )
}