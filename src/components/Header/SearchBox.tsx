import { Flex, Icon, Text } from "@chakra-ui/react";
import { useRef } from "react";
import { RiSearchLine } from 'react-icons/ri';
import { useAppContext } from "../../hooks/useAppContext";

export function SearchBox () {
  const searchInputRef = useRef<HTMLInputElement>(null); 
  const { handleSetIsSearchModalOpen, isSearchModalOpen } = useAppContext();  
  return (
    <Flex
      mt={{base:"8rem",sm: "6rem", md: "0", lg: "0", xl: "0"}}
      onClick={() => handleSetIsSearchModalOpen(true)}
      cursor="pointer"
      as="label"
      flex="1"
      py="4"
      px="8"
      ml={{sm:"auto", md:"auto", lg: "8", xl: "8" }}
      mr={{sm: "auto", md: "0", lg: "0", xl: "0"}}
      maxWidth={400}
      align="center"
      color="gray.200"
      position="relative" 
      bg="gray.800"
      borderRadius="full"
      boxShadow="md" _hover={{boxShadow: 'none'}} transition="box-shadow 200ms linear"
    >
      <Text
        cursor="pointer"
        color="gray.400"
        variant="unstyled"
      >
        Search user
      </Text>
      <Icon as={RiSearchLine} fontSize="20" ml="auto"/>
    </Flex>
  );
}