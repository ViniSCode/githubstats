import { Avatar, Flex, Icon, Input, Spinner, Text, VStack } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { RiSearchLine } from 'react-icons/ri';
import { useGetGithubUserDataLazyQuery } from '../../graphql/generated/schema';
import { useAppContext } from '../../hooks/useAppContext';

export default function SearchBoxModal() {
  const searchInputRef = useRef<HTMLInputElement>(null); 
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [searchedUsers, setSearchedUsers] = useState([]);
  const {handleSetIsSearchModalOpen} = useAppContext();

  const [loadUsers, { data, error,  called, loading}] = useGetGithubUserDataLazyQuery({
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

  }, [search]);

  useEffect(() => {
    const close = (e) => {
      if(e.key === 'Escape'){
        handleSetIsSearchModalOpen(false)
      }
    }
    window.addEventListener('keydown', close)
  return () => window.removeEventListener('keydown', close)
},[])

  return (
    <VStack mt="20" zIndex={20} position="absolute" top='0' left='0' right='0' w="680px" mx="auto">
      <Flex
        flexDir="column"
        p="8"
        bg="gray.900"
        maxWidth="680px"
        w="100%"
        borderRadius={8}
      >
        <Flex
        as="label"
        flex="1"
        py="4"
        px="8"
        ml="8"
        w="100%"
        maxWidth='680px'
        mx="auto"
        align="center"
        color="gray.200"
        mt="2"
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
            autoFocus={true}
          />
          {
            loading 
            ? <Spinner size="sm"/> 
            : <Icon as={RiSearchLine} fontSize="20" />
          }
        </Flex>

        <VStack gap="2" mt="2" w="100%" maxWidth='680px' mx="auto">
          {
            searchedUsers && !error ? (
              searchedUsers.map(user => {
                return (
                  <Link href={`/${user.node.login}`} key={user.node.login}>
                    <Flex
                        onClick={() => handleSetIsSearchModalOpen(false)}
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
