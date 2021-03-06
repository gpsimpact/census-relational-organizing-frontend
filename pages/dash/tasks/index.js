import React from "react";


import Page from "../../../components/Page";
import { CurrentUser } from '../../../lib/constructors/UserConstructor';
import { withTeamAuth } from '../../../components/Auth';

import { DashSideNav } from '../../../components/SideNavs';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col';


import { Box } from '../../../components/Util/Layout';
import { H1, Info } from '../../../components/Util/Typography';
import { LoadingBar } from '../../../components/Util/Loading';
import { i18n, withTranslation } from '../../../lib/i18'

class  DashTasksIndex extends React.Component {
    render(){
        let currentUser = CurrentUser(this.props);
        let currentTeam = this.props.currentTeam ? this.props.currentTeam : null;

        return(
            <Page 
                currentUser={currentUser}
                sideNavComponent={<DashSideNav currentUser={currentUser} currentTeam={currentTeam}/>}
                pageTitle={`${currentTeam.name} ${this.props.t('DASHBOARD')}`}

            >
                <Container>
                    <Row bsPrefix="row py-5">
                        <Col>
                        <Box>
                            <H1>
                                {this.props.t('TASKS')}
                            </H1>
                            <LoadingBar />
                            <Info> Tasks coming soon.  Example below.</Info>
                            <img src="https://civic-promotor.s3-us-west-2.amazonaws.com/images/TaskExample_yellow.png"/>
                        </Box>
                        </Col>
                    </Row>
                </Container>
            </Page>
        )
    }

}

export default withTranslation('common')(withTeamAuth(DashTasksIndex, {team:['ADMIN'], global:['ADMIN']}));