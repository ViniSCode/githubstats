import { Box, Button, Flex, Spinner, Text, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { RiArrowLeftFill } from 'react-icons/ri';
import { Header } from "../components/Header";
import { OrgOverview } from '../components/Overview/OrgOverview';
import { UserOverview } from '../components/Overview/UserOverview';
import { RepoOverview } from '../components/RepoOverview';
import SearchBoxModal from '../components/SearchBoxModal';
import { Sidebar } from '../components/Sidebar';
import { useGetGithubOverviewDataLazyQuery } from '../graphql/generated/schema';
import { useAppContext } from '../hooks/useAppContext';

export default function Overview () {
  const { handleSetIsSearchModalOpen, isSearchModalOpen, handleSetUser, user } = useAppContext();
  const router = useRouter();
  const userId = router.query.username as string;
  const [githubOverviewData, setGithubOverviewData] = useState(null);

  const [loadGithubOverviewData, {data, error, loading }] = useGetGithubOverviewDataLazyQuery({
    variables: {
      id: userId,
    }
  })

  useEffect(() => {
    if (userId) {
      const fetchUserOverview = async () => {
        try {
          const getUserOverview = await loadGithubOverviewData();
          
          if (getUserOverview.data && !getUserOverview.error) {
            setGithubOverviewData(getUserOverview.data.search.edges[0].node)
          }

          handleSetUser(userId, getUserOverview.data.search.edges[0].node.__typename);

        } catch (err) {
          throw new Error(err.message);
        }
      }

      fetchUserOverview();
    }

  }, [userId])

  return !loading && !error && githubOverviewData && githubOverviewData.__typename === 'User' ? (
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
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6" mt={{base:"6rem",sm: "6rem", md: "8", lg: "8", xl: "8"}}>
        <Sidebar />
        <Flex flex="1" gap="5" alignItems="flex-start" justifyContent={{ base: 'center', md: 'center', lg: 'space-between', xl: 'space-between' }} flexWrap={{ base: 'wrap', md: 'initial', lg: 'initial', xl: 'initial' }}>
          <Box mb="4">
            <UserOverview user={githubOverviewData}/>
          </Box>
          <Box borderRadius="8" pb="4" w="100%">
            <VStack spacing="4" display="flex">
              {/* If user does not have starred repos, show the last 6 public repos */}
              {/* Change to last repos instead last starred repos */}
              { githubOverviewData.repositories.edges.length > 0 ? (
                  githubOverviewData.repositories.edges.map(repo => {
                    return(
                      <RepoOverview
                        key={repo.node.name}
                        name={repo.node.name}
                        description={repo.node.description}
                        html_url={repo.node.url}
                        language={repo.node.primaryLanguage}
                        stargazers_count={repo.node.stargazerCount}
                      />
                    )
                  })
                ) : (
                  <>
                    <Text alignSelf="center" color="gray.200" fontSize={20}>No repos to display.</Text>
                  </>
                )
              }
            </VStack>
          </Box>
        </Flex>
      </Flex>
    </Flex>
  )
  // change the page layout for organizations and enterprises
  : !loading && !error && githubOverviewData && githubOverviewData.__typename === "Organization" ? (
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
   <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6" mt={{base:"6rem",sm: "6rem", md: "8", lg: "8", xl: "8"}}>
     <Sidebar />
     <Flex flex="1" gap="5" alignItems="flex-start" justifyContent={{ base: 'center', md: 'center', lg: 'space-between', xl: 'space-between' }} flexWrap={{ base: 'wrap', md: 'initial', lg: 'initial', xl: 'initial' }}>
       <Box mb="4" maxW={{base: "480", sm: "480", md: "unset", lg: "unset", xl: "unset", '2xl': "unset"}} w={{base: "100%", sm: "100%", md: "unset", lg: "unset", xl: "unset", '2xl': "unset"}}>
         <OrgOverview org={githubOverviewData}/>
       </Box>
       <Box borderRadius="8" pb="4" w="100%">
         <VStack spacing="4" display="flex">
           {/* If user does not have starred repos, show the last 6 public repos */}
           {/* Change to last repos instead last starred repos */}
           { githubOverviewData.repositories.edges.length > 0 ? (
               githubOverviewData.repositories.edges.map(repo => {
                 return(
                   <RepoOverview
                     key={repo.node.name}
                     name={repo.node.name}
                     description={repo.node.description}
                     html_url={repo.node.url}
                     language={repo.node.primaryLanguage}
                     stargazers_count={repo.node.stargazerCount}
                   />
                 )
               })
             ) : (
               <>
                 <Text alignSelf="center" color="gray.200" fontSize={20}>No repos to display.</Text>
               </>
             )
           }
         </VStack>
       </Box>
     </Flex>
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