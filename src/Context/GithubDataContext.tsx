import { getSession, useSession } from "next-auth/react";
import { createContext, ReactNode, useEffect, useState } from "react";

interface UserGithubData {
  bio: string;
  company?: string; 
  login: string;
  name: string;
  location?: string;
  avatar_url: string;
}

interface GithubDataContext {
  userData: UserGithubData;
  isLoading: boolean;
  isError: boolean;
}

interface GithubProviderProps {
  children: ReactNode;
}

export const GithubDataContext = createContext<GithubDataContext>({} as GithubDataContext);

export function GithubDataProvider ({children}: GithubProviderProps) {
  const [userData, setUserData] = useState<UserGithubData>();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const {data: session} = useSession();

    useEffect(() => {
      const fetchUserData = async () => {
        if (session) {
          const {user} = await getSession();
          // next-auth does not provide a github username or id by default, 
          // here I decide to get the user id by the user image which contains their id
          const userImageUrl = user.image.split('/').pop();
          const userId = userImageUrl.split('?')[0];
    
          try {
            const response = await fetch(`https://api.github.com/user/${userId}`)
            const data = await response.json();
            
            if (!response.ok) {
              throw new Error("Error Status " + response.status)
            }
            setUserData(data);
            setIsLoading(false)
          } 
          catch (err) {
            console.log(err.message)
            setIsError(true);
          }
        }
      }

      fetchUserData();
    }, [])  

  return (
  <GithubDataContext.Provider value={{userData, isLoading, isError}}>
    {children}
  </GithubDataContext.Provider>
  )
}