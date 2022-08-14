import { Button, Flex, Spinner, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { RiArrowLeftFill } from 'react-icons/ri';
import { Header } from "../components/Header";
import { Pagination } from '../components/Pagination';
import { Sidebar } from '../components/Sidebar';
import { useAppContext } from '../hooks/useAppContext';
import { useStarredRepos } from '../hooks/useGithubData';

export default function Starred () {
  const router = useRouter();

  const { isError, isLoading } = useAppContext();
  const { starredRepos } = useStarredRepos();
    
  return !isLoading && !isError && starredRepos ? (
    <Flex direction="column" h="100vh" pb="4">
      <Header />
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6" mt="8">
        <Sidebar />
        <Pagination itemsPerPage={10} repos={starredRepos} isRepo/>
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
