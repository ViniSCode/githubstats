import { Button, Flex, Spinner, Text } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { RiArrowLeftFill } from 'react-icons/ri';
import { Header } from "../components/Header";
import { Pagination } from '../components/Pagination';
import { Sidebar } from '../components/Sidebar';
import { useAppContext } from '../hooks/useAppContext';
import { useRepos } from '../hooks/useGithubData';

export default function Repos () {
  const router = useRouter();
  const { isError, isLoading } = useAppContext();
  const { repos } = useRepos();

  return !isLoading && !isError && repos ? (
    <Flex direction="column" h="100vh" pb="4">
      <Header />
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6" mt="8">
        <Sidebar />
        <Pagination itemsPerPage={10} repos={repos} isRepo/>
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