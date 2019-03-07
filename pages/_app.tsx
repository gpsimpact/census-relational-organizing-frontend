import App, { Container } from "next/app";
import React from "react";
import { ApolloProvider } from "react-apollo";
import { Normalize } from 'styled-normalize';

import withApollo from "../lib/withApollo";
import { ThemeProvider, theme } from "../lib/styled";
import { AddGlobals } from '../styles';
import Meta from '../lib/siteMeta';
import redirect from "../lib/redirect";



class MyApp extends App<any> {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    let nextPage: string;

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    if(ctx.query){
        (pageProps as any).query = ctx.query;
    }
    nextPage = (pageProps as any).nextPage
    if(nextPage) {
      redirect(ctx, `${nextPage}`);
    }
    return { pageProps };
  }

  render() {
    const { Component, pageProps, apolloClient } = (this as any).props;
    return (
      <Container>
        <ApolloProvider client={apolloClient}>
          <ThemeProvider theme={theme}>
            <>
            <Normalize/>
            <AddGlobals/>
            <Meta/>
            <Component {...pageProps} />
            </>
          </ThemeProvider>
        </ApolloProvider>
      </Container>
    );
  }
}

export default withApollo(MyApp);