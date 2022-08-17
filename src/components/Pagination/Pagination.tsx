import { Flex, Spinner } from "@chakra-ui/react";
import { LoadMore } from "./LoadMore";
import { RenderItems } from "./RenderItems";

interface PaginationProps {
  isRepo?: boolean;
  isStarred?: boolean;
  isUserFollow?: boolean;
  items?: any;
  fetchMore?: any;
  updateQuery?: any;
  loading?: any;
}

export function Pagination ({items, fetchMore, updateQuery, loading, isRepo, isStarred, isUserFollow}: PaginationProps) {

  return items && isRepo ? (
    <Flex mb="6rem" flex="1" pb="20" gap="4" alignItems="baseline"justifyContent={{xl: "space-between", lg: "space-between", md: "space-between", sm: "center"}} flexWrap={{ base: 'wrap', md: 'initial', lg: 'initial', xl: 'initial' }} pos="relative">
      <RenderItems items={items} isRepo={isRepo}/>
      <LoadMore
        items={items}
        fetchMore={fetchMore}
        updateQuery={updateQuery}
        loading={loading} 
        isRepo={isRepo}
        />
    </Flex>
  ): items && isStarred ? (
    <Flex mb="6rem" flex="1" pb="20" gap="4" alignItems="baseline"justifyContent={{xl: "space-between", lg: "space-between", md: "space-between", sm: "center"}} flexWrap={{ base: 'wrap', md: 'initial', lg: 'initial', xl: 'initial' }} pos="relative">
      <RenderItems items={items} isStarred={isStarred}/>
      <LoadMore
        items={items}
        isStarred={isStarred}
        fetchMore={fetchMore}
        updateQuery={updateQuery}
        loading={loading} 
      />
    </Flex>
  ): items && isUserFollow ? (
    <Flex mb="6rem" flex="1" pb="20" gap="4" alignItems="baseline"justifyContent={{xl: "space-between", lg: "space-between", md: "space-between", sm: "center"}} flexWrap={{ base: 'wrap', md: 'initial', lg: 'initial', xl: 'initial' }} pos="relative">
      <RenderItems items={items} isUserFollow={isUserFollow} />
      <LoadMore items={items} fetchMore={fetchMore} updateQuery={updateQuery} loading={loading}/>
    </Flex>
  ) : (
    <Flex align='center' direction="column" justify='center' height="100vh" gap='2rem'>
        <Spinner size="lg" />
    </Flex>
  )
}