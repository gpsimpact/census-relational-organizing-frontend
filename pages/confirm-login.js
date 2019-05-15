import React from "react";
import cookie from "cookie";
import { withApollo } from "react-apollo";
import { gql } from "apollo-boost";

import Page from '../components/Page';
import { Container, Row, Col } from '../components/Util/Grid';
import { Box } from '../components/Util/Layout';
import { FormTitle } from '../components/Util/Typography';
import MutationOnMount from '../components/MutationOnMount';
import { LoadingBar, ErrorMessage } from '../components/Util/Loading';
import { FormError } from '../components/Util/Forms';
import redirect from '../lib/redirect';


export const CONFIRM_LOGIN_MUTATION = gql`
mutation confirmLogin($token: String!) {
  confirmLogin(token: $token) {
    code
    success
    message
    token
  }
}
`;

class Confirm extends React.Component {
    render(){
        return(
        <Page padTop>
            <Container>
                <Row classNames={'justify-content-center'}>
                    <Col classNames={"col-md-6"}>
                        <Box>
                            <FormTitle>Logging In</FormTitle>
                            <MutationOnMount 
                                mutation={CONFIRM_LOGIN_MUTATION} 
                                variables={{token:this.props.query.token}}
                                onCompleted={async data => {
                                    console.log(data);
                                    if(data && data.confirmLogin && data.confirmLogin.token && data.confirmLogin.success){
                                    document.cookie = cookie.serialize('token', data.confirmLogin.token, {
                                        maxAge: 30 * 24 * 60 * 60 // 30 days
                                    })
                                    // Force a reload of all the current queries now that the user is
                                    // logged in
                                    this.props.client.cache.reset().then(() => {
                                        redirect({}, '/')
                                    })
                                    }
                                }}
                                >
                            {(mutate, { data, loading, error}) => {
                                if(loading) {
                                return (<LoadingBar active={true}/>);
                                }
                                if(error) {
                                    return(
                                    <React.Fragment>
                                        <LoadingBar active={false}/>
                                        <ErrorMessage error={error}/>
                                    </React.Fragment>
                                    );
                                }
                                if(data && !data.confirmLogin.success) {
                                return(
                                    <React.Fragment>
                                        <LoadingBar active={false}/>
                                         <FormError error={{code: data.confirmLogin.code, message:data.confirmLogin.message}}/>
                                    </React.Fragment>

                                    );
                                }

            

                                return null;

                                

                            
                            }}
                            </MutationOnMount>
                        </Box>
                    </Col>
                </Row>
            </Container>
        </Page>
        )
    }
}

export default withApollo(Confirm);