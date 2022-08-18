import { Button, Flex, Text } from "@chakra-ui/react";

interface LoadMoreProps {
  items?: any;
  fetchMore?: any;
  updateQuery?: any;
  loading?: any;
  itemsType: string;
}


export function LoadMoreFollow ({items, fetchMore, updateQuery, loading, itemsType}: LoadMoreProps) {
  let validation;

  if (items.search.edges[0].node.__typename === 'User' && itemsType === 'followers') {
    validation = items.search.edges[0].node.followers.pageInfo.hasNextPage
  } 
  if (items.search.edges[0].node.__typename === 'User' && itemsType === 'following') {
    validation = items.search.edges[0].node.following.pageInfo.hasNextPage
  } 
  else if (items.search.edges[0].node.__typename === 'Organization' && itemsType === 'members'){
    validation = items.search.edges[0].node.membersWithRole.pageInfo.hasNextPage;
  }

  return itemsType === 'followers' && items.search.edges[0].node.__typename === 'User' ? (
    <>
      { 
        validation && (
          <Flex pos="absolute" right='0' left='0' bottom='0' mx="auto" width="fit-content">
            <Button isLoading={loading}  bg="transparent" color="pink.500" border='1px' borderColor="pink.500" _hover={{bg:"pink.500", color:"white"}} onClick={() => {
              if(items.search.edges[0].node.__typename === 'User') {
                const { endCursor } = items.search.edges[0].node.followers.pageInfo;
                fetchMore({
                  variables: {
                    cursor: endCursor
                    },
                    
                    updateQuery: (prev, {fetchMoreResult}) => {
                    
                    fetchMoreResult.search.edges[0].node.followers.edges = [
                      ...prev.search.edges[0].node.followers.edges,
                      ...fetchMoreResult.search.edges[0].node.followers.edges
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
  ): itemsType === 'following' && items.search.edges[0].node.__typename === 'User' ? (
    <>
      { 
        validation && (
          <Flex pos="absolute" right='0' left='0' bottom='0' mx="auto" width="fit-content">
            <Button isLoading={loading}  bg="transparent" color="pink.500" border='1px' borderColor="pink.500" _hover={{bg:"pink.500", color:"white"}} onClick={() => {
              if(items.search.edges[0].node.__typename === 'User') {
                const { endCursor } = items.search.edges[0].node.following.pageInfo;
                fetchMore({
                  variables: {
                    cursor: endCursor
                    },
                    updateQuery: (prev, {fetchMoreResult}) => {
                    
                    fetchMoreResult.search.edges[0].node.following.edges = [
                      ...prev.search.edges[0].node.following.edges,
                      ...fetchMoreResult.search.edges[0].node.following.edges
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

  
  ) 
  : itemsType === 'members' && items.search.edges[0].node.__typename === 'Organization' ? (
    <>
      { 
        validation && (
          <Flex pos="absolute" right='0' left='0' bottom='0' mx="auto" width="fit-content">
            <Button isLoading={loading}  bg="transparent" color="pink.500" border='1px' borderColor="pink.500" _hover={{bg:"pink.500", color:"white"}} onClick={() => {
                const { endCursor } = items.search.edges[0].node.membersWithRole.pageInfo;
                fetchMore({
                  variables: {
                    cursor: endCursor
                    },
                    
                    updateQuery: (prev, {fetchMoreResult}) => {
                    
                    fetchMoreResult.search.edges[0].node.membersWithRole.edges = [
                      ...prev.search.edges[0].node.membersWithRole.edges,
                      ...fetchMoreResult.search.edges[0].node.membersWithRole.edges
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
