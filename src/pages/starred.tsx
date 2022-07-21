import { Box, Flex, VStack } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { Header } from "../components/Header";
import { Pagination } from '../components/Pagination';
import { Repo } from '../components/Repo';
import { Sidebar } from '../components/Sidebar';

export default function Starred () {

  return (
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
  );
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