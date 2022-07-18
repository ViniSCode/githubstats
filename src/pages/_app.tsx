import { ChakraProvider } from '@chakra-ui/react';
import { AppProps } from 'next/app';
import { SidebarDrawerProvider } from '../Context/SidebarDrawerContext';
import { theme } from '../styles/theme';
import { SessionProvider as NextAuthProvider } from "next-auth/react"

function MyApp({ 
  Component,
  pageProps: { session, ...pageProps },}: AppProps) {

  return (
    <NextAuthProvider session={session}>
        <ChakraProvider theme={theme}>
          <SidebarDrawerProvider>
            <Component {...pageProps} />
          </SidebarDrawerProvider>
        </ChakraProvider>
    </NextAuthProvider>
  )
}

export default MyApp
