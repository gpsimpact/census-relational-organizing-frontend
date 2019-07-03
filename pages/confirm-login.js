import React from "react";
import cookie from "cookie";
import { withApollo } from "react-apollo";
import { gql } from "apollo-boost";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { Box } from "../components/Util/Layout";
import { H1 } from "../components/Util/Typography";
import MutationOnMount from "../components/MutationOnMount";
import { LoadingBar } from "../components/Util/Loading";
import { FormError } from "../components/Util/Forms";
import redirect from '../lib/redirect';
import Page from "../components/Page";

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
            <Page>
                <Container>
                    <Row bsPrefix={"row justify-content-center py-5"}>
                        <Col md={6}>
                            <Box>
                                <H1 uppercase>Logging In</H1>
                                <MutationOnMount 
                                    mutation={CONFIRM_LOGIN_MUTATION} 
                                    variables={{token:this.props.query.token}}
                                    onCompleted={async data => {
                                        if(data && data.confirmLogin && data.confirmLogin.token && data.confirmLogin.success){
                                        document.cookie = cookie.serialize('token', data.confirmLogin.token, {
                                            maxAge: 30 * 24 * 60 * 60 // 30 days
                                        })
                                        // Force a reload of all the current queries now that the user is
                                        // logged in
                                        let nextPage = '/';
                                        if(this.props.query.next){
                                            nextPage=this.props.query.next;
                                        }
                                        this.props.client.cache.reset().then(() => {
                                            redirect({}, nextPage);
                                        })
                                        }
                                    }}
                                >
                                    {(mutate, { data, loading, error}) => {
                                        return(
                                            <React.Fragment>
                                                <LoadingBar active={loading}/>
                                                {error && <FormError error={error}/>}
                                            </React.Fragment>
                                        )
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