import React from "react";
import { gql } from "apollo-boost";
import { Query } from 'react-apollo';
import Link from "next/link";

import Page from "../../../components/Page";
import { CurrentUser } from '../../../lib/constructors/UserConstructor';
import { CurrentQuery } from '../../../lib/constructors/BaseQueryConstructor';

import {Container, Row, Col} from '../../../components/Util/Grid';
import { Box, TextRight } from '../../../components/Util/Layout';
import { MainTitle, ButtonAnchor } from '../../../components/Util/Typography';
import { LoadingBar } from '../../../components/Util/Loading';
import { SideNav } from '../../../components/Admin';
import { withGlobalAuth } from "../../../components/Auth";
import { ErrorMessage } from '../../../components/Util/Loading';
import { Pagination } from '../../../components/Util/ListsAndPagination';
import { AdminPaths } from '../../../paths/index';
import { AdminTeamCard } from '../../../components/Cards';
import {TeamsWhere, TeamsSort } from '../../../lib/filters';
import { FilterForm, FilterToggler } from "../../../components/Filters";

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
class AdminTeamIndex extends React.Component {
    render(){
        let currentUser = CurrentUser(this.props);
        let currentQuery = CurrentQuery(this.props);
        return(
            <Page 
                padTop
                currentUser={currentUser}
                navComponent={<SideNav currentUser={currentUser}/>}
            >
                <Container>
                    <Row>
                        <Col>
                           
                                <Query 
                                    query={GET_TEAMS_ADMIN_QUERY}
                                    variables={{
                                        input: {
                                            limit: currentQuery.perPage,
                                            offset: currentQuery.offset,
                                            where: currentQuery.where,
                                            sort: currentQuery.sort,
                                        }
                                    }}
                                    >
                                    {({data, loading, error}) => {
                                        return(
                                            <React.Fragment>
                                            <Box>
                                            <Row classNames="align-items-center">
                                                <Col classNames={"col-md-3"}>
                                                     <MainTitle> Teams </MainTitle>
                                                </Col>
                                                <Col classNames="col-md-6">
                                                {data && data.teams && 
                                                    <Pagination
                                                        totalCount={data.teams.totalCount}
                                                        currentPage={currentQuery.pageNumber}
                                                        perPage={currentQuery.perPage}
                                                        path={AdminPaths.teams.index}
                                                    />
                                                }
                                                </Col>
                                                <Col classNames={"col-md-3"}>
                                                <TextRight>
                                                     <Link href={`${AdminPaths.teams.create}`}>
                                                            <ButtonAnchor> 
                                                                <i className="fas fa-plus-circle"></i> New Team
                                                            </ButtonAnchor>
                                                        </Link>
                                                     <FilterToggler />
                                                </TextRight>

                                                </Col>
                                            </Row>
                                                <LoadingBar active={loading}/>
                                                {error && <ErrorMessage error={error}/>}
                                               



                                            <FilterForm 
                                                primaryFilters={TeamsWhere}
                                                sortFilters={TeamsSort}
                                                path={AdminPaths.teams.index}
                                                currentQuery={currentQuery}
                                            />



                                            </Box>
                                                <Row>
                                                    {
                                                        data && data.teams && data.teams.items && 
                                                        data.teams.items.map((item,idx) => {
                                                            return(
                                                                <Col classNames={'col-lg-4'} key={idx}>
                                                                    <AdminTeamCard team={item}/>
                                                                </Col>
                                                            )
                                                        })
                                                    }
                                                </Row>
                                            <Box>
                                            <LoadingBar active={loading}/>

                                                {data && data.teams && 
                                                    <Pagination
                                                        totalCount={data.teams.totalCount}
                                                        currentPage={currentQuery.pageNumber}
                                                        perPage={currentQuery.perPage}
                                                        path={AdminPaths.teams.index}
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

export default withGlobalAuth(AdminTeamIndex, 'ADMIN');