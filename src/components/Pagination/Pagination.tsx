import { Flex, Spinner } from "@chakra-ui/react";
import { LoadMore } from "./LoadMore";
import { LoadMoreFollow } from "./LoadMoreFollow";
import { RenderItems } from "./RenderItems";

interface PaginationProps {
  items?: any;
  fetchMore?: any;
  updateQuery?: any;
  loading?: any;
  itemsType: string;
}

export function Pagination ({items, fetchMore, updateQuery, loading, itemsType}: PaginationProps) {
  // Paginate Repos
  // As we can see I decided to create some validations and then paginate the data according to its type
  return items && itemsType === "repos" ? (
    <Flex mb="6rem" flex="1" pb="20" gap="4" alignItems="baseline"justifyContent={{xl: "space-between", lg: "space-between", md: "space-between", sm: "center"}} flexWrap={{ base: 'wrap', md: 'initial', lg: 'initial', xl: 'initial' }} pos="relative">
      <RenderItems items={items} itemsType={itemsType}/>
      <LoadMore items={items} fetchMore={fetchMore} updateQuery={updateQuery} loading={loading} itemsType={itemsType} />
    </Flex>
  ): items && itemsType === "starred" ? (
    <Flex mb="6rem" flex="1" pb="20" gap="4" alignItems="baseline"justifyContent={{xl: "space-between", lg: "space-between", md: "space-between", sm: "center"}} flexWrap={{ base: 'wrap', md: 'initial', lg: 'initial', xl: 'initial' }} pos="relative">
      <RenderItems items={items} itemsType={itemsType}/>
      <LoadMore items={items} itemsType={itemsType} fetchMore={fetchMore} updateQuery={updateQuery} loading={loading} />
    </Flex>
  )
    // Paginate user following/followers and org members
  : items && itemsType === "followers" ? (
    <Flex mb="6rem" flex="1" pb="20" gap="4" alignItems="baseline"justifyContent={{xl: "space-between", lg: "space-between", md: "space-between", sm: "center"}} flexWrap={{ base: 'wrap', md: 'initial', lg: 'initial', xl: 'initial' }} pos="relative">
      <RenderItems items={items} itemsType={itemsType}/>
      <LoadMoreFollow items={items} fetchMore={fetchMore} updateQuery={updateQuery} loading={loading} itemsType={itemsType} />
    </Flex>
  ) : items && itemsType === "following" ? (
    <Flex mb="6rem" flex="1" pb="20" gap="4" alignItems="baseline"justifyContent={{xl: "space-between", lg: "space-between", md: "space-between", sm: "center"}} flexWrap={{ base: 'wrap', md: 'initial', lg: 'initial', xl: 'initial' }} pos="relative">
      <RenderItems items={items} itemsType={itemsType}/>
      <LoadMoreFollow items={items} fetchMore={fetchMore} updateQuery={updateQuery} loading={loading} itemsType={itemsType} />
    </Flex>
  ) : items && itemsType === "members" ? (
    <Flex mb="6rem" flex="1" pb="20" gap="4" alignItems="baseline"justifyContent={{xl: "space-between", lg: "space-between", md: "space-between", sm: "center"}} flexWrap={{ base: 'wrap', md: 'initial', lg: 'initial', xl: 'initial' }} pos="relative">
      <RenderItems items={items} itemsType={itemsType}/>
      <LoadMoreFollow items={items} fetchMore={fetchMore} updateQuery={updateQuery} loading={loading} itemsType={itemsType} />
    </Flex>
  )
  :(
    <Flex align='center' direction="column" justify='center' height="100vh" gap='2rem'>
        <Spinner size="lg" />
    </Flex>
  )
}