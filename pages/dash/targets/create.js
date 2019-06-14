import React from "react";
import { withTeamAuth } from '../../../components/Auth';
import { DashSideNav } from '../../../components/Dash';
import { CurrentUser } from '../../../lib/constructors/UserConstructor';
import {Container, Row, Col} from '../../../components/Util/Grid';
import { Box } from '../../../components/Util/Layout';
import { MainTitle } from '../../../components/Util/Typography';
import Page from "../../../components/Page";
import { CreatePeerTargetForm } from '../../../components/Targets';
import { GET_TTIBS } from '../../../components/QueryComponents/TTIBS';
import { Query } from 'react-apollo';
import { ErrorMessage } from '../../../components/Util/Loading';

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
                                <Query query={GET_TTIBS} variables={{input:{teamId:currentTeam.id}}}>
                                    {({data,error,loading}) => {
                                            const tibs = data && data.ttibs ? data.ttibs : [];
                                            return(
                                                <React.Fragment>
                                                    {error && <ErrorMessage error={error}/>}
                                                    <CreatePeerTargetForm team={currentTeam} currentUser={currentUser} tibs={tibs}/>
    
                                                </React.Fragment>
    
    
                                            )
                                       
                                    }}
                                </Query>
                            </Box>
                        
                        </Col>
                    </Row>
                </Container>

            </Page>
        )
    }
}

export default withTeamAuth(DashTargetCreate, {team:['ADMIN', 'MEMBER'], global:['ADMIN']});