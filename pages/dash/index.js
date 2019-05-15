import React from "react";
import Page from "../../components/Page";
import { CurrentUser } from '../../lib/constructors/UserConstructor';
import {Container, Row, Col} from '../../components/Util/Grid';
import { Box } from '../../components/Util/Layout';
import { MainTitle } from '../../components/Util/Typography';
import { LoadingBar } from '../../components/Util/Loading';
import { DashSideNav } from '../../components/Dash';
import { withTeamAuth } from '../../components/Auth';


class TeamDashboard extends React.Component {
    render(){
        let currentUser = CurrentUser(this.props);
        let currentTeam = this.props.currentTeam ? this.props.currentTeam : null;

        return(
            <Page
                padTop
                currentUser={currentUser}
                navComponent={<DashSideNav currentUser={currentUser} currentTeam={currentTeam}/>}
            >
            <Container>
                <Row>
                    <Col>
                        <Box>
                            <MainTitle>{currentTeam.name}</MainTitle>
                            <LoadingBar active={false}/>

                        </Box>
                    </Col>
                </Row>

            </Container>
            

            </Page>
        )
    }
}

export default withTeamAuth(TeamDashboard, {team:['ADMIN', 'MEMBER'], global:['ADMIN']});