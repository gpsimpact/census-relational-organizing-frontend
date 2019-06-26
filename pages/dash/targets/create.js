import React from "react";
import { withTeamAuth } from '../../../components/Auth';
import { DashSideNav } from '../../../components/Dash';
import { CurrentUser } from '../../../lib/constructors/UserConstructor';
import {Container, Row, Col} from '../../../components/Util/Grid';
import { Box } from '../../../components/Util/Layout';
import { MainTitle } from '../../../components/Util/Typography';
import Page from "../../../components/Page";
import { CreatePeerTargetForm } from '../../../components/Targets';
import { Query } from 'react-apollo';
import { GET_TTIBS } from '../../../components/QueryComponents/TTIBS';
import { GET_GTIBS } from '../../../components/QueryComponents/GTIBS';
import { ErrorMessage } from '../../../components/Util/Loading';
import { adopt } from 'react-adopt';

const TIBS = adopt({
    gTibs: ({render}) => <Query query={GET_GTIBS} variables={{input:{active:true, visible:true, tibType:"QUESTION"}}}>{render}</Query>,
    tTibs: ({teamId, render}) => <Query query={GET_TTIBS} variables={{input:{teamId: teamId, active:true, visible:true, tibType:"QUESTION"}}}>{render}</Query>
})

class DashTargetCreate extends React.Component {
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
                                <MainTitle>Create New Peer Target</MainTitle>
                                <TIBS teamId={currentTeam.id}>
                                    {({gTibs, tTibs}) => {
                                        const loading = (gTibs.loading || tTibs.loading);
                                        const error = (gTibs.error || tTibs.error);
                                        const gtibs = gTibs && gTibs.data && gTibs.data.gtibs ? gTibs.data.gtibs : [];
                                        const ttibs = tTibs && tTibs.data && tTibs.data.ttibs ? tTibs.data.ttibs : [];
                                        const tibs = [...gtibs, ...ttibs];
                                        return(
                                            <React.Fragment>
                                                {error && <ErrorMessage error={error}/>}
                                                <CreatePeerTargetForm team={currentTeam} currentUser={currentUser} tibs={tibs}/>

                                            </React.Fragment>
                                        )
                                    }}


                                </TIBS>
                         
                            </Box>
                        
                        </Col>
                    </Row>
                </Container>

            </Page>
        )
    }
}

export default withTeamAuth(DashTargetCreate, {team:['ADMIN', 'MEMBER'], global:['ADMIN']});