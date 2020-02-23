import React from "react";
import { CurrentUser } from '../../../lib/constructors/UserConstructor';
import Page from "../../../components/Page";
import { AdminSideNav } from '../../../components/SideNavs';

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col';

import { AdminCreateTeamForm } from '../../../components/Admin';

import { Box } from '../../../components/Util/Layout';
import { H1 } from '../../../components/Util/Typography';
import { withGlobalAuth } from "../../../components/Auth";

import { i18n, withTranslation } from '../../../lib/i18'

class AdminTeamCreate extends React.Component {
    render(){
        let currentUser = CurrentUser(this.props);
        return(
            <Page 
                currentUser={currentUser}
                sideNavComponent={<AdminSideNav currentUser={currentUser}/>}
                pageTitle={"Global Admin " + this.props.t('DASHBOARD')}

            >
                  <Container>
                        <Row bsPrefix={'row py-5'}>
                            <Col md={6}>
                                <Box>
                                    <H1>Create {this.props.t('NEW TEAM')}</H1>
                                    <AdminCreateTeamForm/>
                                </Box>

                            </Col>
                        </Row>
                  </Container>


            </Page>
        )
    }
}

export default withTranslation('common')(withGlobalAuth(AdminTeamCreate, 'ADMIN'));