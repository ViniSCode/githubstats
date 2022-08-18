import { Box, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination/Pagination";
import SearchBoxModal from "../../components/SearchBoxModal";
import { Sidebar } from "../../components/Sidebar";
import { useGetGithubOrgMembersLazyQuery } from "../../graphql/generated/schema";
import { useAppContext } from "../../hooks/useAppContext";

export default function Repos () {
  const router = useRouter();
  const [members, setMembers] = useState(null);
  const userId = router.query.username as string;
  const { handleSetUser, isSearchModalOpen, handleSetIsSearchModalOpen} = useAppContext();
  
  const [loadGithubOrgMembers, {error, loading, fetchMore, updateQuery, data}] = useGetGithubOrgMembersLazyQuery({
    variables: {
      id: userId,
      cursor: null,
    }
  }) 

  useEffect(() => {
    if (userId) {
      const fetchUserOverview = async () => {
        try {
          const getUserRepos = await loadGithubOrgMembers();          
          if (getUserRepos.data && !getUserRepos.error) {
            setMembers(getUserRepos.data.search.edges[0].node)
          }
          
          handleSetUser(userId, getUserRepos.data.search.edges[0].node.__typename);
        } catch (err) {
          throw new Error(err.message);
        }
      }

      fetchUserOverview();
    }

  }, [userId])
  
  return !loading && !error && members && (
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
            itemsType="members"
          />
      </Flex>
    </Flex>
  )
}
