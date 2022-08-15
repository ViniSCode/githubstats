import { Box, Button, Flex, Spinner, Text, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { RiArrowLeftFill } from 'react-icons/ri';
import { Header } from "../components/Header";
import { OrgOverview } from '../components/Overview/OrgOverview';
import { UserOverview } from '../components/Overview/userOverview';
import { RepoOverview } from '../components/RepoOverview';
import { Sidebar } from '../components/Sidebar';
import { useGetGithubOverviewDataLazyQuery } from '../graphql/generated/schema';
import { useAppContext } from '../hooks/useAppContext';

export default function Overview () {
  const router = useRouter();
  const { searchType } = useAppContext();
  const userId = router.query.userId as string;
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
        } catch (err) {
          throw new Error(err.message);
        }
      }

      fetchUserOverview();
    }

  }, [userId])

  return !loading && !error && githubOverviewData && githubOverviewData.__typename === 'User' ? (
    <Flex direction="column" h="100vh" pb="4">
      <Header />
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6" mt="8">
        <Sidebar />
        <Flex flex="1" gap="4rem" alignItems="flex-start" justifyContent={{ base: 'center', md: 'center', lg: 'space-between', xl: 'space-between' }} flexWrap={{ base: 'wrap', md: 'initial', lg: 'initial', xl: 'initial' }}>
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
    <Header />
    <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6" mt="8">
      <Sidebar />
      <Flex flex="1" gap="4rem" alignItems="flex-start" justifyContent={{ base: 'center', md: 'center', lg: 'space-between', xl: 'space-between' }} flexWrap={{ base: 'wrap', md: 'initial', lg: 'initial', xl: 'initial' }}>
        <Box mb="4">
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
  ):  (loading  && !error) ? (
    <Flex align='center' direction="column" justify='center' height="100vh" gap='2rem'>
      <Text textAlign='center' fontSize="xl">
      </Text>
        <Spinner size="lg" />
    </Flex>
  ): (
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
