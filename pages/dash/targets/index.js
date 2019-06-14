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
import { FilterForm, FilterToggler } from "../../../components/Filters";
import { CrudNavUl, CrudNavLi, CrudNavA } from '../../../components/Util/Navigation';
import {TargetsWhere, TargetsSort } from '../../../lib/filters';
import { TargetCard } from '../../../components/Cards';

export const GET_USER_TARGETS = gql`
    query getUserTargets($id: String, $teamId: String!, $input:TargetsInput){
        userTargets(id: $id, teamId: $teamId, input: $input){
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
            }
        }
    }
`;

class DashTargetIndex extends React.Component {
    render() {
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
                                query={GET_USER_TARGETS}
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
                                            <Row classNames="align-items-center">
                                            <Col classNames={"col-md-3"}>
                                                <MainTitle> Peer Targets </MainTitle>
                                            </Col>
                                            <Col classNames={"col-md-6"}>
                    
                                                    <Pagination
                                                        totalCount={data && data.userTargets && data.userTargets.totalCount ? data.userTargets.totalCount : 0}
                                                        currentPage={currentQuery.pageNumber}
                                                        perPage={currentQuery.perPage}
                                                        path={DashPaths.targets.index}
                                                        teamSlug={currentTeam.slug}

                                                    />
                                            </Col>
                                            <Col classNames={"col-md-3"}>
                                                <CrudNavUl>
                                                    <CrudNavLi>
                                                        <Link href={{pathname:`${DashPaths.targets.create}`, query: {team: currentTeam.slug}}}>
                                                            <CrudNavA href={`${DashPaths.targets.create}?team=${currentTeam.slug}`}> 
                                                                <i className="fas fa-plus-circle"></i> New Peer
                                                            </CrudNavA>
                                                        </Link>
                                                    </CrudNavLi>
                                                    <CrudNavLi>
                                                        <FilterToggler />
                                                    </CrudNavLi>

                                                </CrudNavUl>
                                            </Col>
                                        </Row>
                                        <LoadingBar active={loading}/>
                                        {error && <ErrorMessage error={error}/>}
                                            <FilterForm 
                                                primaryFilters={TargetsWhere}
                                                sortFilters={TargetsSort}
                                                path={DashPaths.targets.index}
                                                currentQuery={currentQuery}
                                                teamSlug={currentTeam.slug}
                                            />
                                        </Box>
                                        <Row>
                                            {data && data.userTargets && data.userTargets.items && 
                                                data.userTargets.items.map((item, idx) => {
                                                    return(
                                                        <Col classNames={'col-lg-4'} key={idx}>
                                                            <TargetCard target={item} team={currentTeam}/>
                                                        </Col>
                                                    )
                                                })
                                            }
                                        </Row>
                                        <Box>
                                            <LoadingBar active={loading}/>
                                            <Pagination
                                                        totalCount={data && data.userTargets && data.userTargets.totalCount ? data.userTargets.totalCount : 0}
                                                        currentPage={currentQuery.pageNumber}
                                                        perPage={currentQuery.perPage}
                                                        path={DashPaths.targets.index}
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

export default withTeamAuth(DashTargetIndex, {team:['ADMIN', 'MEMBER'], global:['ADMIN']});