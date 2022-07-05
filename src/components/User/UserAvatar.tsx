import { Avatar, Flex } from "@chakra-ui/react";

interface UserAvatarProps {
  src: string;
  name: string;
}

export function UserAvatar ({src, name}: UserAvatarProps) {
  return (
    <Flex align="baseline" mr="0.625rem">
      <Avatar size="lg" name={name} src={src}/>
    </Flex>
  );
}