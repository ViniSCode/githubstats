import { getSession } from "next-auth/react";
import { createContext, ReactNode, useEffect, useState } from "react";
import { useAppContext } from "../hooks/useAppContext";

interface UserGithubSessionContextData {
  githubUserId: string;
}

interface UserGithubSessionProviderProps {
  children: ReactNode;
}

// next-auth does not provide the user github id, 
// so we need to use the useSession to get the user image (image url from github),
// which contains the user id;
// for instance "https://avatars.githubusercontent.com/u/72752044?v=4"
// my github id is 72752044;

export const UserGithubSessionContext = createContext<UserGithubSessionContextData>({} as UserGithubSessionContextData);

export function UserGithubSessionProvider ({children}: UserGithubSessionProviderProps) {

  const { handleSetIsLoading, handleSetIsError } = useAppContext();
  const [ githubUserId, setGithubUserId ] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
          try {
            //get github id from the user image
            const { user } = await getSession();
            const userId = user.image.split('/').pop().split('?')[0];
            
            if (!userId) {
              throw new Error("Error Status " + "something went wrong...")
            }
            
            setGithubUserId(userId);
            handleSetIsLoading(false);
          } 
          catch (err) {
            console.log(err.message)
            handleSetIsError(true);
          }
        }
        
      fetchUserData();
    }, [])  

  return (
  <UserGithubSessionContext.Provider value={{githubUserId}}>
    {children}
  </UserGithubSessionContext.Provider>
  )
}