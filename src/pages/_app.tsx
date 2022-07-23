import { ChakraProvider } from '@chakra-ui/react';
import { SessionProvider as NextAuthProvider } from "next-auth/react";
import { AppProps } from 'next/app';
import { AppProvider } from '../Context/AppContext';
import { GithubReposProvider } from '../Context/GithubReposContext';
import { GithubStarredReposProvider } from '../Context/GithubStarredReposContext';
import { GithubUserProvider } from '../Context/GithubUserContext';
import { SidebarDrawerProvider } from '../Context/SidebarDrawerContext';
import { theme } from '../styles/theme';

function MyApp({ 
  Component,
  pageProps: { session, ...pageProps },}: AppProps) {

  return (
    <NextAuthProvider session={session}>
      <AppProvider>
          <GithubUserProvider>
            <GithubReposProvider>
            <GithubStarredReposProvider>
              <ChakraProvider theme={theme}>
                <SidebarDrawerProvider>
                  <Component {...pageProps} />
                </SidebarDrawerProvider>
              </ChakraProvider>
            </GithubStarredReposProvider>
            </GithubReposProvider>
        </GithubUserProvider>
      </AppProvider>
    </NextAuthProvider>
  )
}

export default MyApp
