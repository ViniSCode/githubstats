import { Flex } from "@chakra-ui/react";
import { Logo } from "../Logo";
import { Profile } from "./Profile";
import { SearchBox } from "./SearchBox";

export function Header () {
  return (
    <Flex
      as="header"
      w="100%"
      maxWidth={1480}
      h="10"
      mx="auto"
      mt="8"
      px="6"
      align="center"
      >
      <Logo />
      <SearchBox />

      <Flex align="center" ml="auto">
        <Profile />
      </Flex>
    </Flex>
  );
}