import { Box, Button, Flex, Spinner, Text, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { RiArrowLeftFill } from 'react-icons/ri';
import { Header } from "../../components/Header";
import { RepoOverview } from '../../components/RepoOverview';
import { Sidebar } from '../../components/Sidebar';
import { UserOverview } from '../../components/UserOverview';
import { useGetGithubUserOverviewLazyQuery } from '../../graphql/generated/schema';

export default function Overview () {
  const router = useRouter();
  const userId = router.query.userId as string;
  const [userOverview, setUserOverview] = useState(null);

  const [loadUserOverview, { called, error, data, loading }] = useGetGithubUserOverviewLazyQuery({
    variables: {
      id: userId,
    }
  })
  
  console.log(data, error)

  useEffect(() => {
    if (userId) {
      const fetchUserOverview = async () => {
        try {
          const getUserOverview = await loadUserOverview();
       
          if (getUserOverview.data && !getUserOverview.error) {
            setUserOverview(getUserOverview.data.user)
          }
        } catch (err) {
          throw new Error(err.message);
        }
      }

      fetchUserOverview();
    }
  }, [userId])

  return !loading && !error && userOverview ? (
    <Flex direction="column" h="100vh" pb="4">
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6" mt="8">
        <Sidebar />

        <Flex flex="1" gap="4rem" alignItems="flex-start" justifyContent={{ base: 'center', md: 'center', lg: 'space-between', xl: 'space-between' }} flexWrap={{ base: 'wrap', md: 'initial', lg: 'initial', xl: 'initial' }}>
          <Box mb="4">
            <UserOverview user={userOverview}/>
          </Box>

          <Box borderRadius="8" pb="4" w="100%">
            <VStack spacing="4" display="flex">
              {/* If user does not have starred repos, show the last 6 public repos */}
              {/* Change to last repos instead last starred repos */}
              {
                userOverview.repositories.edges.map(repo => {
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
