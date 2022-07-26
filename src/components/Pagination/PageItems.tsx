import { Box, VStack } from "@chakra-ui/react";
import { Repo } from "../Repo";
import { User } from "../User";

interface Repo {
  name: string;
  description?: string;
  html_url: string;
  language: string;
  stargazers_count?: number;
}

interface Follower {
  name: string;
  login: string;
  avatar_url: string;
  html_url: string;
}


export function PageItems ({ currentItems, isRepo}) {
  let itemsLeft;
  let itemsRight;

  itemsLeft = currentItems.slice(0, 5);
  itemsRight = currentItems.slice(5, 10);
  
  return isRepo ? (
    <>
      {currentItems &&
      (
        <>
          <Box borderRadius="8" pb="4" w="100%">
            <VStack spacing="4" display="flex">
              {
                itemsLeft.map((item: Repo) => (
                  <Repo 
                    description={item.description} 
                    html_url={item.html_url} 
                    key={item.html_url} 
                    language={item.language}
                    name={item.name}
                    stargazers_count={item.stargazers_count}/>
                ))
              }
            </VStack>
          </Box>
          <Box borderRadius="8" pb="4" w={{xl: "100%", lg: "100%", md: "80%", sm: "100%"}}>
            <VStack spacing="4" display="flex">
              {
                itemsRight.map((item: Repo) => (
                  <Repo 
                    key={item.html_url} 
                    description={item.description} 
                    html_url={item.html_url} 
                    language={item.language}
                    name={item.name}
                    stargazers_count={item.stargazers_count}/>
                ))
              }
            </VStack>
          </Box>
          </>
      )
      }
    </>
  ): (
    <>
    {currentItems &&
    (
      <>
        <Box borderRadius="8" pb="4" w="100%">
          <VStack spacing="4" display="flex">
            {
              itemsLeft.map((item: Follower) => (
                <User 
                  key={item.login} 
                  name={item.name}
                  login={item.login}
                  avatar_url={item.avatar_url}
                />
              ))
            }
          </VStack>
        </Box>
        <Box borderRadius="8" pb="4" w={{xl: "100%", lg: "100%", md: "80%", sm: "100%"}}>
          <VStack spacing="4" display="flex">
            {
              itemsRight.map((item: Follower) => (
                <User 
                key={item.login} 
                name={item.name}
                login={item.login}
                avatar_url={item.avatar_url}
                />
              ))
            }
          </VStack>
        </Box>
        </>
    )
    }
  </>
  )
}