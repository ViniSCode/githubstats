import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { ChakraProvider } from '@chakra-ui/react';
import { SessionProvider as NextAuthProvider } from "next-auth/react";
import { AppProps } from 'next/app';
import { AppProvider } from '../Context/AppContext';
import { ReposProvider } from '../Context/ReposContext';
import { SidebarDrawerProvider } from '../Context/SidebarDrawerContext';
import { StarredReposProvider } from '../Context/StarredReposContext';
import { UserProvider } from '../Context/UserContext';
import { theme } from '../styles/theme';

function MyApp({ 
  Component,
  pageProps: { session, ...pageProps },}: AppProps) {


  const client = new ApolloClient({
    uri: 'https://api.github.com/graphql',
    cache: new InMemoryCache()
  })

  return (
    <NextAuthProvider session={session}>
      <ApolloProvider client={client}>
        <AppProvider>
            <UserProvider>
              <ReposProvider>
              <StarredReposProvider>
                  <ChakraProvider theme={theme}>
                    <SidebarDrawerProvider>
                      <Component {...pageProps} />
                    </SidebarDrawerProvider>
                  </ChakraProvider>
              </StarredReposProvider>
              </ReposProvider>
          </UserProvider>
        </AppProvider>
      </ApolloProvider>
    </NextAuthProvider>
  )
}

export default MyApp