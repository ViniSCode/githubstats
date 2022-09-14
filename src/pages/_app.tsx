import { ApolloProvider } from '@apollo/client';
import { ChakraProvider } from '@chakra-ui/react';
import { AppProps } from 'next/app';
import { AppProvider } from '../Context/AppContext';
import { SidebarDrawerProvider } from '../Context/SidebarDrawerContext';
import { client } from '../lib/apollo';
import { theme } from '../styles/theme';

function MyApp({ 
  Component,
  pageProps: { ...pageProps },}: AppProps) {

  return (
      <ApolloProvider client={client}>
        <AppProvider>
            <ChakraProvider theme={theme}>
              <SidebarDrawerProvider>
                <Component {...pageProps} />
              </SidebarDrawerProvider>
            </ChakraProvider>
        </AppProvider>
      </ApolloProvider>
  )
}

export default MyApp

