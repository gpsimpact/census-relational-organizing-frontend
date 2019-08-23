import React from "react";
import { CurrentUser } from '../../../lib/constructors/UserConstructor';
import Page from "../../../components/Page";
import { AdminSideNav } from '../../../components/SideNavs';

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col';

import { AdminCreateTeamForm, AdminEditTeamForm } from '../../../components/Admin';

import { Box } from '../../../components/Util/Layout';
import { H1 } from '../../../components/Util/Typography';
import { withGlobalAuth } from "../../../components/Auth";

class AdminTeamDetail extends React.Component {
    render(){
        let currentUser = CurrentUser(this.props);
        let currentTeam = this.props.currentTeam ? this.props.currentTeam : null;
        return(
            <Page 
                currentUser={currentUser}
                sideNavComponent={<AdminSideNav currentUser={currentUser}/>}
            >
                  <Container>
                        <Row bsPrefix={'row justify-content-center py-5'}>
                            <Col md={6}>
                                <Box>
                                    <H1>Edit Team</H1>
                                    <AdminEditTeamForm team={currentTeam}/>
                                </Box>

                            </Col>
                        </Row>
                  </Container>


            </Page>
        )
    }
}

export default withGlobalAuth(AdminTeamDetail, 'ADMIN');