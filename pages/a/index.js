import React from "react";

import { Query } from 'react-apollo';
import { adopt } from 'react-adopt';
import { gql } from "apollo-boost";


import Page from "../../components/Page";

import { CurrentUser } from '../../lib/constructors/UserConstructor';
import {Container, Row, Col} from '../../components/Util/Grid';
import { Box } from '../../components/Util/Layout';
import { MainTitle } from '../../components/Util/Typography';
import { LoadingBar } from '../../components/Util/Loading';
import { SideNav } from '../../components/Admin';

import { withGlobalAuth } from '../../components/Auth';
import { SumWrapper, SumCountTitle, SumCountNum } from '../../components/Util/Layout';
import { ErrorIcon } from '../../components/Util/Loading';

export const ADMIN_TEAM_COUNTS= gql`
    query adminGetTeamCounts{
        summaryCountTeams
    }
`;

const ADMIN_TARGETS_COUNT = gql`
    query summaryCountAllTargets{
        summaryCountAllTargets
    }
`;

const ADMIN_HOUSEHOLD_COUNT = gql`
    query summaryTotalAllHouseholdSize{
        summaryTotalAllHouseholdSize
    }
`;


const SUMS = adopt({
    teams: ({render}) => <Query query={ADMIN_TEAM_COUNTS} fetchPolicy={'network-only'}>{render}</Query>,
    targetCount:({render}) => <Query query={ADMIN_TARGETS_COUNT} fetchPolicy={'network-only'}>{render}</Query>,
    householdCount:({render}) => <Query query={ADMIN_HOUSEHOLD_COUNT} fetchPolicy={'network-only'}>{render}</Query>

})



class AdminDash extends React.Component {
    render(){
        let currentUser = CurrentUser(this.props);
        return(
            <Page 
                padTop
                currentUser={currentUser}
                navComponent={<SideNav currentUser={currentUser}/>}
            >
            <Container>
                <Row classNames={"justify-content-center"}>
                    <Col>
                        <Box>
                            <MainTitle>Admin</MainTitle>
                            <LoadingBar active={false}/>

                            <SUMS>
                                {({teams, targetCount, householdCount}) => {
                                    return(
                                        <Row>
                                            <Col classNames={'col-md-4'}>
                                                <SumWrapper loading={teams.loading}>
                                                    <SumCountTitle>Total Teams</SumCountTitle>
                                                    {teams.error && <ErrorIcon error={teams.error}/>}
                                                    
                                                        <SumCountNum>{teams && teams.data && teams.data.summaryCountTeams ? teams.data.summaryCountTeams : 0}</SumCountNum>
                                                    
                                                </SumWrapper>
                                            </Col>

                                            <Col classNames={'col-md-4'}>
                                                <SumWrapper loading={false}>
                                                    <SumCountTitle>Total Volunteers</SumCountTitle>
                                                   
                                                </SumWrapper>
                                            </Col>

                                            <Col classNames={'col-md-4'}>
                                                <SumWrapper loading={targetCount.loading}>
                                                    <SumCountTitle>Total Targets</SumCountTitle>
                                                    {targetCount.error && <ErrorIcon error={targetCount.error}/>}
                                                    <SumCountNum>{targetCount && targetCount.data && targetCount.data.summaryCountAllTargets ? targetCount.data.summaryCountAllTargets : 0}</SumCountNum>
                                                    
                                                </SumWrapper>
                                            </Col>

                                            <Col classNames={'col-md-4'}>
                                                <SumWrapper loading={householdCount.loading}>
                                                    <SumCountTitle>Total Household Size</SumCountTitle>
                                                    {householdCount.error && <ErrorIcon error={householdCount.error}/>}
                                                    <SumCountNum>{householdCount && householdCount.data && householdCount.data.summaryTotalAllHouseholdSize ? householdCount.data.summaryTotalAllHouseholdSize : 0}</SumCountNum>

                                                </SumWrapper>
                                            </Col>

                                        </Row>
                                    )
                                }}
                            </SUMS>

                        </Box>
                    </Col>
                </Row>
            </Container>


            </Page>
        )
    }

}

export default withGlobalAuth(AdminDash, 'ADMIN');