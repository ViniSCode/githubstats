import { Flex } from "@chakra-ui/react";
import { Sidebar } from "../components/Sidebar";
import { Header } from './../components/Header/index';

export default function Repositories () {
  return (
    <Flex direction="column" h="100vh">
    <Header />
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6" mt="8">
        <Sidebar />
      </Flex>
    </Flex>
  );
}