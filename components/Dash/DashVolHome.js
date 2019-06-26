import React from 'react';
import { Query } from 'react-apollo';
import { adopt } from 'react-adopt';
import { gql } from "apollo-boost";
import PropTypes from 'prop-types';

import { Row, Col } from '../Util/Grid';
import { SumWrapper, SumCountTitle, SumCountNum } from '../Util/Layout';
import { ErrorIcon } from '../Util/Loading';
import { SectionTitle } from '../Util/Typography';


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
                    <Row>
                        <Col>
                            <SectionTitle>My Counts</SectionTitle>
                        </Col>
                    
                     
                        <Col classNames={'col-md-4'}>
                            <SumWrapper loading={targetCount.loading}>
                                <SumCountTitle>Total Targets</SumCountTitle>
                                {targetCount.error && <ErrorIcon error={targetCount.error}/>}
                                <SumCountNum>{targetCount.data.summaryCountMyTeamTargets ? targetCount.data.summaryCountMyTeamTargets : 0}</SumCountNum>

                            </SumWrapper>
                        </Col>
                        <Col classNames={'col-md-4'}>
                            <SumWrapper loading={householdCount.loading}>
                                <SumCountTitle>Total Household Size</SumCountTitle>
                                {householdCount.error && <ErrorIcon error={householdCount.error}/>}
                                <SumCountNum>{householdCount.data.summaryTotalMyTeamHouseholdSize ? householdCount.data.summaryTotalMyTeamHouseholdSize : 0}</SumCountNum>

                            </SumWrapper>
                        </Col>

                        
                    </Row>
                )
            }}
        </SUMS>
        )
    }
}