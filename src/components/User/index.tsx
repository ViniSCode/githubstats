import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import { AiFillGithub } from 'react-icons/ai';
import { UserAvatar } from "./UserAvatar";

interface UserProps {
  avatar_url?: string;
  name?: string;
  login?: string;
  bio?: string;
}

export function User ({avatar_url, login}: UserProps) {
  return (
    <Flex bg="gray.800" p="3" alignItems="center" borderRadius="md" w="100%" maxWidth="100%" padding="0.625rem">
      <UserAvatar src={avatar_url} name={login}/>
      <Box w="100%">
        <Flex gap="4" align="center" justify="space-between">
          <Flex align="center" gap="4">
            <Text fontSize="18px" color="pink.500" noOfLines={1}>{login}</Text>
          </Flex>
          <Icon as={AiFillGithub} fontSize="25px" color="gray.200"/>
        </Flex>
        <Text fontSize="13px" color="gray.300" noOfLines={1} maxWidth="90%">{login}</Text>
      </Box>
    </Flex>
  );
}