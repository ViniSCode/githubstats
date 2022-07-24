import { Box, Flex, VStack } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { Header } from "../components/Header";
import { Sidebar } from '../components/Sidebar';
import { User } from '../components/User';

export default function  Repos () {
  return (
    <Flex direction="column" h="100vh" pb="4">
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6" mt="8">
        <Sidebar />

        <Flex mb="6rem" flex="1" pb="20" gap="4" alignItems="center" justifyContent={{xl: "space-between", lg: "space-between", md: "space-between", sm: "center"}} flexWrap={{ base: 'wrap', md: 'initial', lg: 'initial', xl: 'initial' }} pos="relative">
          <Box borderRadius="8" pb="4">
            <VStack spacing="4" display="flex">
              <User avatar="https://github.com/viniscode.png" name="Vinícius Rodrigues" username="viniscode"/>
              <User avatar="https://github.com/diego3g.png" name="Diego Fernandes" username="diego3g"/>
              <User avatar="https://github.com/maykbrito.png" name="Mayk Brito" username="maykbrito"/>
              <User avatar="https://github.com/filipedeschamps.png" name="Filipe Deschamps" username="filipedeschamps"/>
              <User avatar="https://github.com/jakeliny.png" name="Jakeliny" username="jakeliny"/>
            </VStack>
          </Box>
          <Box borderRadius="8" pb="4">
            <VStack spacing="4" display="flex">
              <User avatar="https://github.com/jakeliny" name="Jakeliny" username="jakeliny"/>
              <User avatar="https://github.com/maykbrito" name="Mayk Brito" username="maykbrito"/>
              <User avatar="https://github.com/filipedeschamps" name="Filipe Deschamps" username="filipedeschamps"/>
              <User avatar="https://github.com/diego3g" name="Diego Fernandes" username="diego3g"/>
              <User avatar="https://github.com/viniscode" name="Vinícius Rodrigues" username="viniscode"/>
            </VStack>
          </Box>
          <Flex alignItems="center" justify="center" pos="absolute" left="0" right="0" bottom="0">
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