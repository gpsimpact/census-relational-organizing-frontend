import React from 'react';
import  { GetCurrentUser }  from '../lib/serverQueries/CurrentUser';
import { CurrentUser } from '../lib/constructors/UserConstructor';
import { Query } from 'react-apollo';
import { gql } from "apollo-boost";
import Link from 'next/link';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col';
import _ from 'lodash';
import Page from '../components/Page';
import { Hero } from '../components/Util/Layout';
import { H1 } from '../components/Util/Typography';
import { LoginForm } from '../components/Auth';
import { ActionNav } from '../components/Util/Navigation'
import { CurrentQuery } from '../lib/constructors/BaseQueryConstructor';
import { InjectMiddleWhere } from '../lib/constructors/InjectMiddleWhere';
import { Pagination } from '../components/Util/ListsAndPagination';
import { PublicPaths } from '../paths';
import { Box } from '../components/Util/Layout';
import { LoadingBar, ErrorMessage } from '../components/Util/Loading';
import { FilterForm, FilterToggler } from "../components/Filters";
import {TeamsWhere, TeamsSort } from '../lib/filters';
import { TeamPermissionCard } from '../components/Cards';

import { i18n, withTranslation } from '../lib/i18';



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
        let currentQuery = CurrentQuery(this.props);
        let sort = currentQuery.sort;
        if(_.isEmpty(sort)){
            sort = {"name": "ASC"}
        }
        return(
            <Page
                currentUser={currentUser}
            >
               <React.Fragment>
               {!currentUser &&
                <Hero>
                    <Container>
                        <Row>
                            <Col lg={8}>
                                <H1 uppercase>
                                    {this.props.t('WELCOME_TO_CIVIC_PROMOTOR')}
                                </H1>
                                
                            </Col>
                            <Col lg={4}>
                                    <LoginForm />
                            </Col>

                        </Row>
                    </Container>

                </Hero>
               }
               {currentUser && 
                    <Query query={GET_USER_TEAMS}
                             variables={{
                                 input: {
                                     limit: currentQuery.perPage,
                                     offset: currentQuery.offset,
                                     where: InjectMiddleWhere(currentQuery.where, {'id': {'in': currentUser.getTeamIDs()}, "active": {"eq": true}}),
                                     sort: sort,
                                 }
                             }}
                     >
                     {({data, loading, error}) => {
                         return(
                             <Container bsPrefix={'container py-5'}>
                                <Box>
                                    <Row>
                                        <Col xl={3}>
                                            <H1 uppercase>Your Teams</H1>
                                        </Col>
                                        <Col xl={6}>
                                        {data && data.teams && 
                                        <Pagination
                                            totalCount={data.teams.totalCount}
                                            currentPage={currentQuery.pageNumber}
                                            perPage={currentQuery.perPage}
                                            path={'/'}
                                        />
                                    }
                                        </Col>

                                        <Col xl={3}>
                                            <ActionNav className='justify-content-end'>
                                                <Link href={PublicPaths.teams}>
                                                    <Nav.Link href={PublicPaths.teams}> 
                                                        {this.props.t('ALL_TEAMS')} 
                                                    </Nav.Link>
                                                </Link>
                                                <FilterToggler />

                                            </ActionNav>
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
                                                    <Col md={4} key={idx}>
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

                             </Container>
                         )
                     }}

                     </Query>
                
            
               }

               </React.Fragment>
            </Page>
        )
    }
}

export default withTranslation('common')(Index)
