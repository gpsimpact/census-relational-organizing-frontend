import React from "react";
import { CurrentUser } from '../../../lib/userConstructor';
import { withAuth } from "../../../components/Auth/withAuth";
import Page from '../../../components/Page';
import { AdminDashNav } from '../../../components/Navigation/AdminDashNav';


class AdminCreateTeam extends React.Component<any> {
    render(){
        let currentUser = CurrentUser(this.props);
        return(
            <Page
                currentUser={currentUser}
                navComponent={<AdminDashNav currentUser={currentUser}/>}>
                
                HI Create

                
            </Page>
        )
    }
}

export default withAuth(AdminCreateTeam, 'ADMIN_TEAMS_CRUD');