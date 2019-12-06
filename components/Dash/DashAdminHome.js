import React from 'react';
import { Query } from 'react-apollo';
import { gql } from "apollo-boost";
import PropTypes from 'prop-types';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { SumWrapper, SumCountTitle, SumCountNum, ProgressBar } from '../Util/Layout';
import { ErrorIcon, ErrorMessage } from '../Util/Loading';
import { H3 } from '../Util/Typography';
import NotInterested from '@material-ui/icons/NotInterested';
import { TotalActions, SingleActionProgress, SingleQuestionProgress } from '../../components/TIBS';
import { HR } from '../Util/Layout';

const TEAM_VOLS_COUNT = gql`
    query summaryCountAllTeamUsers($teamId: String!){
        summaryCountAllTeamUsers(teamId: $teamId)
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

const TEAM_TIBS_ACTION_COUNT = gql`
    query summaryCountAllTeamTibs($tibType: TibType, $teamId: String!){
        summaryCountAllTeamTibs(tibType:$tibType, teamId: $teamId){
            id
            appliedCount
            unappliedCount
            text
            tibType
        }
    }
`;
const TEAM_TIBS_QUESTION_COUNT = gql`
    query summaryCountAllTeamTibs($tibType: TibType, $teamId: String!){
        summaryCountAllTeamTibs(tibType:$tibType, teamId: $teamId){
            id
            appliedCount
            unappliedCount
            text
            tibType
        }
    }
`;
export class DashAdminHome extends React.Component {
    render(){
        const {currentTeam, currentUser } = this.props;
        return(
          
                        <React.Fragment>
                        <Row>
                            <Col md={12}>
                                <H3 uppercase>Team Counts</H3>
                            </Col>
                        
                            <Col lg={4}>
                            <Query query={TEAM_VOLS_COUNT} variables={{teamId:currentTeam.id}} fetchPolicy={'cache-and-network'}>
                                {({data, error, loading}) => (
                                <SumWrapper>
                                    <SumCountTitle>Total Volunteers</SumCountTitle>
                                    {error && <ErrorIcon error={error}/>}
                                    <SumCountNum>{data && data.summaryCountAllTeamUsers ? data.summaryCountAllTeamUsers : <NotInterested/>}</SumCountNum>

                                </SumWrapper>

                                )}
                                </Query>
                            </Col>

                            <Col lg={4}>
                            <Query query={TEAM_TARGETS_COUNT} variables={{teamId:currentTeam.id}} fetchPolicy={'cache-and-network'}>
                                {({data, error, loading}) => (
                                    <SumWrapper>
                                        <SumCountTitle>Total Contacts</SumCountTitle>
                                        {error && <ErrorIcon error={error}/>}
                                            <SumCountNum>{data && data.summaryCountAllTeamTargets ? data.summaryCountAllTeamTargets : <NotInterested/>}</SumCountNum>
                                    </SumWrapper>
                                )}
                            </Query>
                            </Col>


                            <Col lg={4}>
                            <Query query={TEAM_HOUSEHOLD_COUNT} variables={{teamId:currentTeam.id}} fetchPolicy={'cache-and-network'}>
                            {({data, error, loading}) => (

                                <SumWrapper>
                                    <SumCountTitle>Total Household Size</SumCountTitle>
                                    {error && <ErrorIcon error={error}/>}
                                        <SumCountNum>{data && data.summaryTotalAllTeamHouseholdSize ? data.summaryTotalAllTeamHouseholdSize : <NotInterested/>}</SumCountNum>
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


DashAdminHome.propTypes = {
    currentTeam: PropTypes.object.isRequired,
}