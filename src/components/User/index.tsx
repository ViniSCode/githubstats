import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import Link from "next/link";
import { AiFillGithub } from 'react-icons/ai';
import { UserAvatar } from "./UserAvatar";

interface UserProps {
  avatar_url?: string;
  name?: string;
  login?: string;
  bio?: string;
  location?: string;
  company?: string;
}

export function User ({avatar_url, login, bio, name, location, company}: UserProps) {
  return (
    <Link href={`/${login}`}>
      <Flex bg="gray.800" p="3" alignItems="center" borderRadius="md" w="100%" maxWidth="100%" padding="0.625rem" cursor="pointer">
        <UserAvatar src={avatar_url} name={name}/>
        <Box w="100%">
          <Flex gap="4" align="center" justify="space-between">
            <Flex align="center" gap="4">
              {
                name ? (
                  <Text fontSize="18px" color="pink.500" noOfLines={1}>{name}</Text>
                ): (
                  <Text fontSize="18px" color="pink.500" noOfLines={1}>{login}</Text>
                )
              }
            </Flex>
            <Icon as={AiFillGithub} fontSize="25px" color="gray.200"/>
          </Flex>
          {
            bio && (
              <Text fontSize="14px" color="white" noOfLines={1} pr="6">{bio}</Text>
            )
          }
          <Box noOfLines={1} display="flex" gap="1">
            <Text fontSize="13px" color="gray.300" noOfLines={1} maxWidth="90%">{login}</Text>
              {
                location && (
                  <>
                    <Text fontSize="13px" color="gray.300" noOfLines={1} maxWidth="90%">●</Text>
                    <Text fontSize="13px" color="gray.300" noOfLines={1} maxWidth="90%">{location}</Text>
                  </>
                )
              }
          </Box>
        </Box>
      </Flex>
    </Link>
  );
}