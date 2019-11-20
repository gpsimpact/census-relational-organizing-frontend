
import React from "react";
import  {GetCurrentUser}  from '../lib/serverQueries/CurrentUser';
import { CurrentUser } from '../lib/constructors/UserConstructor';
import Page from '../components/Page';
import { UpdateProfileForm } from '../components/Auth';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { H1 } from "../components/Util/Typography";
import { parseCookies, setCookie, destroyCookie } from 'nookies';
import { Box } from '../components/Util/Layout';
import redirect from "../lib/redirect";

import { i18n, withTranslation } from '../lib/i18'

class Logout extends React.Component {
  static async getInitialProps({...ctx}) {
    destroyCookie(ctx, 'token');
    ctx.apolloClient.cache.reset().then(() => {
        // Redirect to a more useful page when signed out
        redirect({}, '/')
      })
    return { namespacesRequired:['common']};
  }

  render(){
    return(
      <Page>
            <Container>
                <Row bsPrefix={'row justify-content-center py-5'}>
                    <Col md={6}>
                        <Box>
                            <H1> You have logged out.</H1>
                        </Box>
                    </Col>
                </Row>
        </Container>
      </Page>

    )
  }
}

export default withTranslation('common')(Logout);