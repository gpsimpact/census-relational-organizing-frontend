import React from "react";
import Page from "../../../components/Page";
import { withTeamAuth } from '../../../components/Auth';
import { DashSideNav } from '../../../components/SideNavs';
import { CurrentUser } from '../../../lib/constructors/UserConstructor';
import { CurrentQuery } from '../../../lib/constructors/BaseQueryConstructor';

import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


import { gql } from "apollo-boost";
import { Query } from 'react-apollo';
import Link from "next/link";
import { Box } from '../../../components/Util/Layout';
import { H2 } from '../../../components/Util/Typography';
import { LoadingBar,ErrorMessage } from '../../../components/Util/Loading';
import { Pagination } from "../../../components/Util/ListsAndPagination";
import { DashPaths } from "../../../paths";
import { FilterForm, FilterToggler } from "../../../components/Filters";
import {TargetsWhere, TargetsSort } from '../../../lib/filters';
import { ContactCard } from '../../../components/Cards';
import { ActionNav } from '../../../components/Util/Navigation'
import { i18n, withTranslation } from '../../../lib/i18'

export const GET_TEAM_TARGETS = gql`
    query getTeamTargets($teamId: String!, $input:TargetsInput){
        teamTargets( teamId: $teamId, input: $input){
            hasMore
            totalCount
            items {
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
                active
                retainAddress
                genderIdentity
                sexualOrientation
                raceEthnicity
                isNameAlias
                householdMembers {
                    relationship
                    name
                }
            }
        }
    }
`;

class DashContactIndex extends React.Component {
    render() {
        let currentUser = CurrentUser(this.props);
        let currentQuery = CurrentQuery(this.props);
        let currentTeam = this.props.currentTeam ? this.props.currentTeam : null;

        return(
            <Page
                padTop
                currentUser={currentUser}
                sideNavComponent={<DashSideNav currentUser={currentUser} currentTeam={currentTeam}/>}
                pageTitle={`${currentTeam.name} Dashboard`}

            >
                <Container>
                    <Row bsPrefix="row py-5">
                        <Col md={12}>
                            <Query
                                query={GET_TEAM_TARGETS}
                                fetchPolicy="cache-and-network"
                                variables={{
                                    teamId: currentTeam.id,
                                    input: {
                                        limit: currentQuery.perPage,
                                        offset: currentQuery.offset,
                                        where: currentQuery.where,
                                        sort: currentQuery.sort,
                                    }
                                }}
                            >
                                {({data,loading,error}) => {
                                    return(
                                        <React.Fragment>
                                        <Box>
                                            <Row bsPrefix="row align-items-center">
                                            <Col md={3}>
                                                <H2 uppercase> Household Contacts</H2>
                                            </Col>
                                            <Col md={6}>
                    
                                                    <Pagination
                                                        totalCount={data && data.teamTargets && data.teamTargets.totalCount ? data.teamTargets.totalCount : 0}
                                                        currentPage={currentQuery.pageNumber}
                                                        perPage={currentQuery.perPage}
                                                        path={DashPaths.contacts.index}
                                                        teamSlug={currentTeam.slug}

                                                    />
                                            </Col>
                                            <Col md={3}>
                                                <ActionNav className='justify-content-end'>
                                                <Link href={{pathname:`${DashPaths.contacts.create}`, query: {team: currentTeam.id}}}>
                                                    <Nav.Link href={`${DashPaths.contacts.create}?team=${currentTeam.id}`}> New Contact </Nav.Link>
                                                </Link>
                                                  
                                                  <FilterToggler />

                                              </ActionNav>
                                            </Col>
                                        </Row>
                                        <LoadingBar active={loading}/>
                                        {error && <ErrorMessage error={error}/>}
                                            <FilterForm 
                                                primaryFilters={TargetsWhere}
                                                sortFilters={TargetsSort}
                                                path={DashPaths.contacts.index}
                                                currentQuery={currentQuery}
                                                teamSlug={currentTeam.slug}
                                            />
                                        </Box>
                                        <Row>
                                            {data && data.teamTargets && data.teamTargets.items && 
                                                data.teamTargets.items.map((item, idx) => {
                                                    return(
                                                        <Col lg={4} key={idx}>
                                                            <ContactCard target={item} team={currentTeam}/>
                                                        </Col>
                                                    )
                                                })
                                            }
                                        </Row>
                                        <Box>
                                            <LoadingBar active={loading}/>
                                            <Pagination
                                                        totalCount={data && data.teamTargets && data.teamTargets.totalCount ? data.teamTargets.totalCount : 0}
                                                        currentPage={currentQuery.pageNumber}
                                                        perPage={currentQuery.perPage}
                                                        path={DashPaths.contacts.index}
                                                        teamSlug={currentTeam.slug}
                                                    />
                                        </Box>
                                        </React.Fragment>
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

export default withTranslation('common')(withTeamAuth(DashContactIndex, {team:['ADMIN'], global:['ADMIN']}));