import { Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination/Pagination";
import { Sidebar } from "../../components/Sidebar";
import { useGetGithubStarredReposLazyQuery } from "../../graphql/generated/schema";
import { useAppContext } from "../../hooks/useAppContext";

export default function Repos () {
  const router = useRouter();
  const [repos, setRepos] = useState(null);
  const userId = router.query.username as string;
  const { handleSetUser } = useAppContext();
  
  const [loadGithubStarredRepos, {error, loading, fetchMore, updateQuery, data}] = useGetGithubStarredReposLazyQuery({
    variables: {
      id: userId,
      cursor: null,
    }
  }) 

  useEffect(() => {
    if (userId) {
      handleSetUser(userId);
      const fetchUserOverview = async () => {
        try {
          const getUserStarredRepos = await loadGithubStarredRepos();
       
          if (getUserStarredRepos.data && !getUserStarredRepos.error) {
            setRepos(getUserStarredRepos.data.search.edges[0].node)
          }
        } catch (err) {
          throw new Error(err.message);
        }
      }

      fetchUserOverview();
    }

  }, [userId])
  
  return !loading && !error && repos && (
    <Flex direction="column" h="100vh" pb="4">
      <Header />
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6" mt="8">
        <Sidebar />
          <Pagination
            items={data}
            fetchMore={fetchMore}
            updateQuery={updateQuery}
            loading={loading}
            isStarred={true} 
          />
      </Flex>
    </Flex>
  )
}
