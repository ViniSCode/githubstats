import { Flex, Grid } from "@chakra-ui/react";
import { Repo } from "../Repo";
interface ItemsGridProps {
  isRepo?: boolean;
  isStarred?: boolean;
  isUserFollow?: boolean;
  items: any;
  isUser?: boolean;
  isOrg?: boolean;
}

export function RenderItems ({items, isRepo, isStarred, isUserFollow, isUser, isOrg}: ItemsGridProps) {
  let reposLeft;
  let reposRight;
  let formattedItems; 
  
  if (items.search.edges[0].node.__typename === 'User' && isStarred) {
    formattedItems = items.search.edges[0].node.starredRepositories.edges;
  } else {
    formattedItems = items.search.edges[0].node.repositories.edges;
  }
  
  if (formattedItems) {
    reposLeft = formattedItems.slice(0, (formattedItems.length / 2))
    reposRight = formattedItems.slice((formattedItems.length / 2), formattedItems.length)
  }

  return (
    <Flex gap="4" w="100%">
      <Grid gap="4" w="100%" templateColumns={{sm: '1fr', md: '1fr 1fr', lg: '1fr 1fr', xl: '1fr 1fr'}}>
        {
          formattedItems.map(repo => {
            return (
              <Repo  
                key={repo.node.name}
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
    </Flex>
  )
}