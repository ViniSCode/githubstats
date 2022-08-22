import { Box, Flex, HStack, Icon, Image, Spinner, Text } from "@chakra-ui/react";
import { FiMail } from 'react-icons/fi';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { RiTwitterLine } from "react-icons/ri";

interface OrgOverviewProps {
  org: {
    description?: string;
    login: string;
    name: string;
    avatarUrl: string;
    email?: string;
    twitterUsername?: string;
    location?: string;
  }
}

export function OrgOverview ({org} :OrgOverviewProps) {
  return org ? (
    <Box p="6" bg="gray.800" borderRadius="30px" pb="4" w="100%" minWidth={{sm:'unset', md: 400, lg: 400, xl: 330, '2xl': 400}} maxWidth={480} minHeight={{sm: 'unset', md:"610px", lg:"610px", xl: "497px", '2xl': '610px'}} boxShadow="md" _hover={{boxShadow: 'none'}} transition="box-shadow 200ms linear">
    <Flex
        flexDirection="column"
        bg="gray.800"
        borderRadius="30px"
        align="center"
        justify="center"
        width="100%"
        height="100%"
      > 
        <Image src={org.avatarUrl} w="100%" maxWidth={{base: "380px", sm: "380px", md: "380px", lg: "380px", xl: "240px", '2xl': '380px'}} borderRadius="full" alt={org.name}/>
        <Box alignSelf="self-start" mt="3">
          <Text fontSize={{base: "22px", sm: "22px", md: "22px", lg: "22px", xl: "20px", '2xl': '22px'}} alignSelf="self-start">{org.name}</Text>
          <Text fontSize={{base: "18px", sm: "18px", md: "18px", lg: "16px", xl: "14px", '2xl': '16px'}} color="pink.500"  alignSelf="self-start">{org.login}</Text>
        </Box>
        <Text mt="2" fontSize={{base: "16px", sm: "16px", md: "16px", lg: "16px", xl: "14px", '2xl': '16px'}} noOfLines={2} alignSelf="self-start">{org.description}</Text>
        <HStack spacing="3" mt="3" alignSelf="self-start" alignItems="center">
        {
            org.location && (
              <Box display="flex" gap="0.5" alignItems="center">
                <Icon as={HiOutlineLocationMarker} fontSize={{base: "17px", sm: "17px", md: "17px", lg: "17px", xl: "14px", '2xl': '17px'}} color="gray.200"/>
                <Text color="gray.200" fontSize={{base: "14px", sm: "14px", md: "14px", lg: "14px", xl: "12px", '2xl': '14px'}}>{org.location}</Text>
              </Box>
            )
          }
          {
            org.twitterUsername && (
              <Box display="flex" gap="0.5" alignItems="center">
                <Icon as={RiTwitterLine} fontSize="17px" color="gray.200"/>
                <Text color="gray.200" fontSize="14px">{org.twitterUsername}</Text>
              </Box>
            )
          }
        </HStack>
        {
            org.email && (
              <Flex gap="1" alignSelf='self-start' mt="2" alignItems="center">
                <Icon as={FiMail} fontSize="17px" color="gray.200"/>
                <Text color="gray.200" fontSize="14px">{org.email}</Text>
              </Flex>
            )
          }
      </Flex> 
    </Box>
  ) : (
    <Box p="6" bg="gray.800" borderRadius="30px" pb="4" minWidth={{sm:'unset', md: 400, lg: 400, xl: 400}} maxWidth={480} minHeight={{sm: 'unset', md:"610px", lg:"610px", xl: "610px"}} display="flex">
      <Spinner size="lg"/>
    </Box>
  )
}