import React from "react";
import Page from "../../../components/Page";
import { withTeamAuth } from '../../../components/Auth';
import { DashSideNav } from '../../../components/Dash';
import { CurrentUser } from '../../../lib/constructors/UserConstructor';
import { CurrentQuery } from '../../../lib/constructors/BaseQueryConstructor';
import {Container, Row, Col} from '../../../components/Util/Grid';
import { gql } from "apollo-boost";
import { Query } from 'react-apollo';
import Link from "next/link";
import { Box } from '../../../components/Util/Layout';
import { MainTitle } from '../../../components/Util/Typography';
import { LoadingBar,ErrorMessage } from '../../../components/Util/Loading';
import { Pagination } from "../../../components/Util/ListsAndPagination";
import { DashPaths } from "../../../paths";
import {UsersWhere, UsersSort } from '../../../lib/filters';
import { FilterForm, FilterToggler } from "../../../components/Filters";
import { CrudNavUl, CrudNavLi } from '../../../components/Util/Navigation';
import { TeamVolCard } from '../../../components/Cards';

export const GET_USERS_TEAM_DASH_QUERY = gql`
    query getTeamUsers($input: TeamUsersInput!){
        teamUsers(input:$input){
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
                active
                globalPermissions
                teamPermissions {
                    team {
                        id
                        name
                    }
                    permissions
                }
            }
        }
    }
`;

class DashVolIndex extends React.Component {
    render(){
        let currentUser = CurrentUser(this.props);
        let currentQuery = CurrentQuery(this.props);
        let currentTeam = this.props.currentTeam ? this.props.currentTeam : null;

        return(
            <Page
            padTop
            currentUser={currentUser}
            navComponent={<DashSideNav currentUser={currentUser} currentTeam={currentTeam}/>}
            >
                <Container>
                    <Row>
                        <Col>

                        <Query
                            query={GET_USERS_TEAM_DASH_QUERY}
                            variables={{
                                input:{
                                    limit: currentQuery.perPage,
                                    offset: currentQuery.offset,
                                    where: currentQuery.where,
                                    sort: currentQuery.sort,
                                    includePermissions: ['ADMIN', 'MEMBER', 'APPLICANT'],
                                    teamId: currentTeam.id,
                                }
                            }}
                        >
                        {({data, loading, error}) => {
                            return(
                                <React.Fragment>
                                    <Box>
                                        <Row classNames="align-items-center">
                                            <Col classNames={"col-md-3"}>
                                                <MainTitle> Volunteers </MainTitle>
                                            </Col>
                                            <Col classNames={"col-md-6"}>
                                                {data && data.teamUsers &&
                                                    <Pagination
                                                        totalCount={data.teamUsers.totalCount}
                                                        currentPage={currentQuery.pageNumber}
                                                        perPage={currentQuery.perPage}
                                                        path={DashPaths.vols.index}
                                                        teamSlug={currentTeam.slug}

                                                    />
                                                }
                                            </Col>
                                            <Col classNames={"col-md-3"}>
                                                <CrudNavUl>
                                                    <CrudNavLi>
                                                        <FilterToggler />
                                                    </CrudNavLi>

                                                </CrudNavUl>
                                            </Col>
                                        </Row>
                                        <LoadingBar active={loading}/>
                                        {error && <ErrorMessage error={error}/>}
                                        

                                        <FilterForm 
                                                primaryFilters={UsersWhere}
                                                sortFilters={UsersSort}
                                                path={DashPaths.vols.index}
                                                currentQuery={currentQuery}
                                                teamSlug={currentTeam.slug}

                                            />

                                    </Box>

                                    <Row>
                                        {data && data.teamUsers && data.teamUsers.items && 
                                            data.teamUsers.items.map((item,idx) => {
                                                return(
                                                    <Col classNames={'col-lg-4'} key={idx}>
                                                        <TeamVolCard vol={item} team={currentTeam}/>
                                                    </Col>
                                                )
                                            })
                                        }
                                    </Row>
                                    <Box>
                                        <LoadingBar active={loading}/>
                                        {data && data.teamUsers &&
                                                    <Pagination
                                                        totalCount={data.teamUsers.totalCount}
                                                        currentPage={currentQuery.pageNumber}
                                                        perPage={currentQuery.perPage}
                                                        path={DashPaths.vols.index}
                                                        teamSlug={currentTeam.slug}

                                                    />
                                                }
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

export default withTeamAuth(DashVolIndex, {team:['ADMIN'], global:['ADMIN']});