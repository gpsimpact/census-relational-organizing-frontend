import React from "react";
import { withTeamAuth } from '../../../components/Auth';
import { DashSideNav } from '../../../components/SideNavs';
import { CurrentUser } from '../../../lib/constructors/UserConstructor';

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col';


import { Box } from '../../../components/Util/Layout';
import { H1 } from '../../../components/Util/Typography';
import Page from "../../../components/Page";
import { CreateContactForm } from '../../../components/Contacts';
import { Query } from 'react-apollo';
import { GET_TTIBS } from '../../../components/Queries/TTIBS';
import { GET_GTIBS } from '../../../components/Queries/GTIBS';
import { ErrorMessage } from '../../../components/Util/Loading';
import { adopt } from 'react-adopt';

const TIBS = adopt({
    gTibs: ({render}) => <Query query={GET_GTIBS} variables={{input:{active:true, visible:true, tibType:"QUESTION"}}}>{render}</Query>,
    tTibs: ({teamId, render}) => <Query query={GET_TTIBS} variables={{input:{teamId: teamId, active:true, visible:true, tibType:"QUESTION"}}}>{render}</Query>
})

class DashContactCreate extends React.Component {
    render(){
        let currentUser = CurrentUser(this.props);
        let currentTeam = this.props.currentTeam ? this.props.currentTeam : null;

        return(
            <Page
                currentUser={currentUser}
                sideNavComponent={<DashSideNav currentUser={currentUser} currentTeam={currentTeam}/>}
                pageTitle={`${currentTeam.name} Dashboard`}

            >
                <Container>
                    <Row bsPrefix={'row justify-content-center py-5'}>
                        <Col md={8}>
                            <Box>
                                <H1 uppercase>Create New Household Contact</H1>
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
                                                <CreateContactForm team={currentTeam} currentUser={currentUser} tibs={tibs}/>

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

export default withTeamAuth(DashContactCreate, {team:['ADMIN', 'MEMBER'], global:['ADMIN']});