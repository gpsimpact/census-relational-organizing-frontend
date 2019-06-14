import React from "react";
import Page from "../../../components/Page";
import { withTeamAuth } from '../../../components/Auth';
import { DashSideNav } from '../../../components/Dash';
import { CurrentUser } from '../../../lib/constructors/UserConstructor';
import { CurrentQuery } from '../../../lib/constructors/BaseQueryConstructor';
import {Container, Row, Col} from '../../../components/Util/Grid';
import { gql } from "apollo-boost";
import { adopt } from 'react-adopt';
import { Query } from 'react-apollo';
import Link from "next/link";
import { Box } from '../../../components/Util/Layout';
import { MainTitle, SectionTitle } from '../../../components/Util/Typography';
import { LoadingBar,ErrorMessage } from '../../../components/Util/Loading';
import { Pagination } from "../../../components/Util/ListsAndPagination";
import { DashPaths } from "../../../paths";
import { GET_GTIBS } from '../../../components/QueryComponents/GTIBS';
import { GET_TTIBS } from '../../../components/QueryComponents/TTIBS';
import { Info } from '../../../components/Util/Typography';
import { SingleGTIBtoTTIB, SingleTTIB, CreateTTIB } from '../../../components/TIBS';


const TIBS = adopt({
        gTibs: ({render}) => <Query query={GET_GTIBS}>{render}</Query>,
        tTibs: ({teamId, render}) => <Query query={GET_TTIBS} variables={{input:{teamId: teamId}}}>{render}</Query>
    })


class DashTTIBSIndex extends React.Component {
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
                 <Row classNames={"justify-content-center"}>
                        <Col classNames={'col-md-8'}>
                        <TIBS teamId={currentTeam.id}>
                            {({gTibs, tTibs}) => {
                                const loading = (gTibs.loading || tTibs.loading);
                                const error = (gTibs.error || tTibs.error);
                                const gtibs = gTibs && gTibs.data && gTibs.data.gtibs ? gTibs.data.gtibs : [];
                                const ttibs = tTibs && tTibs.data && tTibs.data.ttibs ? tTibs.data.ttibs : [];
                                console.log(gtibs);
                                console.log(ttibs);
                                return(
                                  <Box>
                                      <MainTitle>Target Intake Booleans</MainTitle>
                                      <LoadingBar active={loading}/>
                                        {error && <ErrorMessage error={error}/>}
                                        <Info>These fields will be present for all targets.  Checked fields are active. Deactivate to temporarily hold or delete to remove permanently.</Info>
                                            <SectionTitle>Global Target Intake Booleans (recommended)</SectionTitle>
                                            {gtibs && gtibs.map((item, idx) =>{
                                                const inTTIBS = false;
                                                return(
                                                        <SingleGTIBtoTTIB gtib={item} key={idx} inTTIBS={inTTIBS} />
                                                    )
                                                })
                                            }
                                            <SectionTitle>Team Target Intake Booleans</SectionTitle>

                                            {ttibs && ttibs.map((item, idx) =>{
                                                    return(
                                                        <SingleTTIB ttib={item} key={idx} teamId={currentTeam.id}/>
                                                    )
                                                })
                                            }
                                      <CreateTTIB teamId={currentTeam.id}/>
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

export default withTeamAuth(DashTTIBSIndex, {team:['ADMIN'], global:['ADMIN']});