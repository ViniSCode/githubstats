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
import { useGithubStarredRepos } from '../hooks/useGithubData';

export default function Starred () {
  const router = useRouter();
  
  const { isError, isLoading } = useAppContext();
  const { starredRepos } = useGithubStarredRepos();
    // Programming thoughts LOL 😂
    // get starredRepos (100 repos for instance)
    // slice starredRepos to fit in the page (20 repos per page)
    // split the 20 repos into 2 arrays with 10 repos;
    // first array in the first VStack second array in the second VStack
    
  return !isLoading && !isError ? (
    <Flex direction="column" h="100vh" pb="4">
      <Header />
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6" mt="8">
        <Sidebar />

        <Flex mb="6rem" flex="1" pb="20" gap="4" alignItems="center" justifyContent={{xl: "space-between", lg: "space-between", md: "space-between", sm: "center"}} flexWrap={{ base: 'wrap', md: 'initial', lg: 'initial', xl: 'initial' }} pos="relative">
          <Box borderRadius="8" pb="4">
            <VStack spacing="4" display="flex">
              <Repo />
              <Repo />
              <Repo />
              <Repo />
              <Repo />
            </VStack>
          </Box>
          <Box borderRadius="8" pb="4">
            <VStack spacing="4" display="flex">
              <Repo />
              <Repo />
              <Repo />
              <Repo />
              <Repo />
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