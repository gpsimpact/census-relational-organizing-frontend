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
                                <SumCountTitle>Total Targets</SumCountTitle>
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

                        <Row>
                        <Col xl={12}>
                                <Query query={MY_TIBS_ACTION_COUNT} variables={{tibType: 'ACTION', teamId: currentTeam.id}} fetchPolicy={'cache-and-network'}>
                                    {({data, error, loading}) => {
                                        return(
                                            <React.Fragment>
                                                {error && <ErrorMessage error={error}/>}
                                                {data && data.summaryCountMyTeamTibs && <TotalActions actions={data.summaryCountMyTeamTibs} title={'My Action Count'}/>}
                                            </React.Fragment>
                                        )
                                    }}
                                </Query>
                            </Col>
                        
                    </Row>
                    <HR/>
                            <Row>
                                    <Col md={6}>
                                        <H3 uppercase>My Questions</H3>
                                        <Query query={MY_TIBS_QUESTION_COUNT} variables={{tibType: 'QUESTION', teamId: currentTeam.id}}>
                                          {({data, loading, error}) => {
                                              return(
                                                <React.Fragment>
                                                    {error && <ErrorMessage error={error}/>}
                                                    {data && data.summaryCountMyTeamTibs &&
                                                      data.summaryCountMyTeamTibs.map((item, idx) => {
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
                                      <H3 uppercase>My Actions</H3>
                                      <Query query={MY_TIBS_ACTION_COUNT} variables={{tibType: 'ACTION', teamId: currentTeam.id}}>
                                          {({data, loading, error}) => {
                                              return(
                                                <React.Fragment>
                                                    {error && <ErrorMessage error={error}/>}
                                                    {data && data.summaryCountMyTeamTibs &&
                                                      data.summaryCountMyTeamTibs.map((item, idx) => {
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