import React from "react";
import { gql } from "apollo-boost";


import Page from "../../../components/Page";
import { CurrentUser } from '../../../lib/constructors/UserConstructor';
import { CurrentQuery } from '../../../lib/constructors/BaseQueryConstructor';

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col';


import { Box } from '../../../components/Util/Layout';
import { H1, Info } from '../../../components/Util/Typography';
import { LoadingBar } from '../../../components/Util/Loading';
import { AdminSideNav } from '../../../components/SideNavs';
import { withGlobalAuth } from "../../../components/Auth";
import { i18n, withTranslation } from '../../../lib/i18'

export const GET_TEAMS_ADMIN_QUERY = gql`
    query getTeamsAdmin($input: TeamsInput){
        teams(input:$input){
            hasMore
            totalCount
            items {
                id
                name
                description
                active
                slug
                userPermissionSummaryCounts {
                    permission
                    count
                }
                createdAt
                updatedAt
            }
        }
    }
`;
class AdminTasksIndex extends React.Component {
    render(){
        let currentUser = CurrentUser(this.props);
        let currentQuery = CurrentQuery(this.props);
        return(
            <Page 
                currentUser={currentUser}
                sideNavComponent={<AdminSideNav currentUser={currentUser}/>}
                pageTitle={"Global Admin " + this.props.t('DASHBOARD')}

            >
                <Container>
                    <Row bsPrefix="row py-5">
                        <Col>
                        <Box>
                            <H1>
                                {this.props.t('TASKS')}
                            </H1>
                            <LoadingBar />
                            <Info> Tasks coming soon.  Example below.</Info>
                            <img src="https://civic-promotor.s3-us-west-2.amazonaws.com/images/TaskExample_yellow.png"/>
                        </Box>
                        </Col>
                    </Row>
                </Container>
            </Page>
        )
    }

}

export default withTranslation('common')(withGlobalAuth(AdminTasksIndex, 'ADMIN'));