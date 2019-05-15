import React from "react";
import Page from "../../components/Page";
import { CurrentUser } from '../../lib/constructors/UserConstructor';
import {Container, Row, Col} from '../../components/Util/Grid';
import { Box } from '../../components/Util/Layout';
import { MainTitle } from '../../components/Util/Typography';
import { LoadingBar } from '../../components/Util/Loading';
import { TeamCounts, SideNav } from '../../components/Admin';

import { withGlobalAuth } from '../../components/Auth';


class AdminDash extends React.Component {
    render(){
        let currentUser = CurrentUser(this.props);
        return(
            <Page 
                padTop
                currentUser={currentUser}
                navComponent={<SideNav currentUser={currentUser}/>}
            >
            <Container>
                <Row classNames={"justify-content-center"}>
                    <Col>
                        <Box>
                            <MainTitle>Admin</MainTitle>
                            <LoadingBar active={false}/>

                            <Row>
                                <Col classNames="col-md-3">
                                    <TeamCounts/>
                                </Col>

                            </Row>

                        </Box>
                    </Col>
                </Row>
            </Container>


            </Page>
        )
    }

}

export default withGlobalAuth(AdminDash, 'ADMIN');