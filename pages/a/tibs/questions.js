import React from "react";
import Page from "../../../components/Page";
import { Query } from 'react-apollo';
import { CurrentUser } from '../../../lib/constructors/UserConstructor';

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col';


import { Box } from '../../../components/Util/Layout';
import { H1 } from '../../../components/Util/Typography';
import { LoadingBar, ErrorMessage } from '../../../components/Util/Loading';
import { AdminSideNav } from '../../../components/SideNavs';
import { withGlobalAuth } from '../../../components/Auth';
import { SingleGTIB, CreateGTIB } from '../../../components/TIBS';
import { Info } from '../../../components/Util/Typography';
import { GET_GTIBS } from '../../../components/Queries/GTIBS';





class AdminTibQuestions extends React.Component {
    render(){
        let currentUser = CurrentUser(this.props);

        return(
            <Page
                currentUser={currentUser}
                sideNavComponent={<AdminSideNav currentUser={currentUser}/>}
                pageTitle={"Global Admin Dashboard"}

            >
                <Container>
                    <Row bsPrefix={'row justify-content-center py-5'}>
                        <Col md={12}>
                        <Query query={GET_GTIBS} variables={{input:{active:true, tibType: 'QUESTION'}}}>
                        {({data,loading,error}) => {
                            return(
                                <Box>
                                    <H1>Global Household Contact Intake Questions</H1>
                                    <LoadingBar active={loading}/>
                                    {error && <ErrorMessage error={error}/>}


                                    <Info>These fields will be present for all household contacts.  Checked fields are active. Deactivate to temporarily hold or delete to remove permanently.</Info>
                                    
                                    {data && data.gtibs &&
                                        data.gtibs.map((item, idx) => {
                                            return(
                                                
                                                <SingleGTIB gtib={item} key={idx} tibType={'QUESTION'}/>
                                                
                                            )
                                        })
                                    }
                                    

                                    <CreateGTIB tibType={'QUESTION'}/>
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
export default withGlobalAuth(AdminTibQuestions, 'ADMIN');