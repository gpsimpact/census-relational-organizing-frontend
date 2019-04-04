import React from "react";
import { CurrentUser } from '../../../lib/userConstructor';
import { withAuth } from "../../../components/Auth/withAuth";
import Page from '../../../components/Page';
import { AdminDashNav } from '../../../components/Navigation/Admin/AdminDashNav';
import { AdminTeamNav } from '../../../components/Navigation/Admin/TeamNav';
import { Box } from '../../../components/Util/Layout/Box';
import { PageTitle } from '../../../components/Util/Typography/Titles';
import { GetTeamAdminComponent } from '../../../generated/apolloComponents';
import { LoadingBar } from '../../../components/Util/Loading/LoadingBar';
import { ErrorMessage } from '../../../components/Util/Loading/ErrorMessage';
import { UpdateTeamForm } from '../../../components/Teams/UpdateTeamForm';


class AdminDetailTeam extends React.Component<any> {
    render(){
        let currentUser = CurrentUser(this.props);
        return(
            <Page
                currentUser={currentUser}
                navComponent={<AdminDashNav currentUser={currentUser}/>}
                crudNavComponent={<AdminTeamNav currentUser={currentUser}/>}
            >
               
                        
               <div className="container">
                <div className="row">
                    <div className="col-md-12">
                    
                        <GetTeamAdminComponent variables={
                            {
                                slug: this.props.query.teamSlug,
                            }
                        }>
                            {({data, loading, error}) => {
                                if(loading) return(<LoadingBar active={loading}/>)
                                if(error) return( <ErrorMessage error={error}/>)
                                return(
                                    <div className="row">
                                      <div className="col-md-8">
                                        <Box>
                                            {data && data.team && <PageTitle>{data.team.name}</PageTitle>}
                                            <LoadingBar active={loading}/>

                                            Reserved for primary data points on team
                                        </Box>
                                        <Box>
                                                <PageTitle>Users</PageTitle>
                                                <LoadingBar active={loading}/>
                                                User Info/Update/Details
                                            </Box>
                                      </div>
                                      <div className="col-md-4">
                                            <Box>
                                                <PageTitle>Edit Team:</PageTitle>
                                                {data && data.team && <UpdateTeamForm team={data.team}/>}
                                    
                                            </Box>
                                      </div>

                                      
                                    
                                    </div>
                                
                                    )
                                }}
                        
                        
                        
                        </GetTeamAdminComponent>                           
                            
                    </div>
                </div>
               </div>            
                            
                           
                    
            
        </Page>
        )
    }
}

export default withAuth(AdminDetailTeam, 'ADMIN_TEAMS_CRUD');