import React from "react";

import Page from "../components/Page";
import  {GetCurrentUser}  from '../lib/serverQueries/CurrentUser';
import { CurrentUser } from '../lib/constructors/UserConstructor';
import { Container, Row, Col } from '../components/Util/Grid';
import { Box } from '../components/Util/Layout';
import { MainTitle } from '../components/Util/Typography';

class CheckEmail extends React.Component {
    static async getInitialProps({...ctx}) {
        const { currentUser } = await GetCurrentUser(ctx.apolloClient);
        return { currentUser };
      }
    render(){
        let currentUser = CurrentUser(this.props);
        return(
            <Page currentUser={currentUser} padTop>
                <Container>
                    <Row classNames={'justify-content-center'}>
                        <Col classNames={'col-md-6'}>
                            <Box> 
                            <MainTitle>Welcome</MainTitle>
                            <p>Check your email to complete your login.</p>
                                {this.props && this.props.query && this.props.query.code &&
                                    <h2>Verification Code:  <span>{this.props.query.code}</span> </h2>   
                                }


                            </Box>
                        </Col>
                    </Row>
                </Container>
            
            </Page>
        )
    }
    
}

export default CheckEmail