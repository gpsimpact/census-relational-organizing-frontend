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
                                        <SumCountTitle>Total Targets</SumCountTitle>
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
                            <Row>
                                
                            <Col xl={12}>
                                <Query query={TEAM_TIBS_ACTION_COUNT} variables={{tibType: 'ACTION', teamId: currentTeam.id}} fetchPolicy={'cache-and-network'}>
                                    {({data, error, loading}) => {
                                        return(
                                            <React.Fragment>
                                                {error && <ErrorMessage error={error}/>}
                                                {data && data.summaryCountAllTeamTibs && <TotalActions actions={data.summaryCountAllTeamTibs} title={'Team Action Count'}/>}
                                            </React.Fragment>
                                        )
                                    }}
                                </Query>
                            </Col>
                            </Row>
                            <HR/>
                            <Row>
                                    <Col md={6}>
                                        <H3 uppercase>Team Questions</H3>
                                        <Query query={TEAM_TIBS_QUESTION_COUNT} variables={{tibType: 'QUESTION', teamId: currentTeam.id}} fetchPolicy="cache-and-network">
                                          {({data, loading, error}) => {
                                              return(
                                                <React.Fragment>
                                                    {error && <ErrorMessage error={error}/>}
                                                    {data && data.summaryCountAllTeamTibs &&
                                                      data.summaryCountAllTeamTibs.map((item, idx) => {
                                                          return(
                                                              <SingleQuestionProgress tib={item} key={idx}/>
                                                          )
                                                      })
                                                    }
                                                </React.Fragment>
                                              )
                                          }}
                                      </Query>   
                                    </Col>

                                    <Col md={6}>
                                      <H3 uppercase>Team Actions</H3>
                                      <Query query={TEAM_TIBS_ACTION_COUNT} variables={{tibType: 'ACTION', teamId: currentTeam.id}} fetchPolicy="cache-and-network">
                                          {({data, loading, error}) => {
                                              return(
                                                <React.Fragment>
                                                    {error && <ErrorMessage error={error}/>}
                                                    {data && data.summaryCountAllTeamTibs &&
                                                      data.summaryCountAllTeamTibs.map((item, idx) => {
                                                          return(
                                                              <SingleActionProgress tib={item} key={idx}/>
                                                          )
                                                      })
                                                    }
                                                </React.Fragment>
                                              )
                                          }}
                                      </Query>                         
                                    </Col>
                                </Row>
                          
                        </React.Fragment>
                   
        )
    }
}


DashAdminHome.propTypes = {
    currentTeam: PropTypes.object.isRequired,
}