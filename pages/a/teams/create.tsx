import React from "react";
import { CurrentUser } from '../../../lib/userConstructor';
import { withAuth } from "../../../components/Auth/withAuth";
import Page from '../../../components/Page';
import { AdminDashNav } from '../../../components/Navigation/Admin/AdminDashNav';
import { AdminTeamNav } from '../../../components/Navigation/Admin/TeamNav';
import { routeResponse } from '../../../lib/routeResponse';
import { MainTitle } from '../../../components/Util/Typography/Titles';
import { Box } from '../../../components/Util/Layout/Box';
import { CreateTeamForm } from '../../../components/Teams/CreateTeamForm';


class AdminCreateTeam extends React.Component<any> {
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
                        <div className="col-md-8">
                            <Box>
                                <MainTitle>Create New Team</MainTitle>
                                <CreateTeamForm routeResponse={routeResponse}/>
                            </Box>
                        
                        </div>
                    </div>
                </div>
                
            </Page>
        )
    }
}

export default withAuth(AdminCreateTeam, 'ADMIN_TEAMS_CRUD');
