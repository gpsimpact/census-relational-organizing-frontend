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
import { SingleTaskMetric } from './SingleTaskMetric';


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

const GET_TEAM_TASK_COMPLETIONS = gql`
    query summaryCountAllTeamTasks($teamId: String!){
        summaryCountAllTeamTasks(teamId: $teamId){
            languageVariations{
                title
                language
            }
            countComplete
            teamTargetsCount
        }
    }
`;

export class DashAdminHome extends React.Component {
    render(){
        const {currentTeam, currentUser, dataFromParent } = this.props;
        
        return(
          
                        <React.Fragment>
                        <Row>
                            <Col md={12}>
                                <H3 uppercase>{dataFromParent('TEAM_COUNTS')}</H3>
                            </Col>
                        
                            <Col lg={4}>
                            <Query query={TEAM_VOLS_COUNT} variables={{teamId:currentTeam.id}} fetchPolicy={'cache-and-network'}>
                                {({data, error, loading}) => (
                                <SumWrapper>
                                    <SumCountTitle>{dataFromParent('TOTAL_VOLUNTEERS')}</SumCountTitle>
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
                                        <SumCountTitle>{dataFromParent('TOTAL_CONTACTS')}</SumCountTitle>
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
                                    <SumCountTitle>{dataFromParent('TOTAL_HOUSEHOLD_SIZE')}</SumCountTitle>
                                    {error && <ErrorIcon error={error}/>}
                                        <SumCountNum>{data && data.summaryTotalAllTeamHouseholdSize ? data.summaryTotalAllTeamHouseholdSize : <NotInterested/>}</SumCountNum>
                                </SumWrapper>
                            )}
                            </Query>
                            </Col>
                            </Row>
                           
                            <HR/>

                            <Row>
                                <Col md={12}>
                                    <H3 uppercase>{dataFromParent('TEAM_TASKS')}</H3>
                                </Col>
                                <Query query={GET_TEAM_TASK_COMPLETIONS} variables={{teamId:currentTeam.id}} fetchPolicy="cache-and-network">
                                    {({data, loading, error}) => {
                                        console.log(data);
                                        return(
                                        <>
                                            {error && <ErrorIcon error={error}/>}
                                            {data && data.summaryCountAllTeamTasks && data.summaryCountAllTeamTasks.length > 0
                                                && data.summaryCountAllTeamTasks.map((task, idx) => {
                                                    return(
                                                        <Col md={12} key={idx}>
                                                            <SingleTaskMetric task={task} currentUser={currentUser} dataFromParent0={dataFromParent}/>
                                                        </Col>
                                                    )
                                                })
                                            }
                                        </>
                                    )}}
                                </Query>
                            </Row>
                            
                          
                        </React.Fragment>
                   
        )
    }
}


DashAdminHome.propTypes = {
    currentTeam: PropTypes.object.isRequired,
}