
import React from "react";
import  {GetCurrentUser}  from '../lib/serverQueries/CurrentUser';
import { CurrentUser } from '../lib/constructors/UserConstructor';
import Page from '../components/Page';
import { UpdateProfileForm } from '../components/Auth';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class Index extends React.Component {
  static async getInitialProps({...ctx}) {
    const { currentUser } = await GetCurrentUser(ctx.apolloClient);
    if(!currentUser || !currentUser.me) {
        nextPage = `/`;
        return { nextPage };
    }
    return { currentUser };
  }

  render(){
    let currentUser = CurrentUser(this.props);
    return(
      <Page currentUser={currentUser}>
            <Container>
                <Row bsPrefix={'row justify-content-center'}>
                    <Col md={6}>
                        <UpdateProfileForm currentUser={currentUser}/>
                    </Col>
                </Row>
        </Container>
      </Page>

    )
  }
}

export default Index;