import { Button, Flex, Text } from "@chakra-ui/react";

interface LoadMoreProps {
  items?: any;
  itemsType
  fetchMore?: any;
  updateQuery?: any;
  loading?: any;
}


export function LoadMore ({fetchMore, updateQuery, loading, items, itemsType}: LoadMoreProps) {
  let validation;

  if (items.search.edges[0].node.__typename === 'User' && itemsType === 'starred') {
    validation = items.search.edges[0].node.starredRepositories.pageInfo.hasNextPage
  } 
  else {
    validation = items.search.edges[0].node.repositories.pageInfo.hasNextPage;
  }

  return itemsType === 'starred' && items.search.edges[0].node.__typename === 'User' ? (
    <>
      { 
      // load More (user starred repos)
        validation && (
          <Flex pos="absolute" right='0' left='0' bottom='0' mx="auto" width="fit-content">
            <Button isLoading={loading}  bg="transparent" color="pink.500" border='1px' borderColor="pink.500" _hover={{bg:"pink.500", color:"white"}} onClick={() => {
              if(items.search.edges[0].node.__typename === 'User') {
                const { endCursor } = items.search.edges[0].node.starredRepositories.pageInfo;
                fetchMore({
                  variables: {
                    cursor: endCursor
                    },
                    
                    updateQuery: (prev, {fetchMoreResult}) => {
                    
                    fetchMoreResult.search.edges[0].node.starredRepositories.edges = [
                      ...prev.search.edges[0].node.starredRepositories.edges,
                      ...fetchMoreResult.search.edges[0].node.starredRepositories.edges
                    ];
                    
                    return fetchMoreResult;
                  }
                })
              } 
            }}>
              Load More
          </Button>
        </Flex>
        )
      }
    </>
  ): itemsType === 'repos' || (itemsType === 'starred' && items.search.edges[0].node.__typename === 'Organization') ? (
    <>
      { 
        // Load more button (org starred repos)
        validation && (
          <Flex pos="absolute" right='0' left='0' bottom='0' mx="auto" width="fit-content">
            <Button isLoading={loading}  bg="transparent" color="pink.500" border='1px' borderColor="pink.500" _hover={{bg:"pink.500", color:"white"}} onClick={() => {
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
                    
                    return fetchMoreResult;
                  }
                })
            }}>
              Load More
          </Button>
        </Flex>
        )
      }
    </>
  ) : (
    <>
      <Text>Something went wrong...</Text>
    </>
  )
}