import { Box, Button, Flex, Spinner, Text, VStack } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { RiArrowLeftFill } from 'react-icons/ri';
import { Header } from "../components/Header";
import { Pagination } from '../components/Pagination';
import { Repo } from '../components/Repo';
import { Sidebar } from '../components/Sidebar';
import { useAppContext } from '../hooks/useAppContext';
import { useRepos } from '../hooks/useGithubData';

export default function Repos () {
  const router = useRouter();
  let slicedRepos;
  let repos1;
  let repos2;

  const { isError, isLoading } = useAppContext();
  const { repos } = useRepos();

    if (repos) {
      slicedRepos = repos.slice(0, 10)
      repos1 =  repos.slice(0, 5)
      repos2 =  repos.slice(5, 10)
    }
    
  return !isLoading && !isError && repos ? (
    <Flex direction="column" h="100vh" pb="4">
      <Header />
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6" mt="8">
        <Sidebar />

        <Flex mb="6rem" flex="1" pb="20" gap="4" alignItems="center"justifyContent={{xl: "space-between", lg: "space-between", md: "space-between", sm: "center"}} flexWrap={{ base: 'wrap', md: 'initial', lg: 'initial', xl: 'initial' }} pos="relative">
          <Box borderRadius="8" pb="4" w="100%">
            <VStack spacing="4" display="flex">
              {
                repos1.map(repo1 => {
                  return(
                    <Repo
                      key={repo1.html_url}
                      name={repo1.name}
                      description={repo1.description}
                      html_url={repo1.html_url}
                      language={repo1.language}
                      stargazers_count={repo1.stargazers_count}
                    />
                  )
                })
              }
            </VStack>
          </Box>
          <Box borderRadius="8" pb="4" w={{xl: "100%", lg: "100%", md: "80%", sm: "100%"}}>
            <VStack spacing="4" display="flex">
              {
                repos2.map(repo2 => {
                  return(
                    <Repo 
                      key={repo2.html_url}
                      name={repo2.name}
                      description={repo2.description}
                      html_url={repo2.html_url}
                      language={repo2.language}
                      stargazers_count={repo2.stargazers_count}
                    />
                  )
                })
              }
              </VStack>
          </Box>
          <Flex alignItems="center" justify="center" pos="absolute" left="0" right="0" bottom="0">
            <Pagination />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  ):  (isLoading  && !isError) ? (
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)

  if (!session) {
    console.log('you cannot access this page if not logged in')
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  } 

  return {
    props: { session }
  }
}