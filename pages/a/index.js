import React from "react";

import { Query } from 'react-apollo';
import { adopt } from 'react-adopt';
import { gql } from "apollo-boost";


import Page from "../../components/Page";

import { CurrentUser } from '../../lib/constructors/UserConstructor';

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col';


import { Box,ProgressBar } from '../../components/Util/Layout';
import { H1, H3 } from '../../components/Util/Typography';
import { LoadingBar } from '../../components/Util/Loading';
import { AdminSideNav } from '../../components/SideNavs';

import { withGlobalAuth } from '../../components/Auth/withGlobalAuth';
import { SumWrapper, SumCountTitle, SumCountNum } from '../../components/Util/Layout';
import { ErrorIcon } from '../../components/Util/Loading';
import NotInterested from '@material-ui/icons/NotInterested';
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
    teams: ({render}) => <Query query={ADMIN_TEAM_COUNTS} fetchPolicy={'cache-and-network'}>{render}</Query>,
    targetCount:({render}) => <Query query={ADMIN_TARGETS_COUNT} fetchPolicy={'cache-and-network'}>{render}</Query>,
    householdCount:({render}) => <Query query={ADMIN_HOUSEHOLD_COUNT} fetchPolicy={'cache-and-network'}>{render}</Query>

})



class AdminDash extends React.Component {
    render(){
        let currentUser = CurrentUser(this.props);
        return(
            <Page 
                currentUser={currentUser}
                sideNavComponent={<AdminSideNav currentUser={currentUser}/>}
            >
                <Container>
                <Row bsPrefix={"row justify-content-center py-5"}>
                    <Col>
                        <Box>
                            <H1>Admin</H1>
                            <LoadingBar active={false}/>

                            <SUMS>
                                {({teams, targetCount, householdCount}) => {
                                    console.log(householdCount)
                                    return(
                                        <Row>
                                            <Col xl={4}>
                                                <SumWrapper>
                                                    <SumCountTitle>Total Teams</SumCountTitle>
                                                    {teams.error && <ErrorIcon error={teams.error}/>}
                                                    
                                                        <SumCountNum>{teams && teams.data && teams.data.summaryCountTeams ? teams.data.summaryCountTeams : <NotInterested/>}</SumCountNum>
                                                    
                                                </SumWrapper>
                                            </Col>

                                            <Col xl={4}>
                                                <SumWrapper>
                                                    <SumCountTitle>Total Volunteers</SumCountTitle>
                                                   
                                                </SumWrapper>
                                            </Col>

                                            <Col xl={4}>
                                                <SumWrapper>
                                                    <SumCountTitle>Total Targets</SumCountTitle>
                                                    {targetCount.error && <ErrorIcon error={targetCount.error}/>}
                                                    <SumCountNum>{targetCount && targetCount.data && targetCount.data.summaryCountAllTargets ? targetCount.data.summaryCountAllTargets : <NotInterested/>}</SumCountNum>
                                                    
                                                </SumWrapper>
                                            </Col>
                                       
                                            <Col xl={4}>
                                                <H3> Actions Completed: 5 / 10</H3>
                                                <ProgressBar percent={"50%"}/>
                                                <small>Not currently dynamic</small>
                                            </Col>

                                            <Col xl={4}>
                                                <SumWrapper>
                                                    <SumCountTitle>Total Household Size</SumCountTitle>
                                                    {householdCount.error && <ErrorIcon error={householdCount.error}/>}
                                                    <SumCountNum>{householdCount && householdCount.data && householdCount.data.summaryTotalAllHouseholdSize ? householdCount.data.summaryTotalAllHouseholdSize : <NotInterested/>}</SumCountNum>

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