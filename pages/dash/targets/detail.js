import React from "react";
import { withTeamAuth } from '../../../components/Auth';
import { DashSideNav } from '../../../components/Dash';
import { CurrentUser } from '../../../lib/constructors/UserConstructor';
import {Container, Row, Col} from '../../../components/Util/Grid';
import { Box } from '../../../components/Util/Layout';
import { MainTitle } from '../../../components/Util/Typography';
import Page from "../../../components/Page";
import { Query } from 'react-apollo';
import { ErrorMessage } from '../../../components/Util/Loading';

class DashTargetDetail extends React.Component {
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
                    <Row classNames={'justify-content-center'}>
                        <Col classNames={'col-md-8'}>
                            <Box>
                                <MainTitle>Peer Target</MainTitle>
                          
                            </Box>
                        
                        </Col>
                    </Row>
                </Container>

            </Page>
        )
    }
}

export default withTeamAuth(DashTargetDetail, {team:['ADMIN', 'MEMBER'], global:['ADMIN']});