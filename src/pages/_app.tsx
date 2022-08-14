import { ApolloProvider } from '@apollo/client';
import { ChakraProvider } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { getSession } from "next-auth/react";
import { AppProps } from 'next/app';
import { AppProvider } from '../Context/AppContext';
// import { ReposProvider } from '../Context/ReposContext';
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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx)

  if (!session) {
    console.log('you cannot access this page if not logged in')
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  } 

  return ({props: {session}})
}
  