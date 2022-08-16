import { Button, Flex, VStack } from "@chakra-ui/react";
import { Repo } from "../Repo";

export function Pagination ({items}) {
  let reposLeft;
  let reposRight;

  if (items) {
    reposLeft = items.slice(0, 5)
    reposRight = items.slice(5, 10)
    console.log(reposLeft)
    console.log(reposRight)
  }

  return items && (
    <Flex mb="6rem" flex="1" pb="20" gap="4" alignItems="baseline"justifyContent={{xl: "space-between", lg: "space-between", md: "space-between", sm: "center"}} flexWrap={{ base: 'wrap', md: 'initial', lg: 'initial', xl: 'initial' }} pos="relative">
      <Flex gap="4" flexWrap={{sm: 'wrap', md: 'nowrap', lg: 'nowrap', xl: 'nowrap'}}>
        <VStack gap="4" w="100%">
          {
            reposLeft.map(repo => {
              return (
                <Repo  
                  key={repo.node.url}
                  description={repo.node.description} 
                  html_url={repo.node.url}
                  name={repo.node.name}
                  language={repo.node.primaryLanguage?.name}
                  stargazers_count={repo.node.stargazerCount}
                />
              )
            })
          }    
        </VStack>
        <VStack gap="4" w="100%">
          {
            reposRight.map(repo => {
              return (
                <Repo  
                  key={repo.node.url}
                  description={repo.node.description} 
                  html_url={repo.node.url}
                  name={repo.node.name}
                  language={repo.node.primaryLanguage?.name}
                  stargazers_count={repo.node.stargazerCount}
                />
              )
            })
          }    
        </VStack>
        <Flex pos="absolute" right='0' left='0' bottom='0' top='0' mx="auto" width="fit-content">
          <Button colorScheme='pink'>

          </Button>
        </Flex>
      </Flex>
    </Flex>
  )
}