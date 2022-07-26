import { Flex, Spinner } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { PageItems } from './PageItems';
import styles from './test.module.css';

interface Items {
  name: string;
  description?: string;
  html_url: string;
  language: string;
  stargazers_count?: number;
}

interface PaginationProps {
  isRepo?: boolean;
  itemsPerPage: number;
  repos?: Items[];
  followers?: Followers[]
}

interface Followers{
  name: string;
  login: string;
  avatar_url: string;
  html_url: string;
}

export function Pagination({ itemsPerPage, repos, followers, isRepo = false }: PaginationProps) {

  const [currentItems, setCurrentItems] = useState<Items[]>();
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  let items;

  if (isRepo) {
    items = repos;
  } else {
    items = followers;
  }

    useEffect(() => {
      const endOffset = itemOffset + itemsPerPage;  
      setCurrentItems(items.slice(itemOffset, endOffset));
  
      setPageCount(Math.ceil(items.length / itemsPerPage));
    }, [itemOffset, itemsPerPage]);
  
    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % items.length;
      setItemOffset(newOffset);
    };  

    return currentItems ? (
      <Flex mb="6rem" flex="1" pb="20" gap="4" alignItems="baseline"justifyContent={{xl: "space-between", lg: "space-between", md: "space-between", sm: "center"}} flexWrap={{ base: 'wrap', md: 'initial', lg: 'initial', xl: 'initial' }} pos="relative">
        <PageItems currentItems={currentItems} isRepo={isRepo}/>
        <ReactPaginate
          breakLabel="..."
          nextLabel="next"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          
          previousLabel="prev"
          renderOnZeroPageCount={null}
      
          breakClassName={styles.item}
          breakLinkClassName={styles.item}
          containerClassName={styles.pagination}
          pageClassName={styles.item}
          pageLinkClassName={styles.link}
          previousClassName={styles.prev}
          previousLinkClassName={styles.prevLink}
          nextClassName={styles.next}
          nextLinkClassName={styles.nextLink}
          activeClassName={styles.active}
          disabledClassName={styles.disabled}
        />
      </Flex>
    ): (
      <Flex align='center' direction="column" justify='center' height="100vh" gap='2rem'>
          <Spinner size="lg" />
      </Flex>
    )
  }