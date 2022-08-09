import { gql } from '@apollo/client';
import { Box, Button, Flex, Spinner, Text, VStack } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { RiArrowLeftFill } from 'react-icons/ri';
import { Header } from "../components/Header";
import { RepoOverview } from '../components/RepoOverview';
import { Sidebar } from '../components/Sidebar';
import { UserOverview } from '../components/UserOverview';
import { useAppContext } from '../hooks/useAppContext';
import { client } from '../lib/apollo';

interface Repos {
  name: string;
  description: string;
  primaryLanguage: { 
    color: string;
    name: string;
  }
  url: string;
  stargazerCount: number;
}

export default function  Dashboard ({data, session}) {
    const router = useRouter();
    const { isError, isLoading } = useAppContext();
    
    const [repos, setRepos] = useState<Repos[]>();
    // get user data from props;
    const userData = data.user; 
    // get repos (obj);
    const githubRepos = data.user.repositories.edges;

    // format repos 
    useEffect(() => {
      if (githubRepos) {
        const formattedRepos = githubRepos.map(repo => {
          return repo.node;
        })
  
        setRepos(formattedRepos);
      }
    }, [githubRepos])

  return !isLoading && !isError && repos ? (
    <Flex direction="column" h="100vh" pb="4">
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6" mt="8">
        <Sidebar />

        <Flex flex="1" gap="4rem" alignItems="flex-start" justifyContent={{ base: 'center', md: 'center', lg: 'space-between', xl: 'space-between' }} flexWrap={{ base: 'wrap', md: 'initial', lg: 'initial', xl: 'initial' }}>
          <Box mb="4">
            <UserOverview user={userData}/>
          </Box>

          <Box borderRadius="8" pb="4" w="100%">
            <VStack spacing="4" display="flex">
              {/* If user does not have starred repos, show the last 6 public repos */}
              {/* Change to last repos instead last starred repos */}
              {
                repos.map(repo1 => {
                  return(
                    <RepoOverview
                      key={repo1.name}
                      name={repo1.name}
                      description={repo1.description}
                      html_url={repo1.url}
                      language={repo1.primaryLanguage}
                      stargazers_count={repo1.stargazerCount}
                    />
                  )
                })
              }
            </VStack>
          </Box>
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

// If user isn't logged in, the getServerSideProps function will redirect the user to the login page.
export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)
  // const {userGithubId} = useGithubData();

  if (!session) {
    console.log('you cannot access this page if not logged in')
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  } 

  const {data, errors} = await client.query({ 
    query: gql`
      query { 
        user(login: "viniscode"){
          login
          name
          avatarUrl
          bio
          repositories(last: 5) {
            edges {
              node {
                name
                description
                primaryLanguage {
                  name,
                  color
                }
                stargazerCount
                url
              }
            }
          }
        }
      }
    `
  })

  return {
    props: { session, data }
  }
}
