import React from 'react';
import { Query } from 'react-apollo';
import { adopt } from 'react-adopt';
import { gql } from "apollo-boost";
import PropTypes from 'prop-types';

import { Row, Col } from '../Util/Grid';
import { SumWrapper, SumCountTitle, SumCountNum } from '../Util/Layout';
import { ErrorIcon } from '../Util/Loading';
import { SectionTitle } from '../Util/Typography';

const USER_COUNTS = gql`
    query teamUsers($input: TeamUsersInput!){
        teamUsers(input:$input){
            hasMore
            totalCount
        }
    }
`;

const TEAM_TARGETS_COUNT = gql`
    query summaryCountAllTeamTargets($teamId: String!){
        summaryCountAllTeamTargets(teamId: $teamId)
    }
`;


const TEAM_HOUSEHOLD_COUNT = gql`
    query summaryTotalAllTeamHouseholdSize($teamId: String!){
        summaryTotalAllTeamHouseholdSize(teamId: $teamId)
    }
`;

const SUMS = adopt({
    vols: ({teamId, render}) => <Query query={USER_COUNTS} variables={{input:{limit:10000, offset:0, includePermissions:['ADMIN', 'MEMBER'], teamId:teamId}}} fetchPolicy={'network-only'}>{render}</Query>,
    targetCount:({teamId, render}) => <Query query={TEAM_TARGETS_COUNT} variables={{teamId:teamId}} fetchPolicy={'network-only'}>{render}</Query>,
    householdCount:({teamId, render}) => <Query query={TEAM_HOUSEHOLD_COUNT} variables={{teamId:teamId}} fetchPolicy={'network-only'}>{render}</Query>
});



export class DashAdminHome extends React.Component {
    render(){
        const {currentTeam, currentUser } = this.props;
        return(
            <SUMS teamId={currentTeam.id}>
                {({vols, targetCount, householdCount}) => {
                 
                    return(
                        <Row>
                            <Col>
                                <SectionTitle>Team Counts</SectionTitle>
                            </Col>
                        
                            <Col classNames={'col-md-4'}>
                                <SumWrapper loading={vols.loading}>
                                    <SumCountTitle>Total Volunteers</SumCountTitle>
                                    {vols.error && <ErrorIcon error={vols.error}/>}
                                    {vols.data && vols.data.teamUsers && vols.data.teamUsers.totalCount &&
                                        <SumCountNum>{vols.data.teamUsers.totalCount}</SumCountNum>
                                    }
                                </SumWrapper>
                            </Col>
                            <Col classNames={'col-md-4'}>
                                <SumWrapper loading={targetCount.loading}>
                                    <SumCountTitle>Total Targets</SumCountTitle>
                                    {targetCount.error && <ErrorIcon error={targetCount.error}/>}
                                    {targetCount.data && targetCount.data.summaryCountAllTeamTargets &&
                                        <SumCountNum>{targetCount.data.summaryCountAllTeamTargets}</SumCountNum>
                                    }
                                </SumWrapper>
                            </Col>
                            <Col classNames={'col-md-4'}>
                                <SumWrapper loading={householdCount.loading}>
                                    <SumCountTitle>Total Household Size</SumCountTitle>
                                    {householdCount.error && <ErrorIcon error={householdCount.error}/>}
                                    {householdCount.data && householdCount.data.summaryTotalAllTeamHouseholdSize &&
                                        <SumCountNum>{householdCount.data.summaryTotalAllTeamHouseholdSize}</SumCountNum>
                                    }
                                </SumWrapper>
                            </Col>

                            
                        </Row>
                    )
                }}
            </SUMS>
        )
    }
}


DashAdminHome.propTypes = {
    currentTeam: PropTypes.object.isRequired,
}