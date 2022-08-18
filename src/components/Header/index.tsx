import { Flex, Icon, IconButton, Text, useBreakpointValue } from '@chakra-ui/react';
import { RiMenuLine } from 'react-icons/ri';
import { useSidebarDrawer } from '../../Context/SidebarDrawerContext';
import { Logo } from './Logo';
import { SearchBox } from './SearchBox';

export function Header () {
  const { onOpen }= useSidebarDrawer();
  
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  })

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
      { !isWideVersion && (
        <IconButton 
          aria-label='Open navigation'
          icon={<Icon as={RiMenuLine}/>}
          fontSize="24"
          variant="unstyled"
          onClick={onOpen}
          mr="2"
          mt="2"
        />
      )}

      <Logo />
      {isWideVersion && <SearchBox />}
    
      <Flex align="center" ml="auto">
        {/* <Profile showProfileData={isWideVersion}/> */}
        <Text>Centralizado</Text>
      </Flex>
    </Flex>
  );
}