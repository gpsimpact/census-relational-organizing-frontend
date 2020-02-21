
import React from "react";
import  {GetCurrentUser}  from '../lib/serverQueries/CurrentUser';
import { CurrentUser } from '../lib/constructors/UserConstructor';
import Page from '../components/Page';
import { gql } from "apollo-boost";
import { Query } from 'react-apollo';
import Link from "next/link";
import _ from 'lodash';

import { CurrentQuery } from '../lib/constructors/BaseQueryConstructor';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col';
import { InjectMiddleWhere } from '../lib/constructors/InjectMiddleWhere';


import { Box } from '../components/Util/Layout';
import { H1 } from '../components/Util/Typography';
import {TeamsWhere, TeamsSort } from '../lib/filters';
import { FilterForm, FilterToggler } from "../components/Filters";
import { Pagination } from '../components/Util/ListsAndPagination';
import { LoadingBar } from '../components/Util/Loading';
import { ErrorMessage } from '../components/Util/Loading';
import { TeamPermissionCard } from '../components/Cards';
import { ActionNav } from '../components/Util/Navigation'

import { i18n, withTranslation } from '../lib/i18'

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


class Teams extends React.Component {
  static async getInitialProps({...ctx}) {
    const { currentUser } = await GetCurrentUser(ctx.apolloClient);
    return { currentUser, namespacesRequired:['common'] };
  }

  render(){
    let currentUser = CurrentUser(this.props);
    let currentQuery = CurrentQuery(this.props);
    let sort = currentQuery.sort;
        if(_.isEmpty(sort)){
            sort = {"name": "ASC"}
        }
      return(
        <Page currentUser={currentUser}>
            <Container>
                <Row bsPrefix="row py-5">   
                    <Col>
                        <Query query={GET_USER_TEAMS}
                                variables={{
                                    input: {
                                        limit: currentQuery.perPage,
                                        offset: currentQuery.offset,
                                        where: InjectMiddleWhere(currentQuery.where, {'active': {'eq': true}}),
                                        sort: sort,
                                    }
                                }}
                        >
                        {({data, loading, error}) => {
                            return(
                                <React.Fragment>
                                <Box>
                                <Row bsPrefix="row align-items-center">
                                    <Col xl={3}>
                                         <H1 uppercase> {this.props.t ? this.props.t('TEAMS') : 'Teams'} </H1>
                                    </Col>
                                    <Col xl={6}>
                                    {data && data.teams && 
                                        <Pagination
                                            totalCount={data.teams.totalCount}
                                            currentPage={currentQuery.pageNumber}
                                            perPage={currentQuery.perPage}
                                            path={'/teams'}
                                            trans={this.props.t ? this.props.t : null}
                                        />
                                    }
                                    </Col>
                                    <Col xl={3}>

                                        <ActionNav className='justify-content-end'>
                                             {currentUser && 
                                                <Link href={'/'}>
                                                    <Nav.Link href={'/'}> 
                                                        {this.props.t('MY TEAMS')}
                                                    </Nav.Link>
                                                </Link>
                                            }
                                                <FilterToggler />

                                            </ActionNav>
                            
                                    </Col>
        
                                </Row>
                                    <LoadingBar active={loading}/>
                                    {error && <ErrorMessage error={error}/>}
                                   



                                <FilterForm 
                                    primaryFilters={TeamsWhere}
                                    sortFilters={TeamsSort}
                                    path={'/teams'}
                                    currentQuery={currentQuery}
                                />



                                </Box>
                                    <Row>
                                        {
                                            data && data.teams && data.teams.items && 
                                            data.teams.items.map((item,idx) => {
                                                return(
                                                    <Col xl={4} key={idx}>
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
                                            path={'/teams'}
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

export default withTranslation('common')(Teams);