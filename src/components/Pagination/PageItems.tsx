import { Box, Flex, VStack } from "@chakra-ui/react";
import { Repo } from "../Repo";

interface Items {
  name: string;
  description: string;
  html_url: string;
  language: string;
  stargazers_count: number;  
}


export function PageItems ({ currentItems }) {
  let itemsLeft;
  let itemsRight;

  itemsLeft = currentItems.slice(0, 5);
  itemsRight = currentItems.slice(5, 10);

  return (
    <>
      {currentItems &&
      (
        <>
          <Box borderRadius="8" pb="4" w="100%">
            <VStack spacing="4" display="flex">
              {
                itemsLeft.map((item: Items) => (
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
                itemsRight.map((item: Items) => (
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
          <Flex alignItems="center" justify="center" pos="absolute" left="0" right="0" bottom="0">
          </Flex>
          </>
      )
      }
    </>
  );
}