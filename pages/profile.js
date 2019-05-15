
import React from "react";
import  {GetCurrentUser}  from '../lib/serverQueries/CurrentUser';
import { CurrentUser } from '../lib/constructors/UserConstructor';
import Page from '../components/Page';
import { Container, Row, Col } from '../components/Util/Grid';
import { UpdateProfileForm } from '../components/Auth/UpdateProfileForm';

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
      <Page padTop currentUser={currentUser}>
            <Container>
                <Row classNames={'justify-content-center'}>
                    <Col classNames={'col-md-6'}>
                        <UpdateProfileForm currentUser={currentUser}/>
                    </Col>
                </Row>
        </Container>
      </Page>

    )
  }
}

export default Index;