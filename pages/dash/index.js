import React from "react";
import Page from "../../components/Page";
import { CurrentUser } from '../../lib/constructors/UserConstructor';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col';

import { Box, HR } from '../../components/Util/Layout';
import { H1 } from '../../components/Util/Typography';
import { LoadingBar } from '../../components/Util/Loading';
import { DashSideNav } from '../../components/SideNavs';
import { withTeamAuth, AcceptTeamTOS } from '../../components/Auth';
import { ActionNav } from '../../components/Util/Navigation'
import Nav from 'react-bootstrap/Nav';
import { DashPaths } from "../../paths";
import Link from "next/link";

import { DashAdminHome, DashVolHome } from "../../components/Dash";
import { i18n, withTranslation } from '../../lib/i18';


class TeamDashboard extends React.Component {
    static async getInitialProps({...ctx}) {
        const { currentUser } = await GetCurrentUser(ctx.apolloClient);
        let nextPage;
        const teamPerms = currentUser && currentUser.me && currentUser.me.teamPermissions ? currentUser.me.teamPermissions : null;
        if(currentUser && currentUser.me){
           if(!teamPerms || teamPerms.length < 1){
               nextPage='/teams';
           }
        };
        return { currentUser, nextPage, namespacesRequired: ['common'],};
      }

    render(){
        let currentUser = CurrentUser(this.props);
        let currentTeam = this.props.currentTeam ? this.props.currentTeam : null;
        return(
            <Page
                currentUser={currentUser}
                sideNavComponent={<DashSideNav currentUser={currentUser} currentTeam={currentTeam}/>}
                pageTitle={`${currentTeam.name} Dashboard`}

            >
                {
                    !currentUser.hasAcceptedTOS(currentTeam.id)
                    && <AcceptTeamTOS team={currentTeam} currentUser={currentUser}/>
                }
            <Container>
                <Row bsPrefix="row py-5">
                    <Col md={12}>
                        <Box>
                            <Row>
                                <Col md={9}>
                                    <H1 uppercase>{currentTeam.name}</H1>
                                </Col>
                                <Col md={3}>
                                    <ActionNav className='justify-content-end'>
                                                <Link href={{pathname:`${DashPaths.contacts.create}`, query: {team: currentTeam.id}}}>
                                                    <Nav.Link href={`${DashPaths.contacts.create}?team=${currentTeam.id}`}> New Contact </Nav.Link>
                                                </Link>
                                                  

                                    </ActionNav>
                                </Col>

                            </Row>
                            <LoadingBar/>
                            {
                                (currentUser.hasGlobalPermission('ADMIN') || currentUser.hasTeamPermission(currentTeam.slug, 'ADMIN')) &&
                                <React.Fragment>
                                    <DashAdminHome currentTeam={currentTeam} currentUser={currentUser} dataFromParent={ this.props.t }/>
                                    <HR/>
                                </React.Fragment>

                            }

                            <DashVolHome currentTeam={currentTeam} currentUser={currentUser} dataFromParent={ this.props.t } />
                            

                        </Box>
                    </Col>
                </Row>

            </Container>
            

            </Page>
        )
    }
}

export default withTranslation('common')(withTeamAuth(TeamDashboard, {team:['ADMIN', 'MEMBER'], global:['ADMIN']}));