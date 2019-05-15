import React from "react";
import { gql } from "apollo-boost";
import { Query, Mutation } from "react-apollo";


import { CurrentUser } from '../../../lib/constructors/UserConstructor';
import Page from "../../../components/Page";
import { SideNav, AdminCreateTeamForm } from '../../../components/Admin';
import {Container, Row, Col} from '../../../components/Util/Grid';
import { Box } from '../../../components/Util/Layout';
import { MainTitle } from '../../../components/Util/Typography';
import { LoadingBar } from '../../../components/Util/Loading';
import { withGlobalAuth } from "../../../components/Auth";
import { ErrorMessage } from '../../../components/Util/Loading';


class AdminTeamCreate extends React.Component {
    render(){
        let currentUser = CurrentUser(this.props);
        return(
            <Page padTop
                currentUser={currentUser}
                navComponent={<SideNav currentUser={currentUser}/>}
            >
                  <Container>
                        <Row classNames={'justify-content-center'}>
                            <Col classNames={'col-md-6'}>
                                <Box>
                                    <MainTitle>Create New Team</MainTitle>
                                    <AdminCreateTeamForm/>
                                </Box>

                            </Col>
                        </Row>
                  </Container>


            </Page>
        )
    }
}

export default withGlobalAuth(AdminTeamCreate, 'ADMIN');