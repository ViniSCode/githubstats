import { Button, Flex, Grid } from "@chakra-ui/react";
import { Repo } from "../Repo";

export function Pagination ({items, fetchMore, updateQuery}) {
  let reposLeft;
  let reposRight;
  let formattedItems = items.search.edges[0].node.repositories.edges;
  if (formattedItems) {
    reposLeft = formattedItems.slice(0, (formattedItems.length / 2))
    reposRight = formattedItems.slice((formattedItems.length / 2), formattedItems.length)
  }
  return formattedItems && (
    <Flex mb="6rem" flex="1" pb="20" gap="4" alignItems="baseline"justifyContent={{xl: "space-between", lg: "space-between", md: "space-between", sm: "center"}} flexWrap={{ base: 'wrap', md: 'initial', lg: 'initial', xl: 'initial' }} pos="relative">
      <Flex gap="4" w="100%">
          <Grid gap="4" w="100%" templateColumns={{sm: '1fr', md: '1fr 1fr', lg: '1fr 1fr', xl: '1fr 1fr'}}>
            {
              formattedItems.map(repo => {
                return (
                  <Repo  
                    key={repo.node.id}
                    description={repo.node.description} 
                    html_url={repo.node.url}
                    name={repo.node.name}
                    language={repo.node.primaryLanguage?.name}
                    stargazers_count={repo.node.stargazerCount}
                  />
                )
              })
            }    
          </Grid>
        {
          items.search.edges[0].node.repositories.pageInfo.hasNextPage && (
            <Flex pos="absolute" right='0' left='0' bottom='0' mx="auto" width="fit-content">
              <Button colorScheme='pink' onClick={() => {
                if(items.search.edges[0].node.__typename === 'User') {
                  console.log('oi')
                  const { endCursor } = items.search.edges[0].node.repositories.pageInfo;
                  fetchMore({
                    variables: {
                      cursor: endCursor
                      },
                      
                      updateQuery: (prev, {fetchMoreResult}) => {
                      
                      fetchMoreResult.search.edges[0].node.repositories.edges = [
                        ...prev.search.edges[0].node.repositories.edges,
                        ...fetchMoreResult.search.edges[0].node.repositories.edges
                      ];
                      

                      console.log(fetchMoreResult.search.edges[0].node.repositories.edges)
                      return fetchMoreResult;
                    }
                  })
                } else {
                  return 'hello world'
                }
              }}>
                Load More
            </Button>
          </Flex>
          )
        }
      </Flex>
    </Flex>
  )
}