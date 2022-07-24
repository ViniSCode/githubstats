import { useSession } from "next-auth/react";
import { createContext, ReactNode, useEffect, useState } from "react";
import { useAppContext } from "../hooks/useAppContext";

interface StarredRepos{
  name: string;
  description?: string;
  html_url: string;
  language: string;
  stargazers_count?: number;
}

interface StarredReposContextData {
  starredRepos: StarredRepos[];
  starredTotalCount: number;
}

interface StarredReposProviderProps {
  children: ReactNode;
}

export const StarredReposContext = createContext<StarredReposContextData>({} as StarredReposContextData);

export function StarredReposProvider ({children}: StarredReposProviderProps) {

  const { handleSetIsLoading, handleSetIsError } = useAppContext();
  const [starredRepos, setStarredRepos] = useState<StarredRepos[]>();
  const [starredTotalCount, setStarredTotalCount] = useState(null);
  const {data: session} = useSession();

  useEffect(() => {
    const fetchUserData = async () => {
      if (session) {
        try {
              const userId = session.user.image.split('/').pop().split('?')[0];
              const response = await fetch(`https://api.github.com/user/${userId}/starred`)
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
  <StarredReposContext.Provider value={{ starredRepos, starredTotalCount }}>
    {children}
  </StarredReposContext.Provider>
  )
}