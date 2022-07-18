import { Box, Flex, HStack, Icon, Image, Spinner, Text, VStack } from '@chakra-ui/react';
import { Header } from "../components/Header";
import { Sidebar } from '../components/Sidebar';
import { BiBuilding } from 'react-icons/bi'
import { HiOutlineLocationMarker } from 'react-icons/hi'
import { StarredRepo } from '../components/starredRepo';
import { useEffect, useState } from 'react';
import { getSession, useSession } from 'next-auth/react';

interface UserGithubData {
  // avatar: string;
  bio: string;
  company?: string; 
  login: string;
  name: string;
}

type UserSession =  {
  name?: string;
  email?: string;
  image?: string;
}

export default function  Dashboard () {
    // next-auth does not provide a github username or id by default, 
    const [userGithubData, setUserGithubData] = useState<UserGithubData>();

    useEffect(() => {
      const fetchUserData = async () => {
        const {user} = await getSession();
  
        const userImageUrl = user.image.split('/').pop();
        const userId = userImageUrl.split('?')[0];
  
        fetch(`https://api.github.com/user/${userId}`)
        .then(response => response.json())
        .then(data => setUserGithubData(data))
        .catch(err => console.log(err))
      
      }
      fetchUserData();
      
    }, [])
    

  return userGithubData ? (
    <Flex direction="column" h="100vh" pb="4">
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6" mt="8">
        <Sidebar />

        <Flex flex="1" gap="4" alignItems="flex-start" justifyContent={{ base: 'center', md: 'center', lg: 'space-between', xl: 'space-between' }} flexWrap={{ base: 'wrap', md: 'initial', lg: 'initial', xl: 'initial' }}>
          <Box mb="4">
            <Box p="6" bg="gray.800" borderRadius="30px" pb="4" minWidth={{sm:'unset', md: 400, lg: 400, xl: 400}} maxWidth={480} minHeight={{sm: 'unset', md:"610px", lg:"610px", xl: "610px"}}>
            <Flex
                flexDirection="column"
                bg="gray.800"
                borderRadius="30px"
                align="center"
                justify="center"
                width="100%"
                height="100%"
              >
                <Image src='https://github.com/viniscode.png' w="100%" maxWidth="380px" borderRadius="full" alt='viniscode'/>
                <Box alignSelf="self-start" mt="3">
                  <Text fontSize={["22px", "32px"]} alignSelf="self-start">ViniSCode</Text>
                  <Text fontSize={["18px", "19px"]} color="pink.500"  alignSelf="self-start">{userGithubData.login}</Text>
                </Box>

                <Text mt="4" fontSize="1xl" noOfLines={2} alignSelf="self-start">{userGithubData.bio}</Text>
                <HStack spacing="3" mt="3" alignSelf="self-start" alignItems="c                 enter">
                  <Box display="flex" gap="0.5">
                    <Icon as={HiOutlineLocationMarker} fontSize="17px" color="gray.200"/>
                    <Text color="gray.200" fontSize="14px">Brazil, RS</Text>
                  </Box>
                  <Box display="flex" gap="0.5" alignItems="center">
                    <Icon as={BiBuilding} fontSize="17px" color="gray.200"/>
                    <Text color="gray.200" fontSize="14px">@Rocketseat</Text>
                  </Box>
                </HStack>
              </Flex> 
            </Box>
          </Box>
          <Box borderRadius="8" pb="4" width="100%">
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
  ): (
    <Flex align='center' direction="column" justify='center' height="100vh" gap='2rem'>
      <Text textAlign='center' fontSize="xl">
        Something went wrong...
      </Text>
        <Spinner size="lg" />
    </Flex>
  )
} 
