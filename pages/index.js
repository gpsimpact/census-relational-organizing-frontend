
import React from "react";
import  {GetCurrentUser}  from '../lib/serverQueries/CurrentUser';
import { CurrentUser } from '../lib/constructors/UserConstructor';
import Page from '../components/Page';
import { AnonHome } from '../components/Pub/AnonHome';
import { gql } from "apollo-boost";
import { Query } from 'react-apollo';
import Link from "next/link";
import redirect from '../lib/redirect';

import { CurrentQuery } from '../lib/constructors/BaseQueryConstructor';
import { InjectMiddleWhere } from '../lib/constructors/InjectMiddleWhere';

import { Container, Row, Col } from '../components/Util/Grid';
import { Box } from '../components/Util/Layout';
import { MainTitle } from '../components/Util/Typography';
import {TeamsWhere, TeamsSort } from '../lib/filters';
import { FilterForm, FilterToggler } from "../components/Filters";
import { Pagination } from '../components/Util/ListsAndPagination';
import { LoadingBar } from '../components/Util/Loading';
import { ErrorMessage } from '../components/Util/Loading';
import { TeamPermissionCard } from '../components/Cards';
import { CrudNavUl, CrudNavLi, CrudNavA } from '../components/Util/Navigation';

export const GET_USER_TEAMS = gql`
    query getUserTeams($input: TeamsInput!){
        teams(input:$input){
            hasMore
            totalCount
            items{
                id
                name
                description
                slug
            }
        }
    }
`;


class Index extends React.Component {
  static async getInitialProps({...ctx}) {
    const { currentUser } = await GetCurrentUser(ctx.apolloClient);
    let nextPage;

    if(currentUser && currentUser.me && currentUser.me.teamPermissions === null){
       nextPage='/teams';
    };
    return { currentUser, nextPage };
  }

  render(){
    let currentUser = CurrentUser(this.props);
    if(!currentUser){
      return(
        <Page currentUser={null}>
            <AnonHome/>
        </Page>
      )
    }
    let currentQuery = CurrentQuery(this.props);
      return(
        <Page currentUser={currentUser} padTop>
                    <Container>
                <Row>   
                    <Col>
                        <Query query={GET_USER_TEAMS}
                                variables={{
                                    input: {
                                        limit: currentQuery.perPage,
                                        offset: currentQuery.offset,
                                        where: InjectMiddleWhere(currentQuery.where, {'id': {'in': currentUser.getTeamIDs()}}),
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
                                         <MainTitle> Your Teams </MainTitle>
                                    </Col>
                                    <Col classNames="col-md-6">
                                    {data && data.teams && 
                                        <Pagination
                                            totalCount={data.teams.totalCount}
                                            currentPage={currentQuery.pageNumber}
                                            perPage={currentQuery.perPage}
                                            path={'/'}
                                        />
                                    }
                                    </Col>
                                    <Col classNames={"col-md-3"}>


                                        <CrudNavUl>
                                                <CrudNavLi>
                                                    <Link href={'/teams'}><CrudNavA href={'/teams'}>All Teams</CrudNavA></Link>
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
                                    primaryFilters={TeamsWhere}
                                    sortFilters={TeamsSort}
                                    path={'/'}
                                    currentQuery={currentQuery}
                                />



                                </Box>
                                    <Row>
                                        {
                                            data && data.teams && data.teams.items && 
                                            data.teams.items.map((item,idx) => {
                                                return(
                                                    <Col classNames={'col-lg-4'} key={idx}>
                                                        <TeamPermissionCard team={item} currentUser={currentUser}/>
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
                                            path={'/'}
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

export default Index;