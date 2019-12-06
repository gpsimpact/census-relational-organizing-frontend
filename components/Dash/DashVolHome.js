import React from 'react';
import { Query } from 'react-apollo';
import { gql } from "apollo-boost";
import PropTypes from 'prop-types';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { SumWrapper, SumCountTitle, SumCountNum,ProgressBar } from '../Util/Layout';
import { ErrorIcon, ErrorMessage } from '../Util/Loading';
import { H3 } from '../Util/Typography';

import NotInterested from '@material-ui/icons/NotInterested';
import { TotalActions, SingleActionProgress, SingleQuestionProgress } from '../../components/TIBS';
import { HR } from '../Util/Layout';

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

const MY_TIBS_ACTION_COUNT = gql`
    query summaryCountMyTeamTibs($tibType: TibType, $teamId: String!){
        summaryCountMyTeamTibs(tibType:$tibType, teamId: $teamId){
            id
            appliedCount
            unappliedCount
            text
            tibType
        }
    }
`;
const MY_TIBS_QUESTION_COUNT = gql`
    query summaryCountMyTeamTibs($tibType: TibType, $teamId: String!){
        summaryCountMyTeamTibs(tibType:$tibType, teamId: $teamId){
            id
            appliedCount
            unappliedCount
            text
            tibType
        }
    }
`;


export class DashVolHome extends React.Component {
    render(){
        const {currentTeam, currentUser } = this.props;

        return(
      
                    <React.Fragment>
                    <Row>
                        <Col md={12}>
                            <H3 uppercase>My Counts</H3>
                        </Col>
                    
                     
                        <Col lg={6}>
                        <Query query={MY_TARGETS_COUNT} variables={{teamId:currentTeam.id}} fetchPolicy={'cache-and-network'}>
                            {({data, loading, error}) => (
                            <SumWrapper >
                                <SumCountTitle>Total Contacts</SumCountTitle>
                                {error && <ErrorIcon error={error}/>}
                                <SumCountNum>{data && data.summaryCountMyTeamTargets ? data.summaryCountMyTeamTargets : <NotInterested/>}</SumCountNum>

                            </SumWrapper>

                            )}
                            </Query>
                        </Col>
                        <Col lg={6}>
                        <Query query={MY_HOUSEHOLD_COUNT} variables={{teamId:currentTeam.id}} fetchPolicy={'cache-and-network'}>
                        {({data, loading, error}) => (

                            <SumWrapper>
                                <SumCountTitle>Total Household Size</SumCountTitle>
                                {error && <ErrorIcon error={error}/>}
                                <SumCountNum>{data && data.summaryTotalMyTeamHouseholdSize ? data.summaryTotalMyTeamHouseholdSize : <NotInterested/>}</SumCountNum>

                            </SumWrapper>
                        )}
                            </Query>
                        </Col>
                        </Row>
                        <HR/>

                    </React.Fragment>
                
         
        )
    }
}