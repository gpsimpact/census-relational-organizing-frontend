import React from "react";
import { CurrentUser } from '../../../lib/userConstructor';
import { withAuth } from "../../../components/Auth/withAuth";
import Page from '../../../components/Page';
import { AdminDashNav } from '../../../components/Navigation/AdminDashNav';


class AdminDetailTeam extends React.Component<any> {
    render(){
        let currentUser = CurrentUser(this.props);
        return(
            <Page
                currentUser={currentUser}
                navComponent={<AdminDashNav currentUser={currentUser}/>}>
                
                HI Detail

                
            </Page>
        )
    }
}

export default withAuth(AdminDetailTeam, 'ADMIN_TEAMS');