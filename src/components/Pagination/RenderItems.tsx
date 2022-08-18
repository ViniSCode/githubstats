import { Flex, Grid } from "@chakra-ui/react";
import { Repo } from "../Repo";
import { User } from "../User";
interface ItemsGridProps {
  items: any;
  itemsType: string;
  isUser?: boolean;
  isOrg?: boolean;
}

export function RenderItems ({items, itemsType}: ItemsGridProps) {
  let reposLeft;
  let reposRight;
  let formattedItems; 
  
  if (items.search.edges[0].node.__typename === 'User' && itemsType === 'starred') {
    formattedItems = items.search.edges[0].node.starredRepositories.edges;
  } 
  else if (items.search.edges[0].node.__typename === 'User' && itemsType === 'followers') {
    formattedItems = items.search.edges[0].node.followers.edges;
  }
  else if (items.search.edges[0].node.__typename === 'User' && itemsType === 'following') {
    formattedItems = items.search.edges[0].node.following.edges;
  }
  else if (items.search.edges[0].node.__typename === 'Organization' && itemsType === 'members') {
    formattedItems = items.search.edges[0].node.membersWithRole.edges;
  }
  else {
    formattedItems = items.search.edges[0].node.repositories.edges;
  }
  
  if (formattedItems) {
    reposLeft = formattedItems.slice(0, (formattedItems.length / 2))
    reposRight = formattedItems.slice((formattedItems.length / 2), formattedItems.length)
  }

  return itemsType === 'repos' || itemsType === 'starred' ? (
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
  ):
  (
    <Flex gap="4" w="100%">
      <Grid gap="4" w="100%" templateColumns={{sm: '1fr', md: '1fr 1fr', lg: '1fr 1fr', xl: '1fr 1fr'}}>
        {
          formattedItems.map(user => {
            return (
              <User  
                key={user.node.id}
                bio={user.node.bio} 
                name={user.node.name}
                avatar_url={user.node.avatarUrl}
                location={user.node.location}
                company={user.node.company}
                login={user.node.login}
              />
            )
          })
        }    
      </Grid>
    </Flex>
  ) 
}