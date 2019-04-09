import {
    ApolloClient,
    InMemoryCache,
    NormalizedCacheObject
  } from "apollo-boost";
  import { setContext } from "apollo-link-context";
  import { createHttpLink } from "apollo-link-http";
  import fetch from "isomorphic-unfetch";
  import { isBrowser } from "./isBrowser";
  import { withClientState } from 'apollo-link-state';

import { clientDefaults, clientMutations } from './resolvers';
import { ApolloLink } from "apollo-link";

  let apolloClient: ApolloClient<NormalizedCacheObject> | null = null;
  
  // Polyfill fetch() on the server (used by apollo-client)
  if (!isBrowser) {
    (global as any).fetch = fetch;
  }
  
  interface Options {
    getToken: () => string;
  }
  
  function create(initialState: any, { getToken }: Options) {
    const cache = new InMemoryCache().restore(initialState || {})

    const stateLink = withClientState({
      cache: cache,
      resolvers: {
        Mutation: { ...clientMutations },
      },
      defaults: clientDefaults,
    });

    const httpLink = createHttpLink({
      uri: process.env.GRAPHQL_API_ENDPOINT,
      credentials: "include",

    });
  
    const authLink = setContext((_, { headers }) => {
      const token = getToken();
      return {
        headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : ""

        }
      };
    });
  
    // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
    
    // const httpLink = createHttpLink({
    //   uri: process.env.GRAPHQL_API_ENDPOINT,
    //   credentials: 'same-origin'
    // })
  
    // return new ApolloClient({
    //   connectToDevTools: process.browser,
    //   ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
    //   link: authLink.concat(httpLink),
    //   cache: new InMemoryCache().restore(initialState || {})
    // })
    
    return new ApolloClient({
      connectToDevTools: isBrowser,
      ssrMode: !isBrowser, // Disables forceFetch on the server (so queries are only run once)
      link: ApolloLink.from([
        stateLink,
        authLink.concat(httpLink),
      ]), 
      cache: cache
    });
  }
  
  export default function initApollo(initialState: any, options: Options) {
    // Make sure to create a new client for every server-side request so that data
    // isn't shared between connections (which would be bad)
    if (!isBrowser) {
      return create(initialState, options);
    }
  
    // Reuse client on the client-side
    if (!apolloClient) {
      apolloClient = create(initialState, options);
    }
  
    return apolloClient;
  }