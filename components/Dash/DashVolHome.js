import React from 'react';
import { Query } from 'react-apollo';
import { adopt } from 'react-adopt';
import { gql } from "apollo-boost";
import PropTypes from 'prop-types';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { SumWrapper, SumCountTitle, SumCountNum,ProgressBar } from '../Util/Layout';
import { ErrorIcon } from '../Util/Loading';
import { H3 } from '../Util/Typography';


const MY_TARGETS_COUNT = gql`
query summaryCountMyTeamTargets($teamId: String!){
    summaryCountMyTeamTargets(teamId: $teamId)
}
`;

const MY_HOUSEHOLD_COUNT = gql`
    query summaryTotalMyTeamHouseholdSize($teamId: String!){
        summaryTotalMyTeamHouseholdSize(teamId: $teamId)
    }
`;

const SUMS = adopt({
    targetCount:({teamId, render}) => <Query query={MY_TARGETS_COUNT} variables={{teamId:teamId}} fetchPolicy={'network-only'}>{render}</Query>,
    householdCount:({teamId, render}) => <Query query={MY_HOUSEHOLD_COUNT} variables={{teamId:teamId}} fetchPolicy={'network-only'}>{render}</Query>
});

export class DashVolHome extends React.Component {
    render(){
        const {currentTeam, currentUser } = this.props;

        return(
            <SUMS teamId={currentTeam.id}>
            {({targetCount, householdCount}) => {
             
                return(
                    <React.Fragment>
                    <Row>
                        <Col md={12}>
                            <H3>My Counts</H3>
                        </Col>
                    
                     
                        <Col md={4}>
                            <SumWrapper loading={targetCount.loading}>
                                <SumCountTitle>Total Targets</SumCountTitle>
                                {targetCount.error && <ErrorIcon error={targetCount.error}/>}
                                <SumCountNum>{targetCount && targetCount.data && targetCount.data.summaryCountMyTeamTargets ? targetCount.data.summaryCountMyTeamTargets : 0}</SumCountNum>

                            </SumWrapper>
                        </Col>
                        <Col md={4}>
                            <SumWrapper loading={householdCount.loading}>
                                <SumCountTitle>Total Household Size</SumCountTitle>
                                {householdCount.error && <ErrorIcon error={householdCount.error}/>}
                                <SumCountNum>{householdCount && householdCount.data && householdCount.data.summaryTotalMyTeamHouseholdSize ? householdCount.data.summaryTotalMyTeamHouseholdSize : 0}</SumCountNum>

                            </SumWrapper>
                        </Col>
                        </Row>
                        <Row>
                    
                                            <Col md={4}>
                                                <H3> Actions Completed: 5 / 10</H3>
                                                <ProgressBar percent={"50%"}/>
                                                <small>Not currently dynamic</small>
                                            </Col>
                        
                    </Row>
                    </React.Fragment>
                )
            }}
        </SUMS>
        )
    }
}