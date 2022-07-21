import { ChakraProvider } from '@chakra-ui/react';
import { AppProps } from 'next/app';
import { SidebarDrawerProvider } from '../Context/SidebarDrawerContext';
import { theme } from '../styles/theme';
import { SessionProvider as NextAuthProvider } from "next-auth/react"
import { GithubUserProvider } from '../Context/GithubUserContext';
import { AppProvider } from '../Context/AppContext';

function MyApp({ 
  Component,
  pageProps: { session, ...pageProps },}: AppProps) {

  return (
    <NextAuthProvider session={session}>
      <AppProvider>
        <GithubUserProvider>
          <ChakraProvider theme={theme}>
            <SidebarDrawerProvider>
              <Component {...pageProps} />
            </SidebarDrawerProvider>
          </ChakraProvider>
        </GithubUserProvider>
      </AppProvider>
    </NextAuthProvider>
  )
}

export default MyApp
