import { Box, Icon, Link as ChakraLink, LinkProps as ChakraLinkProps, Text } from "@chakra-ui/react";
import { ElementType } from "react";
import { ActiveLink } from "../ActiveLink";

interface NavLinkProps extends ChakraLinkProps{
  icon: ElementType;
  children: string;
  href?: string;
  onclick?: () => void;
  isLogout?: boolean;
}

export function NavLink ({icon, href, isLogout, children, ...rest}: NavLinkProps) {
  if (isLogout) {
    return (
      <Box cursor="pointer">
        <Box display="flex" alignItems="center">
          <Icon as={icon} fontSize="20" />
          <Text ml="4" fontWeight="medium" _hover={{
            textDecoration: 'underline'
            }}>{children}</Text>
        </Box>
      </Box>
    );
  }
  return (
    <ActiveLink href={href} passHref>
      <ChakraLink display="flex" alignItems="center" {...rest}>
        <Icon as={icon} fontSize="20" />
        <Text ml="4" fontWeight="medium">{children}</Text>
      </ChakraLink>
    </ActiveLink>
  );
}