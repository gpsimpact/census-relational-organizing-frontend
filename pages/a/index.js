import React from "react";

import { Query } from 'react-apollo';
import { gql } from "apollo-boost";


import Page from "../../components/Page";

import { CurrentUser } from '../../lib/constructors/UserConstructor';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


import { Box, HR } from '../../components/Util/Layout';
import { H1, H3 } from '../../components/Util/Typography';
import { LoadingBar, ErrorMessage } from '../../components/Util/Loading';
import { AdminSideNav } from '../../components/SideNavs';

import { withGlobalAuth } from '../../components/Auth/withGlobalAuth';
import { SumWrapper, SumCountTitle, SumCountNum } from '../../components/Util/Layout';
import { ErrorIcon } from '../../components/Util/Loading';
import NotInterested from '@material-ui/icons/NotInterested';
import { TotalActions, SingleActionProgress, SingleQuestionProgress } from '../../components/TIBS';

import { i18n, withTranslation } from '../../lib/i18'


export const ADMIN_TEAM_COUNTS= gql`
    query adminGetTeamCounts{
        summaryCountTeams
    }
`;
const ADMIN_VOLS_COUNT = gql`
    query summaryCountAllUsers{
        summaryCountAllUsers
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

const ADMIN_TIBS_ACTION_COUNT = gql`
    query summaryCountAllTibs($tibType: TibType){
        summaryCountAllTibs(tibType: $tibType){
            id
            appliedCount
            unappliedCount
            text
            tibType
        }
    }
`;

const ADMIN_TIBS_QUESTION_COUNT = gql`
    query summaryCountAllTibs($tibType: TibType){
        summaryCountAllTibs(tibType: $tibType){
            id
            appliedCount
            unappliedCount
            text
            tibType
        }
    }
`;


class AdminDash extends React.Component {
    render(){
        let currentUser = CurrentUser(this.props);
        return(
            <Page 
                currentUser={currentUser}
                sideNavComponent={<AdminSideNav currentUser={currentUser}/>}
                pageTitle={"Global Admin Dashboard"}
            >
                <Container>
                <Row bsPrefix={"row justify-content-center py-5"}>
                    <Col>
                        <Box>
                            <H1>Admin</H1>
                            <LoadingBar active={false}/>

                    
                                        <Row>
                                          <Col md={12}>
                                              <H3 uppercase>Site Totals</H3>
                                          </Col>
                                                        <Col xl={3}>
                                                        <Query query={ADMIN_TEAM_COUNTS} fetchPolicy={'cache-and-network'}>
                                                            {({data, error, loading}) => (
                                                                <SumWrapper>
                                                                    <SumCountTitle>Total Teams</SumCountTitle>
                                                                        {error && <ErrorIcon error={error}/>}
                                                                    
                                                                        <SumCountNum>{data && data.summaryCountTeams ? data.summaryCountTeams : <NotInterested/>}</SumCountNum>
                                                                    
                                                                </SumWrapper>

                                                            )}
                                                        </Query>
                                                        </Col>

                                                        <Col xl={3}>
                                                        <Query query={ADMIN_VOLS_COUNT} fetchPolicy={'cache-and-network'}>
                                                                {({data, error,loading}) => (
                                                                <SumWrapper>
                                                                    <SumCountTitle>Total Users</SumCountTitle>
                                                                    {error && <ErrorIcon error={error}/>}
                                                                        <SumCountNum>{data && data.summaryCountAllUsers ? data.summaryCountAllUsers : <NotInterested/>}</SumCountNum>
                                                                    
                                                                </SumWrapper>

                                                                )}

                                                        </Query>
                                                        </Col>

                                                        <Col xl={3}>
                                                        <Query query={ADMIN_TARGETS_COUNT} fetchPolicy={'cache-and-network'}>
                                                        {({data, error,loading}) => (

                                                            <SumWrapper>
                                                                <SumCountTitle>Total Contacts</SumCountTitle>
                                                                {error && <ErrorIcon error={error}/>}
                                                                <SumCountNum>{data && data.summaryCountAllTargets ? data.summaryCountAllTargets : <NotInterested/>}</SumCountNum>
                                                                
                                                            </SumWrapper>
                                                        )}
                                                        </Query>
                                                        </Col>
                                                        <Col xl={3}>
                                                        <Query query={ADMIN_HOUSEHOLD_COUNT} fetchPolicy={'cache-and-network'}>
                                                        {({data, error,loading}) => (

                                                            <SumWrapper>
                                                                <SumCountTitle>Household Size</SumCountTitle>
                                                                {error && <ErrorIcon error={error}/>}
                                                                <SumCountNum>{data && data.summaryTotalAllHouseholdSize ? data.summaryTotalAllHouseholdSize : <NotInterested/>}</SumCountNum>

                                                            </SumWrapper>
                                                        )}
                                                            </Query>
                                                        </Col>
                                                        </Row>
                                                        <HR/>
                    


                          
                    

                        </Box>
                    </Col>
                </Row>

                </Container>
            </Page>
        )
    }

}

export default withTranslation('common')(withGlobalAuth(AdminDash, 'ADMIN'));