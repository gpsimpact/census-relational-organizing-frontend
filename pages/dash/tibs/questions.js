import React from "react";
import Page from "../../../components/Page";
import { withTeamAuth } from '../../../components/Auth';
import { DashSideNav } from '../../../components/SideNavs';
import { CurrentUser } from '../../../lib/constructors/UserConstructor';

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col';


import { adopt } from 'react-adopt';
import { Query } from 'react-apollo';
import { Box } from '../../../components/Util/Layout';
import { H1, H3 } from '../../../components/Util/Typography';
import { LoadingBar,ErrorMessage } from '../../../components/Util/Loading';
import { GET_GTIBS } from '../../../components/Queries/GTIBS';
import { GET_TTIBS } from '../../../components/Queries/TTIBS';
import { Info } from '../../../components/Util/Typography';
import { SingleTIBContainer, SingleTTIB, CreateTTIB, DefaultTib } from '../../../components/TIBS';


const TIBS = adopt({
        gTibs: ({render}) => <Query query={GET_GTIBS} variables={{input:{active:true, tibType:'QUESTION'}}}>{render}</Query>,
        tTibs: ({teamId, render}) => <Query query={GET_TTIBS} variables={{input:{teamId: teamId, active:true, tibType:'QUESTION'}}}>{render}</Query>
    })


class DashQuestionsIndex extends React.Component {
    render(){
        let currentUser = CurrentUser(this.props);
        let currentTeam = this.props.currentTeam ? this.props.currentTeam : null;
    
        return(
            <Page
                padTop
                currentUser={currentUser}
                sideNavComponent={<DashSideNav currentUser={currentUser} currentTeam={currentTeam}/>}
            >
                <Container>
                 <Row bsPrefix={"row justify-content-center py-5"}>
                        <Col md={8}>
                        <TIBS teamId={currentTeam.id}>
                            {({gTibs, tTibs}) => {
                                const loading = (gTibs.loading || tTibs.loading);
                                const error = (gTibs.error || tTibs.error);
                                const gtibs = gTibs && gTibs.data && gTibs.data.gtibs ? gTibs.data.gtibs : [];
                                const ttibs = tTibs && tTibs.data && tTibs.data.ttibs ? tTibs.data.ttibs : [];
                                return(
                                  <Box>
                                      <H1 uppercase>Target Intake Booleans</H1>
                                      <LoadingBar active={loading}/>
                                        {error && <ErrorMessage error={error}/>}
                                        <Info>These fields will be present for all targets.  Checked fields are active. Deactivate to temporarily hold or delete to remove permanently.</Info>
                                            {gtibs && <H3>Default Target Intake Questions</H3>}
                                            {gtibs && gtibs.map((item, idx) =>{
                                                const inTTIBS = false;
                                                return(
                                                    <SingleTIBContainer key={idx}>
                                                        <Row>
                                                            <Col md={12}>
                                                                <DefaultTib>{item.text}</DefaultTib>
                                                            </Col>
                                                        </Row>

                                                    </SingleTIBContainer>
                                                    )
                                                })
                                            }
                                            <H3>Additional Target Intake Questions</H3>

                                            {ttibs && ttibs.map((item, idx) =>{
                                                    return(
                                                        <SingleTTIB ttib={item} key={idx} teamId={currentTeam.id} tibType={'QUESTION'}/>
                                                    )
                                                })
                                            }
                                      <CreateTTIB teamId={currentTeam.id} tibType={'QUESTION'}/>
                                  </Box>   
                                )
                            }}
                        </TIBS>
             
                        
                        </Col>
                    </Row>
                </Container>
            </Page>

        )
    }
}

export default withTeamAuth(DashQuestionsIndex, {team:['ADMIN'], global:['ADMIN']});