
import React from "react";
import  {GetCurrentUser}  from '../lib/serverQueries/CurrentUser';
import { CurrentUser } from '../lib/constructors/UserConstructor';
import Page from '../components/Page';
import { RegisterForm } from '../components/Auth/RegisterForm';
import { Container, Row, Col } from '../components/Util/Grid';

class Index extends React.Component {
  static async getInitialProps({...ctx}) {
    const { currentUser } = await GetCurrentUser(ctx.apolloClient);
    return { currentUser };
  }

  render(){
    let currentUser = CurrentUser(this.props);
    let teamSlug = null;
    if(this.props.query && this.props.query.team){
        teamSlug = this.props.query.team
    }
    console.log(teamSlug)

    return(
      <Page padTop currentUser={currentUser}>  
        <Container>
            <Row classNames={'justify-content-center'}>
                <Col classNames={'col-md-6'}>
                    <RegisterForm teamSlug={teamSlug}/>
                </Col>
            </Row>
        </Container>
      </Page>

    )
  }
}

export default Index;