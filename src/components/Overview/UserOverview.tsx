import { Box, Flex, HStack, Icon, Image, Spinner, Text } from "@chakra-ui/react";
import { BiBuilding } from 'react-icons/bi';
import { HiOutlineLocationMarker } from 'react-icons/hi';

interface UserOverviewProps {
  user: {
    bio?: string;
    company?: string; 
    login: string;
    name: string;
    location?: string;
    avatarUrl: string;
    following?: {
      totalCount: number
    }
    followers?: {
      totalCount: number
    }
  }
}

export function UserOverview ({user} :UserOverviewProps) {

  // format follower to 1k, 1M
  function kFormatter(num: number) {
    if (num > 999999) {
      return num ? (num/1000000).toFixed(1) + 'M' : num
    } 
    else if (num > 999) {
      return num ? (num/1000).toFixed(1) + 'k' : num
    } 
    
    else {
      return num
    }
  }

  return user ? (
    <Box p="6" bg="gray.800" borderRadius="30px" pb="4" w="100%" minWidth={{sm:'unset', md: 400, lg: 400, xl: 330, '2xl': 400}} maxWidth={480} minHeight={{sm: 'unset', md:"610px", lg:"610px", xl: "497px", '2xl': '610px'}} boxShadow="md" _hover={{boxShadow: 'none'}} transition="box-shadow 200ms linear">
      <Flex flexDirection="column" bg="gray.800" borderRadius="30px" align="center" justify="center" width="100%" height="100%">
        <Image src={user.avatarUrl} w="100%" maxWidth={{base: "380px", sm: "380px", md: "380px", lg: "380px", xl: "240px", '2xl': '380px'}} borderRadius="full" alt={user.name}/>
        <Box alignSelf="self-start" mt="3">
          <Text fontSize={{base: "22px", sm: "22px", md: "22px", lg: "22px", xl: "20px", '2xl': '22px'}} alignSelf="self-start">{user.name}</Text>
          <Text fontSize={{base: "18px", sm: "18px", md: "18px", lg: "16px", xl: "14px", '2xl': '16px'}} color="pink.500"  alignSelf="self-start">{user.login}</Text>
        </Box>

        <Flex alignSelf="self-start" gap="4" mt="2">
          <Flex gap="1">
            <Text fontWeight="bold" fontSize={{base: "16px", sm: "16px", md: "16px", lg: "16px", xl: "14px", '2xl': '16px'}}>{ kFormatter(user.followers.totalCount) }</Text>
            <Text fontSize={{base: "16px", sm: "16px", md: "16px", lg: "16px", xl: "14px", '2xl': '16px'}}>Followers</Text>
          </Flex>

          <Flex gap="1">
            <Text fontWeight="bold" fontSize={{base: "16px", sm: "16px", md: "16px", lg: "16px", xl: "14px", '2xl': '16px'}}>{ kFormatter(user.following.totalCount) }</Text>
            <Text fontSize={{base: "16px", sm: "16px", md: "16px", lg: "16px", xl: "14px", '2xl': '16px'}}>Following</Text>
          </Flex>
        </Flex>

        <Text mt="2" fontSize={{base: "16px", sm: "16px", md: "16px", lg: "16px", xl: "14px", '2xl': '16px'}} noOfLines={2} alignSelf="self-start">{user.bio}</Text>
        <HStack spacing="3" mt="3" alignSelf="self-start" alignItems="center">
          {
            user.location && (
              <Box display="flex" gap="0.5" alignItems="center">
                <Icon as={HiOutlineLocationMarker} fontSize={{base: "17px", sm: "17px", md: "17px", lg: "17px", xl: "14px", '2xl': '17px'}} color="gray.200"/>
                <Text color="gray.200" fontSize={{base: "14px", sm: "14px", md: "14px", lg: "14px", xl: "12px", '2xl': '14px'}}>{user.location}</Text>
              </Box>
            )
          }
          {
            user.company && (
              <Box display="flex" gap="0.5" alignItems="center">
                <Icon as={BiBuilding} fontSize={{base: "17px", sm: "17px", md: "17px", lg: "17px", xl: "14px", '2xl': '17px'}} color="gray.200"/>
                <Text color="gray.200" fontSize={{base: "14px", sm: "14px", md: "14px", lg: "14px", xl: "12px", '2xl': '14px'}}>{user.company}</Text>
              </Box>
            )
          }
        </HStack>
      </Flex> 
    </Box>
  ) : (
    <Box p="6" bg="gray.800" borderRadius="30px" pb="4" minWidth={{sm:'unset', md: 400, lg: 400, xl: 400}} maxWidth={480} minHeight={{sm: 'unset', md:"610px", lg:"610px", xl: "610px"}} display="flex">
      <Spinner size="lg"/>
    </Box>
  )
}