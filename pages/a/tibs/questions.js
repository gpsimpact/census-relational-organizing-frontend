import React from "react";
import Page from "../../../components/Page";
import { Query } from 'react-apollo';
import { CurrentUser } from '../../../lib/constructors/UserConstructor';
import {Container, Row, Col} from '../../../components/Util/Grid';
import { Box } from '../../../components/Util/Layout';
import { MainTitle } from '../../../components/Util/Typography';
import { LoadingBar, ErrorMessage } from '../../../components/Util/Loading';
import { SideNav } from '../../../components/Admin';
import { withGlobalAuth } from '../../../components/Auth';
import { SingleGTIB, CreateGTIB } from '../../../components/TIBS';
import { Info } from '../../../components/Util/Typography';
import { GET_GTIBS } from '../../../components/QueryComponents/GTIBS';



class AdminTibQuestions extends React.Component {
    render(){
        let currentUser = CurrentUser(this.props);

        return(
            <Page
                padTop
                currentUser={currentUser}
                navComponent={<SideNav currentUser={currentUser}/>}
            >
                <Container>
                    <Row classNames={'justify-content-center'}>
                        <Col classNames={'col-md-8'}>
                        <Query query={GET_GTIBS} variables={{input:{active:true, tibType: 'QUESTION'}}}>
                        {({data,loading,error}) => {
                            console.log(data);
                            return(
                                <Box>
                                    <MainTitle>Global Target Intake Questions</MainTitle>
                                    <LoadingBar active={loading}/>
                                    {error && <ErrorMessage error={error}/>}


                                    <Info>These fields will be present for all targets.  Checked fields are active. Deactivate to temporarily hold or delete to remove permanently.</Info>
                                    
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