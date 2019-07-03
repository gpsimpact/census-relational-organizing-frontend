import React from "react";
import Page from "../../components/Page";
import { CurrentUser } from '../../lib/constructors/UserConstructor';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col';

import { Box, HR } from '../../components/Util/Layout';
import { H1 } from '../../components/Util/Typography';
import { LoadingBar } from '../../components/Util/Loading';
import { DashSideNav } from '../../components/SideNavs';
import { withTeamAuth } from '../../components/Auth';
import { DashAdminHome, DashVolHome } from "../../components/Dash";

class TeamDashboard extends React.Component {
    render(){
        let currentUser = CurrentUser(this.props);
        let currentTeam = this.props.currentTeam ? this.props.currentTeam : null;

        return(
            <Page
                currentUser={currentUser}
                sideNavComponent={<DashSideNav currentUser={currentUser} currentTeam={currentTeam}/>}
            >
            <Container>
                <Row bsPrefix="row py-5">
                    <Col md={12}>
                        <Box>
                            <H1 uppercase>{currentTeam.name}</H1>
                            <LoadingBar active={false}/>
                            {
                                (currentUser.hasGlobalPermission('ADMIN') || currentUser.hasTeamPermission(currentTeam.slug, 'ADMIN')) &&
                                <React.Fragment>
                                    <DashAdminHome currentTeam={currentTeam} currentUser={currentUser}/>
                                    <HR/>
                                </React.Fragment>

                            }

                            <DashVolHome currentTeam={currentTeam} currentUser={currentUser}/>
                            

                        </Box>
                    </Col>
                </Row>

            </Container>
            

            </Page>
        )
    }
}

export default withTeamAuth(TeamDashboard, {team:['ADMIN', 'MEMBER'], global:['ADMIN']});