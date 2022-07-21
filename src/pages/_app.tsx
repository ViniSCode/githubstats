import { ChakraProvider } from '@chakra-ui/react';
import { AppProps } from 'next/app';
import { SidebarDrawerProvider } from '../Context/SidebarDrawerContext';
import { theme } from '../styles/theme';
import { SessionProvider as NextAuthProvider } from "next-auth/react"
import { GithubDataProvider } from '../Context/GithubDataContext';

function MyApp({ 
  Component,
  pageProps: { session, ...pageProps },}: AppProps) {

  return (
    <NextAuthProvider session={session}>
      <GithubDataProvider>
        <ChakraProvider theme={theme}>
          <SidebarDrawerProvider>
            <Component {...pageProps} />
          </SidebarDrawerProvider>
        </ChakraProvider>
        </GithubDataProvider>
    </NextAuthProvider>
  )
}

export default MyApp
