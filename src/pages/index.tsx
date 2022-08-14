import { gql, useLazyQuery } from '@apollo/client';
import { Avatar, Flex, Icon, Input, Spinner, Text, VStack } from '@chakra-ui/react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { RiSearchLine } from 'react-icons/ri';

const GET_USER_INFO = gql`  
  query ($searchQuery: String!){ 
    search(first: 5, query:$searchQuery , type: USER) {
      edges{
        node{
          ... on User{
            login
            name
            avatarUrl
            location
            id
            url
          }
        }
      }
    }
  }
`

interface searchedUsers {
  node: {
    name: string;
    login: string;
    avatarUrl: string;
    location: string;
    id: string;
    url: string;
  }
}

export default function Search() {
  const [isError, setIsError] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null); 
  const [search, setSearch] = useState("");
  const [searchedUsers, setSearchedUsers] = useState<searchedUsers[]>();

  const [loadUsers, { called, loading, data, error }] = useLazyQuery(
    GET_USER_INFO,
    { variables: { searchQuery: search } }
  );

  // console.log(data)

  useEffect(() => {
    let timer = setTimeout(async () => {
      try {
        if (search) {
          const getUsers = await loadUsers();
  
          if (getUsers.error) {
            setIsError(true);
          }      
  
          if (getUsers.data && !getUsers.error) {
            setIsError(false);
            setSearchedUsers(getUsers.data.search.edges);
          }
        }
      } catch (err) {
        throw new Error(err.message);
      }
    }, 800);

      console.log('no search')
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
        position="relative" 
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

        <VStack gap="2" mt="10" w="100%" maxWidth='680px' mx="auto">
          {
            searchedUsers && (
              searchedUsers.map(user => {
                return (
                  <Link href={user.node.url} key={user.node.id}>
                    <Flex align="center" gap="6" w="100%">
                      <Avatar size="md" name={user.node.name} src={user.node.avatarUrl}/>
                      <p>{user.node.login}</p>
                    </Flex>
                  </Link>
                )
              })
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
