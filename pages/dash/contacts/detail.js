import React from "react";
import { withTeamAuth } from '../../../components/Auth';
import { DashSideNav } from '../../../components/SideNavs';
import { CurrentUser } from '../../../lib/constructors/UserConstructor';

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col';


import { Box } from '../../../components/Util/Layout';
import { H1, H2 } from '../../../components/Util/Typography';
import Page from "../../../components/Page";
import { Query } from 'react-apollo';
import { ErrorMessage } from '../../../components/Util/Loading';
import { gql } from "apollo-boost";
import { LoadingBar } from '../../../components/Util/Loading';
import { EditContactForm, EditContactTibs, ActionProgress } from '../../../components/Contacts';
import { ListContactAttempts } from '../../../components/Contacts/ContactAttempts';
import { ListNotes } from '../../../components/Contacts/Notes';

import { HR, Collapser } from '../../../components/Util/Layout';

export const GET_TARGET = gql`
    query getTarget($id: String!){
        target(id: $id){
            id
            firstName
            lastName
            email
            address
            city
            state
            zip5
            phone
            twitterHandle
            facebookProfile
            householdSize
            retainAddress
            tibs {
                id
                text
                isApplied
                tibType
            }
            active
        }
    }
`;


class DashContactDetail extends React.Component {
    render(){
        let currentUser = CurrentUser(this.props);
        let currentTeam = this.props.currentTeam ? this.props.currentTeam : null;
        

        return(
            <Page
                currentUser={currentUser}
                sideNavComponent={<DashSideNav currentUser={currentUser} currentTeam={currentTeam}/>}
            >
                <Container>
                    <Row bsPrefix={'row justify-content-center py-5'}>
                        <Col md={12}>
                            <Query query={GET_TARGET} variables={{id:this.props.query.target}} fetchPolicy={'network-only'}>
                                {({data,loading,error}) => {
                            
                                     return(
                                        <Box>
                                        {data && data.target && <H1>{data.target.firstName} {data.target.lastName} </H1> }
                                        <LoadingBar active={loading}/>
                                        {error && <ErrorMessage error={error}/>}
                                         <Row bsPrefix="row pt-4">
                                             <Col md={12}>
                                                    <Collapser title="General Information" open={true}>
                                                        <Row>
                                                            <Col md={8}>    
                                                                {data && data.target && <EditContactForm target={data.target}/>}
                                                            </Col>
                                                            <Col md={4}>
                                                                {data && data.target && <ActionProgress  target={data.target}/>}
                                                            </Col>
                                                        </Row>
                                                    </Collapser>
                                                    <HR/>

                                                    <Collapser title="Questions & Actions" open={false}>
                                                        <Row>
                                                            <Col md={12}>
                                                                    {data && data.target && <EditContactTibs target={data.target}/>}
                                                            </Col>
                                                        </Row>
                                                    </Collapser>
                                                
                                                    <HR/>
                                                <Collapser title="Contact Attempts" open={false}>
                                                    <Row>
                                                        <Col md={12}>
                                                            {data && data.target && <ListContactAttempts target={data.target}/>}

                                                       </Col>
                                                    </Row>
                                                </Collapser>

                                                <HR/>
                                                <Collapser title="Notes" open={false}>
                                                    <Row>
                                                        <Col md={12}>
                                                        {data && data.target && <ListNotes target={data.target}/>}

                                                       </Col>
                                                    </Row>
                                                </Collapser>


                                                </Col>
                                            </Row>
                                        </Box>
                                     )
                                }}
                            </Query>
                        </Col>
                    </Row>
                </Container>

            </Page>
        )
    }
}

export default withTeamAuth(DashContactDetail, {team:['ADMIN', 'MEMBER'], global:['ADMIN']});