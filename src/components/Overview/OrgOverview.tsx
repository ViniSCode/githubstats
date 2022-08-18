import { Box, Flex, HStack, Icon, Image, Spinner, Text } from "@chakra-ui/react";
import { FiMail } from "react-icons/fi";
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { RiTwitterLine } from "react-icons/ri";

interface UserOverviewProps {
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

export function OrgOverview ({org} :UserOverviewProps) {
  return org ? (
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
        <Image src={org.avatarUrl} w="100%" maxWidth="380px" borderRadius="full" alt={org.name}/>
        <Box alignSelf="self-start" mt="3">
          <Text fontSize={["22px", "32px"]} alignSelf="self-start">{org.name}</Text>
          <Text fontSize={["18px", "19px"]} color="pink.500"  alignSelf="self-start">{org.login}</Text>
        </Box>

        <Text mt="2" fontSize="1xl" noOfLines={2} alignSelf="self-start">{org.description}</Text>
        <HStack spacing="3" mt="3" alignSelf="self-start" alignItems="center">
          {
            org.location && (
              <Box display="flex" gap="0.5" alignItems="center">
                <Icon as={HiOutlineLocationMarker} fontSize="17px" color="gray.200"/>
                <Text color="gray.200" fontSize="14px">{org.location}</Text>
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