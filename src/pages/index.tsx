import { Avatar, Button, Flex, Icon, Text } from '@chakra-ui/react';
import { RiGithubFill } from 'react-icons/ri';
import { useSession, signIn, signOut, getSession } from "next-auth/react"
import Link from 'next/link'
import { GetServerSideProps } from 'next';

export default function SignIn() {
  const { data: session } = useSession();
  
  return !session ? (
    <Flex w="100vw" h="100vh" align="center" justify="center">
      <Flex
        flexDir="column"
        w="100%"
        maxWidth={360}
        bg="gray.800"
        p="8"
        borderRadius={8}
      >
       <Button
          onClick={() => signIn()}
          colorScheme="pink"
          size="lg"
          display="flex"
          alignItems="center"
        >
        <Icon as={RiGithubFill} fontSize="25px" mr="2"/>
          Sign in with github
        </Button>
      </Flex>
    </Flex>
  ) : 
  (
    <Flex
    w="100vw"
    h="100vh"
    align="center"
    justify="center"
  >
    <Flex
      flexDir="column"
      w="100%"
      maxWidth={360}
      bg="gray.800"
      p="8"
      borderRadius={8}
      gap="4"
    >
      <Flex direction="column" align="center" justify="center" gap="2" mb="2">
        <Avatar size="lg" name={session.user.name} src={session.user.image}/>
        <Text fontSize="lg" fontWeight="bold">{session.user.name}</Text>
      </Flex>
      <Link href="/dashboard">
        <Button
          type="submit"
          colorScheme="pink"
          size="lg"
          display="flex"
          alignItems="center"
        >
          Dashboard
        </Button>
      </Link>  
      <Button
        type="submit"
        colorScheme="pink"
        size="lg"
        display="flex"
        alignItems="center"
        onClick={() => signOut()}
      >
        Sign out
      </Button>
    </Flex>
  </Flex>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)

  if (session) {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      },
    }
  }

  return {
    props: { session }
  }
}