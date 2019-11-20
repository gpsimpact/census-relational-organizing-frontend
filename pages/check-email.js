import React from "react";

import Page from "../components/Page";
import  {GetCurrentUser}  from '../lib/serverQueries/CurrentUser';
import { CurrentUser } from '../lib/constructors/UserConstructor';
import { Box } from '../components/Util/Layout';
import { MainTitle, H1, H3 } from '../components/Util/Typography';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { i18n, withTranslation } from '../lib/i18'

class CheckEmail extends React.Component {
    static async getInitialProps({...ctx}) {
        const { currentUser } = await GetCurrentUser(ctx.apolloClient);
        return { currentUser,namespacesRequired: ['common'] };
      }
    render(){
        let currentUser = CurrentUser(this.props);
        return(
            <Page currentUser={currentUser} padTop>
                <Container>
                    <Row bsPrefix="row justify-content-center py-5">
                        <Col md={6}>
                            <Box> 
                            <H1 uppercase>Welcome</H1>
                            <p>Check your email to complete your login.</p>
                                {this.props && this.props.query && this.props.query.code &&
                                    <H3 uppercase>Verification Code:  <span>{this.props.query.code}</span> </H3>   
                                }


                            </Box>
                        </Col>
                    </Row>
                </Container>
            
            </Page>
        )
    }
    
}

export default withTranslation('common')(CheckEmail)