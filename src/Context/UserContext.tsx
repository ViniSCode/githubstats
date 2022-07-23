import { useSession } from "next-auth/react";
import { createContext, ReactNode, useEffect, useState } from "react";
import { useAppContext } from "../hooks/useAppContext";

interface UserData {
  bio: string;
  company?: string; 
  login: string;
  name: string;
  location?: string;
  avatar_url: string;
}

interface UserContextData {
  userData: UserData;
  userGithubId: string;
}

interface UserProviderProps {
  children: ReactNode;
}

export const UserContext = createContext<UserContextData>({} as UserContextData);

export function UserProvider ({children}: UserProviderProps) {
  const { handleSetIsLoading, handleSetIsError } = useAppContext();
  const {data: session} = useSession();

  const [userData, setUserData] = useState<UserData>();
  const [userGithubId, setUserGithubId] = useState('');

    useEffect(() => {
      const fetchUserData = async () => {
        if (session) {
          // next-auth does not provide a github username or id by default, 
          // here I decide to get the user id by the user image which contains their id
          try {
            const userId = session.user.image.split('/').pop().split('?')[0];
            const response = await fetch(`https://api.github.com/user/${userId}`)
            const data = await response.json();
            setUserGithubId(userId);
            
            
            if (!response.ok) {
              throw new Error("Error Status " + response.status)
            }
            setUserData(data);
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
  <UserContext.Provider value={{userData, userGithubId}}>
    {children}
  </UserContext.Provider>
  )
}