import App, { Container } from 'next/app'
import React from 'react'
import { ApolloProvider } from 'react-apollo'
import withApollo from '../lib/withApollo'
import redirect from '../lib/redirect';
import { Normalize } from 'styled-normalize';
import { ThemeProvider } from 'styled-components';
import { theme, AddGlobals } from '../styles/Theme';
import { Meta } from '../lib/siteMeta';

class Application extends App {
    static async getInitialProps({Component, ctx}) {
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

    render(){
        const { Component, pageProps, apolloClient } = this.props;
        return(
            <Container>
                   <ThemeProvider theme={theme}>
                        <ApolloProvider client={apolloClient}>
                            <React.Fragment>
                                <Normalize/>
                                <AddGlobals/>
                                <Meta/>
                                <Component { ...pageProps} />
                                
                            </React.Fragment>
                        </ApolloProvider>
                   </ThemeProvider>
            </Container>
        )
    }
}

export default withApollo(Application);