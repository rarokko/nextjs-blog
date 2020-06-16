import fetch from 'node-fetch';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-client';
import '../styles/global.css'
import { createHttpLink } from 'apollo-link-http';

export default function App({ Component, pageProps }) {

  const uri = "api/dynamo_get";
  const link = createHttpLink({ uri, fetch: fetch });

  const client = new ApolloClient({
    link,
    cache: new InMemoryCache()
  });
  
  return (
    <>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </>
  )

}
