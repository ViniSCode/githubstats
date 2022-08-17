import { Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/Sidebar";
import { useGetGithubReposLazyQuery } from "../../graphql/generated/schema";

export default function Repos () {
  const router = useRouter();
  const [repos, setRepos] = useState(null);
  const userId = router.query.username as string;

  const [loadGithubRepos, {error, loading, fetchMore, updateQuery, data}] = useGetGithubReposLazyQuery({
    variables: {
      id: userId,
      cursor: null,
    }
  }) 

  useEffect(() => {
    if (userId) {
      const fetchUserOverview = async () => {
        try {
          const getUserRepos = await loadGithubRepos();
       
          if (getUserRepos.data && !getUserRepos.error) {
            setRepos(getUserRepos.data.search.edges[0].node)
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
          <Pagination items={data} fetchMore={fetchMore} updateQuery={updateQuery} />
      </Flex>
    </Flex>
  )
}
