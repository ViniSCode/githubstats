import { Button, Flex, Spinner, Text } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { getSession, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { RiArrowLeftFill } from 'react-icons/ri';
import { Header } from "../components/Header";
import { Pagination } from '../components/Pagination';
import { Sidebar } from '../components/Sidebar';
import { useAppContext } from '../hooks/useAppContext';

interface Followers{
  name: string;
  login: string;
  avatar_url: string;
  html_url: string;
}

export default function  Followers () {
  const { handleSetIsLoading, handleSetIsError, isError, isLoading } = useAppContext();
  const router = useRouter();
  const [followers, setFollowers] = useState<Followers[]>();
  const {data: session} = useSession();

  useEffect(() => {
    const fetchUserData = async () => {
      if (session) {
        try {
              const userId = session.user.image.split('/').pop().split('?')[0];
              const response = await fetch(`https://api.github.com/users/diego3g/followers?per_page=100`)
              const data = await response.json();
              
              if (!response.ok) {
                throw new Error("Error Status " + response.status)
              }
              
              setFollowers(data);
              handleSetIsLoading(false)
            } 
            catch (err) {
              console.log(err.message)
              handleSetIsError(true);
            }
          }
        }
      fetchUserData();
    }, [])  

  return !isLoading && !isError && followers ? (
    <Flex direction="column" h="100vh" pb="4">
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6" mt="8">
        <Sidebar />
        <Pagination itemsPerPage={10} followers={followers}/>
      </Flex>
    </Flex>
  ): (isLoading  && !isError) ? (
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