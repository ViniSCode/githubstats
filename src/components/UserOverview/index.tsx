import { Box, Flex, HStack, Icon, Image, Spinner, Text } from "@chakra-ui/react";
import { BiBuilding } from 'react-icons/bi';
import { HiOutlineLocationMarker } from 'react-icons/hi';

interface UserOverviewProps {
  user: {
    bio: string;
    company?: string; 
    login: string;
    name: string;
    location?: string;
    avatarUrl: string;
  }
}

export function UserOverview ({user} :UserOverviewProps) {
  return user ? (
    <Box p="6" bg="gray.800" borderRadius="30px" pb="4" minWidth={{sm:'unset', md: 400, lg: 400, xl: 400}} maxWidth={480} minHeight={{sm: 'unset', md:"610px", lg:"610px", xl: "610px"}} boxShadow="md" _hover={{boxShadow: 'none'}} transition="box-shadow 200ms linear">
    <Flex
        flexDirection="column"
        bg="gray.800"
        borderRadius="30px"
        align="center"
        justify="center"
        width="100%"
        height="100%"
      >
        
        <Image src={user.avatarUrl} w="100%" maxWidth="380px" borderRadius="full" alt={user.name}/>
        <Box alignSelf="self-start" mt="3">
          <Text fontSize={["22px", "32px"]} alignSelf="self-start">{user.name}</Text>
          <Text fontSize={["18px", "19px"]} color="pink.500"  alignSelf="self-start">{user.login}</Text>
        </Box>

        <Text mt="4" fontSize="1xl" noOfLines={2} alignSelf="self-start">{user.bio}</Text>
        <HStack spacing="3" mt="3" alignSelf="self-start" alignItems="center">
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
  ) : (
    <Box p="6" bg="gray.800" borderRadius="30px" pb="4" minWidth={{sm:'unset', md: 400, lg: 400, xl: 400}} maxWidth={480} minHeight={{sm: 'unset', md:"610px", lg:"610px", xl: "610px"}} display="flex">
      <Spinner size="lg"/>
    </Box>
  )
}