import React from "react";
import { CurrentUser } from '../../../lib/userConstructor';
import { withAuth } from "../../../components/Auth/withAuth";
import Page from '../../../components/Page';
import { AdminDashNav } from '../../../components/Navigation/Admin/AdminDashNav';
import { AdminTeamNav } from '../../../components/Navigation/Admin/TeamNav';
import { CurrentQuery } from '../../../lib/queryConstructor';
import { ErrorMessage } from '../../../components/Util/Loading/ErrorMessage';
import { GetTeamsAdminComponent } from '../../../generated/apolloComponents';
import { Box } from '../../../components/Util/Layout/Box';
import { PageTitle } from '../../../components/Util/Typography/Titles';
import { AdminPaths, TeamPaths } from '../../../paths/index';
import { Pagination } from '../../../components/Lists/Pagination';
import { LoadingBar } from '../../../components/Util/Loading/LoadingBar';
import { AdminListTable } from '../../../components/Lists/AdminListTable';
import { FilterForm } from "../../../components/Util/Filters/FilterForm";
import { routeResponse } from '../../../lib/routeResponse';
import { TeamsWhere,TeamsSort } from '../../../filters/TeamFilters';

class AdminIndexTeam extends React.Component<any> {
    render(){
        let currentUser = CurrentUser(this.props);
        let currentQuery = CurrentQuery(this.props);
        return(
            <Page
                currentUser={currentUser}
                navComponent={<AdminDashNav currentUser={currentUser}/>}
                crudNavComponent={<AdminTeamNav currentUser={currentUser}/>}
                >
                <GetTeamsAdminComponent variables={
                        {
                            input: {
                                limit: currentQuery.perPage,
                                offset: currentQuery.offset,
                                where: currentQuery.where,
                                sort: currentQuery.sort,
                            }
                        }
                    }>
                {({data, loading, error}) => {
                    if(error) return(
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12">
                                    <ErrorMessage error={error}/>
                                </div>
                            </div>
                        </div>
                    );
                    return(
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-md-12">
                                    <Box>


                                        <div className="row align-items-end">
                                            <div className="col-md-6">
                                                <PageTitle>Teams</PageTitle>
                                            </div>
                                            <div className="col-md-6">
                                                {data && data.teams && <Pagination 
                                                    justify="flex-end"
                                                    totalCount={data.teams.totalCount}
                                                    currentPage={currentQuery.pageNumber}
                                                    perPage={currentQuery.perPage}
                                                    path={AdminPaths.teams.index}
                                                   
                                                />}
                                            </div>
                                        </div>

                                        <LoadingBar active={loading}/>
                                        <FilterForm 
                                                routeResponse={routeResponse} 
                                                primaryFilters={TeamsWhere}
                                                sortFilters={TeamsSort}
                                                path={AdminPaths.teams.index}
                                                currentQuery={currentQuery}
                                            />
                                        {
                                            data && data.teams && <AdminListTable
                                                items={data.teams.items}
                                                columns={
                                                    ['name', 'description']
                                                }
                                                itemMinWidth="30%"
                                                editPath={AdminPaths.teams.detail}
                                                dashPath={TeamPaths.index}
                                                pk='slug'
                                            />
                                        }
                                        <LoadingBar active={loading}/>
                                        {data && data.teams && <Pagination 
                                                    justify="center"
                                                    totalCount={data.teams.totalCount}
                                                    currentPage={currentQuery.pageNumber}
                                                    perPage={currentQuery.perPage}
                                                    path={AdminPaths.teams.index}


                                                />}
                                    </Box>
                                </div>
                            </div>
                        </div>
                    )
                }}
                </GetTeamsAdminComponent>
            </Page>
        )
    }
}

export default withAuth(AdminIndexTeam, 'ADMIN_TEAMS');