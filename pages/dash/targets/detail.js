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
import { gql } from "apollo-boost";
import redirect from "../../../lib/redirect";
import { DashPaths } from "../../../paths";
import { LoadingBar } from '../../../components/Util/Loading';
import { EditPeerTargetForm, EditTargetTibs, TargetCompletions, TargetTasks } from '../../../components/Targets';
import { HR } from '../../../components/Util/Layout';

export const GET_TARGET = gql`
    query getTarget($id: String!){
        target(id: $id){
            id
            firstName
            lastName
            email
            address
            city
            state
            zip5
            phone
            twitterHandle
            facebookProfile
            householdSize
            tibs {
                id
                text
                isApplied
            }
            active
        }
    }
`;


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
                        <Col classNames={'col-md-12'}>
                            <Query query={GET_TARGET} variables={{id:this.props.query.target}}>
                                {({data,loading,error}) => {
                                    let target = data && data.target ? data.target : {};
                                     if(loading){
                                         return(
                                             <Box>
                                                  <MainTitle> Peer Target</MainTitle>
                                                  <LoadingBar active={loading}/>
                                                  {error && <ErrorMessage error={error}/>}

                                             </Box>
                                         )
                                     }
                                     return(
                                        <Box>
                                        <MainTitle>{target.firstName} {target.lastName} </MainTitle>
                                        <LoadingBar active={loading}/>
                                        {error && <ErrorMessage error={error}/>}
                                            <Row>
                                                <Col classNames={'col-md-6'}>
                                                        {target && <EditPeerTargetForm target={target}/>}
                                                </Col>
                                                <Col classNames={'col-md-6'}>
                                                        <TargetCompletions  target={target}/>

                                                </Col>
                                            </Row>
                                            <HR/>

                                            <Row>
                                                <Col classNames={'col-md-6'}>
                                                        <EditTargetTibs target={target}/>
                                                </Col>
                                                <Col classNames={'col-md-6'}>
                                                    <TargetTasks target={target}/>
                                                </Col>
                                            </Row>


                                        </Box>
                                     )
                                }}
                            </Query>
                        </Col>
                    </Row>
                </Container>

            </Page>
        )
    }
}

export default withTeamAuth(DashTargetDetail, {team:['ADMIN', 'MEMBER'], global:['ADMIN']});