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
import { SingleTaskMetric } from './SingleTaskMetric';


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


const GET_MY_TASK_COMPLETIONS = gql`
    query summaryCountMyTeamTasks($teamId: String!){
        summaryCountMyTeamTasks(teamId: $teamId){
            languageVariations {
                title
                language
            }
            countComplete
            teamTargetsCount
        }
    }
`;


export class DashVolHome extends React.Component {
    render(){
        const {currentTeam, currentUser, dataFromParent } = this.props;

        return(
      
                    <React.Fragment>
                    <Row>
                        <Col md={12}>
                            <H3 uppercase>{dataFromParent('MY COUNTS')}</H3>
                        </Col>
                    
                     
                        <Col lg={6}>
                        <Query query={MY_TARGETS_COUNT} variables={{teamId:currentTeam.id}} fetchPolicy={'cache-and-network'}>
                            {({data, loading, error}) => (
                            <SumWrapper >
                                <SumCountTitle>{dataFromParent('TOTAL CONTACTS')}</SumCountTitle>
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
                                <SumCountTitle>{dataFromParent('TOTAL HOUSEHOLD SIZE')}</SumCountTitle>
                                {error && <ErrorIcon error={error}/>}
                                <SumCountNum>{data && data.summaryTotalMyTeamHouseholdSize ? data.summaryTotalMyTeamHouseholdSize : <NotInterested/>}</SumCountNum>

                            </SumWrapper>
                        )}
                            </Query>
                        </Col>
                        </Row>


                        <HR/>
                        <Row>
                            <Col md={12}>
                                <H3 uppercase>{dataFromParent('MY TASKS')}</H3>
                            </Col>
                            <Query query={GET_MY_TASK_COMPLETIONS} variables={{teamId:currentTeam.id}} fetchPolicy={'cache-and-network'}>
                                {({data, loading, error}) => (
                                    <>
                                        {error && <ErrorIcon error={error}/>}
                                        {data && data.summaryCountMyTeamTasks && data.summaryCountMyTeamTasks.length > 0 
                                            && data.summaryCountMyTeamTasks.map((task, idx) => {
                                                return(
                                                    <Col md={12} key={idx}>
                                                        <SingleTaskMetric task={task} currentUser={currentUser}/>
                                                    </Col>
                                                )
                                            })
                                        }

                                    </>
                                )}
                            </Query>
                        </Row>

                       
                    </React.Fragment>
                
         
        )
    }
}

