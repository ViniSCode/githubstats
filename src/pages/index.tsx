import { Avatar, Flex, Icon, Input, Spinner, Text, VStack } from '@chakra-ui/react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { RiSearchLine } from 'react-icons/ri';
import { useGetGithubUserInfoLazyQuery } from '../graphql/generated/schema';
import { useAppContext } from '../hooks/useAppContext';

export default function Search() {
  const searchInputRef = useRef<HTMLInputElement>(null); 
  const [search, setSearch] = useState("");
  const { handleSetSearchedUser } = useAppContext();
  const [searchedUsers, setSearchedUsers] = useState([]);

  const [loadUsers, { data, error,  called, loading}] = useGetGithubUserInfoLazyQuery({
    variables: {
      searchQuery: search
    }
  });

  useEffect(() => {
    let timer = setTimeout(async () => {
      try {
        if (search) {
          const getUsers = await loadUsers();
          
          if (getUsers.data && !getUsers.error) {
            setSearchedUsers(getUsers.data.search.edges)
          }
        }
      } catch (err) {
        throw new Error(err.message);
      }
    }, 800);

      setSearchedUsers([])
      return () => clearTimeout(timer);

  }, [search])

  return (
    <VStack mt="10vh">
      
    <Text
      align="center"
      fontSize={["2xl", "3xl"]}
      fontWeight="bold"
      letterSpacing="tight"
      w="64"
      mb="4"
    >
      githubstats
      <Text as="span" ml="1" color="pink.500">.</Text>
    </Text>

      <Flex
        flexDir="column"
        w="100%"
        bg="gray.900"
        p="8"
        borderRadius={8}
      >
        <Flex
        as="label"
        flex="1"
        py="4"
        px="8"
        ml="8"
        w="90%"
        maxWidth='680px'
        mx="auto"
        align="center"
        color="gray.200"
        // position="relative" 
        bg="gray.800"
        borderRadius="full"
        boxShadow="md" _hover={{boxShadow: 'none'}} transition="box-shadow 200ms linear"
      >
          <Input
            color="gray.50"
            px="4"
            mr="4"
            variant="unstyled"
            placeholder="Search user"
            _placeholder={{color:'gray.400'}} 
            ref={searchInputRef}
            onChange={(e) => setSearch(e.target.value)}
          />
          {
            loading 
            ? <Spinner size="sm"/> 
            : <Icon as={RiSearchLine} fontSize="20" />
          }
        </Flex>

        <VStack gap="2" mt="5" w="100%" maxWidth='680px' mx="auto">
          {
            searchedUsers && !error ? (
              searchedUsers.map(user => {
                return (
                  <Link href={`/dashboard/${user.node.login}`} key={user.node.login}>
                    <Flex
                        align="center"
                        gap="4"
                        w="100%"
                        background="gray.800"
                        cursor="pointer"
                        pl="3"
                        py="2"
                        borderRadius="full"
                        boxShadow="md" _hover={{boxShadow: 'none'}} transition="box-shadow 200ms linear"
                      >
                        <Avatar size="md" name={user.node.name} src={user.node.avatarUrl}/>
                        <p>{user.node.login}</p>
                      </Flex>
                  </Link>
                )
              })
            ) : called && error && (
                <Text w="90%" mt="3">Something went wrong: {error.message}</Text>
              )
            }
        </VStack>
      </Flex>
    </VStack>
  ) 
}

// if user is logged in, 
// the getServerSideProps will automatically redirect user to the dashboard page
// users must be logged in to access the dashboard
