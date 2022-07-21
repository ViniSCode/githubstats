import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useGithubData } from "../../hooks/useGithubData";

interface ProfileProps {
  showProfileData?: boolean;  
}

export function Profile ({ showProfileData = true }: ProfileProps) {
  const { isLoading, isError, userData } = useGithubData();

  return (
    <Flex align="center">
      { showProfileData && (
        <Box mr="4" textAlign="right">
            <Text>{userData.name}</Text>
            <Text color="gray.300" fontSize="small">
              {userData.login}
            </Text>
        </Box> )
      }
      <Avatar size="md" name="Diego Fernandes" src={userData.avatar_url}/>
    </Flex>
  );
}