import React from "react";
import Page from "../../components/Page";
import { CurrentUser } from '../../lib/userConstructor';
import { withAuth } from '../../components/Auth/withAuth';
import { AdminDashNav } from '../../components/Navigation/Admin/AdminDashNav';

class AdminDash extends React.Component<any> {

    render(){
        let currentUser = CurrentUser(this.props);
        return(
            <Page currentUser={currentUser}
            navComponent={<AdminDashNav currentUser={currentUser}/>}>
                
            </Page>
        )
    }

}

export default withAuth(AdminDash, 'ADMIN');