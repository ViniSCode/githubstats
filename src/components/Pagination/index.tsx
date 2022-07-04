import { Box, Button, Flex, Stack, Text } from "@chakra-ui/react";
import { PaginationItem } from './PaginationItem';

export function Pagination () {
  return (
   <Stack
      direction={["column", "row"]}
      mt="8"
      justify="space-between"
      align="center"
      spacing="6"
    >
      <Stack direction="row" spacing="2">
        <PaginationItem number={1} isCurrent/>
        <PaginationItem number={2} />
        <PaginationItem number={3} />
        <Flex
          alignItems="center"
          justify="center"
          fontSize="xs"
          pl="2"
          pr="2"
          borderRadius="0.375rem"
          bg="gray.700"
        >
          ...
        </Flex>
        <PaginationItem number={8} />
        <PaginationItem number={9} />
        <PaginationItem number={10} />
      </Stack>
    </Stack>
  );
}