
import React from "react";
import  {GetCurrentUser}  from '../lib/serverQueries/CurrentUser';
import { CurrentUser } from '../lib/constructors/UserConstructor';
import Page from '../components/Page';
import { UpdateLanguageForm } from '../components/Auth';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { i18n, withTranslation } from '../lib/i18'

class Language extends React.Component {
  static async getInitialProps({...ctx}) {
    const { currentUser } = await GetCurrentUser(ctx.apolloClient);
    if(!currentUser || !currentUser.me) {
        nextPage = `/`;
        return { nextPage };
    }
    return { currentUser, namespacesRequired:['common'] };
  }

  render(){
    let currentUser = CurrentUser(this.props);
    return(
      <Page currentUser={currentUser}>
            <Container>
                <Row bsPrefix={'row justify-content-center'}>
                    <Col md={6}>
                        <UpdateLanguageForm currentUser={currentUser}/>
                    </Col>
                </Row>
        </Container>
      </Page>

    )
  }
}

export default withTranslation('common')(Language);