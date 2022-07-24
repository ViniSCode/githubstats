import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import { useGithubData } from "../../hooks/useGithubData";

interface ProfileProps {
  showProfileData?: boolean;  
}

export function Profile ({ showProfileData = true }: ProfileProps) {
  const { userData } = useGithubData();

  return userData && (
    <Flex align="center">
      { showProfileData && (
        <Box mr="4" textAlign="right">
            <Text>{userData.name}</Text>
            <Text color="gray.300" fontSize="small">
              {userData.login}
            </Text>
        </Box> )
      }
      <Avatar size="md" name={userData.name} src={userData.avatar_url}/>
    </Flex>
  );
}