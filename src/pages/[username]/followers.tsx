import { Box, Button, Flex, Spinner, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { RiArrowLeftFill } from "react-icons/ri";
import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination/Pagination";
import SearchBoxModal from "../../components/SearchBoxModal";
import { Sidebar } from "../../components/Sidebar";
import { useGetGithubUserFollowersLazyQuery } from "../../graphql/generated/schema";
import { useAppContext } from "../../hooks/useAppContext";

export default function Followers () {
  const router = useRouter();
  const [followers, setFollowers] = useState(null);
  const userId = router.query.username as string;
  const { handleSetUser, isSearchModalOpen, handleSetIsSearchModalOpen} = useAppContext();

  
  const [loadGithubUserFollowers, {error, loading, fetchMore, updateQuery, data}] = useGetGithubUserFollowersLazyQuery({
    variables: {
      id: userId,
      cursor: null,
    }
  }) 

  useEffect(() => {
    if (userId) {
      const fetchUserFollowers = async () => {
        try {
          const getUserFollowers = await loadGithubUserFollowers();          
          if (getUserFollowers.data && !getUserFollowers.error) {
            setFollowers(getUserFollowers.data.search.edges[0].node)
          }
          
          handleSetUser(userId, getUserFollowers.data.search.edges[0].node.__typename);
        } catch (err) {
          throw new Error(err.message);
        }
      }

      fetchUserFollowers();
    }

  }, [userId])
  
  return !loading && !error && followers ? (
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
            itemsType="followers"
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
