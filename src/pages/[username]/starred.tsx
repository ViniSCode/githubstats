import { Box, Button, Flex, Spinner, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { RiArrowLeftFill } from "react-icons/ri";
import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination/Pagination";
import SearchBoxModal from "../../components/SearchBoxModal";
import { Sidebar } from "../../components/Sidebar";
import { useGetGithubStarredReposLazyQuery } from "../../graphql/generated/schema";
import { useAppContext } from "../../hooks/useAppContext";

export default function Starred () {
  const router = useRouter();
  const [starredRepos, setStarredRepos] = useState(null);
  const userId = router.query.username as string;
  let isOrgStarredRepoEmpty;
  let isUserStarredRepoEmpty;
  const { handleSetIsSearchModalOpen, isSearchModalOpen, handleSetUser } = useAppContext();
  
  const [loadGithubStarredRepos, {error, loading, fetchMore, updateQuery, data}] = useGetGithubStarredReposLazyQuery({
    variables: {
      id: userId,
      cursor: null,
    }
  }) 

  useEffect(() => {
    if (userId) {
      const fetchStarred = async () => {
        try {
          const getUserStarredRepos = await loadGithubStarredRepos();
          if (getUserStarredRepos.data && !getUserStarredRepos.error) {
            setStarredRepos(getUserStarredRepos.data.search.edges[0].node)
          }

          handleSetUser(userId, getUserStarredRepos.data.search.edges[0].node.__typename);
        } catch (err) {
          throw new Error(err.message);
        }
      }

      fetchStarred();      
    }

  }, [userId])

  return !loading && !error && starredRepos ? (
    <Flex direction="column" h="100vh" pb="4">
      {
        isSearchModalOpen && (
          <>
            <Box position="fixed" w="100vw" h="100vh" background='#3a3e49b7' zIndex={10} onClick={() => handleSetIsSearchModalOpen(false)} />
            <SearchBoxModal />
          </>
        )
      }
      <Header />
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6" mt="8">
        <Sidebar />
          <Pagination
            items={data}
            fetchMore={fetchMore}
            updateQuery={updateQuery}
            loading={loading}
            itemsType={"starred"} 
          />
      </Flex>
    </Flex>
  ): (loading  && !error) ? (
    <Flex align='center' direction="column" justify='center' height="100vh" gap='2rem'>
        <Spinner size="lg" />
    </Flex>
  ): !loading && error && (
    <Flex align='center' direction="column" justify='center' height="100vh" gap='2rem'>
      <Text textAlign='center' fontSize="xl">
        Something went wrong...
      </Text>

      <Button onClick={() => router.push('/')} colorScheme='red' leftIcon={<RiArrowLeftFill fontSize="20px"/>}>
        Go back
      </Button>
    </Flex>
  )
}
