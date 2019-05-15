import App, { Container } from 'next/app'
import React from 'react'
import { ApolloProvider } from 'react-apollo'
import withApollo from '../lib/withApollo'

import { Normalize } from 'styled-normalize';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import { theme, AddGlobals } from '../styles/Theme';
import { Meta } from '../lib/siteMeta';
import redirect from '../lib/redirect';

class Application extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    let nextPage;
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    if(ctx.query){
      pageProps.query = ctx.query;
    }
    nextPage = pageProps.nextPage;
    if(nextPage){
      redirect(ctx, `${nextPage}`);
    }
    return { pageProps };

  }
  render () {
    const { Component, pageProps, apolloClient } = this.props
    return (
      <Container>
        <ApolloProvider client={apolloClient}>
          <ThemeProvider theme={theme}>
            <React.Fragment>
                <Normalize/>
                <AddGlobals/>
                <Meta/>
                <Component {...pageProps} />
            </React.Fragment>
          </ThemeProvider>
        </ApolloProvider>
      </Container>
    )
  }
}

export default withApollo(Application)
