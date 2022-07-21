import { Box, Button, Flex, HStack, Icon, Image, Spinner, Text, VStack } from '@chakra-ui/react';
import { Header } from "../components/Header";
import { Sidebar } from '../components/Sidebar';

import { StarredRepo } from '../components/starredRepo';
import { getSession } from 'next-auth/react';
import { RiArrowLeftFill } from 'react-icons/ri';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { useGithubData } from '../hooks/useGithubData';
import { UserOverview } from '../components/UserOverview';

export default function  Dashboard () {
    const router = useRouter();
    const { isLoading, isError, userData } = useGithubData();
   
  return !isLoading && !isError ? (
    <Flex direction="column" h="100vh" pb="4">
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6" mt="8">
        <Sidebar />

        <Flex flex="1" gap="4" alignItems="flex-start" justifyContent={{ base: 'center', md: 'center', lg: 'space-between', xl: 'space-between' }} flexWrap={{ base: 'wrap', md: 'initial', lg: 'initial', xl: 'initial' }}>
          <Box mb="4">
            <UserOverview user={userData}/>
          </Box>
          <Box borderRadius="8" pb="4" w="100%">
            <VStack spacing="4" display="flex">
              {/* If user does not have starred repos, show the last 6 public repos */}
              {/* Change to last repos instead last starred repos */}
              <StarredRepo />
              <StarredRepo />
              <StarredRepo />
              <StarredRepo />
              <StarredRepo />
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