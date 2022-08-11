import { Box, Button, Flex, Spinner, Text, VStack } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { RiArrowLeftFill } from 'react-icons/ri';
import { Header } from "../components/Header";
import { Sidebar } from '../components/Sidebar';
import { useGetGithubUserOverviewQuery } from '../graphql/generated/schema';
import { useAppContext } from '../hooks/useAppContext';

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

export default function  Dashboard ({session}) {

  const router = useRouter();
  const { isError, isLoading } = useAppContext();

  let search = "viniscode"
  
  const { data, loading, error } = useGetGithubUserOverviewQuery({
    variables: {
      userId: search
    },
  });

  
  // const [repos, setRepos] = useState<Repos[]>();
  // // get user data from props;
  // const userData = data.user; 
  // // get repos (obj);
  // const githubRepos = data.user.repositories.edges;

  // // format repos 
  // useEffect(() => {
  //   if (githubRepos) {
  //     const formattedRepos = githubRepos.map(repo => {
  //       return repo.node;
  //     })

  //     setRepos(formattedRepos);
  //   }
  // }, [githubRepos])

  return !isLoading && !isError ? (
    <Flex direction="column" h="100vh" pb="4">
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6" mt="8">
        <Sidebar />

        <Flex flex="1" gap="4rem" alignItems="flex-start" justifyContent={{ base: 'center', md: 'center', lg: 'space-between', xl: 'space-between' }} flexWrap={{ base: 'wrap', md: 'initial', lg: 'initial', xl: 'initial' }}>
          <Box mb="4">
            {/* <UserOverview user={userData}/> */}
          </Box>

          <Box borderRadius="8" pb="4" w="100%">
            <VStack spacing="4" display="flex">
              {/* If user does not have starred repos, show the last 6 public repos */}
              {/* Change to last repos instead last starred repos */}
              {/* {
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
              } */}
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
