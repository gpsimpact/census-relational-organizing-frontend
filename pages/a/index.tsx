import React from "react";
import Page from "../../components/Page";
import { CurrentUser } from '../../lib/userConstructor';
import { withAuth } from '../../components/Auth/withAuth';
import { AdminDashNav } from '../../components/Navigation/Admin/AdminDashNav';
import { PageTitle } from '../../components/Util/Typography/Titles';
import { Box } from '../../components/Util/Layout/Box';
import { LoadingBar } from '../../components/Util/Loading/LoadingBar';
import { VertPadTop } from '../../components/Util/Layout/Separators';
import { AdminSummaryCount } from '../../components/Sums/Admin/AdminSummaryCount';

class AdminDash extends React.Component<any> {

    render(){
        let currentUser = CurrentUser(this.props);
        return(
            <Page currentUser={currentUser}
            navComponent={<AdminDashNav currentUser={currentUser}/>}>
            <VertPadTop/>
                <div className="container">
                            <div className="row">
                                <div className="col-md-12">
                                <Box>
                                    <PageTitle>Admin</PageTitle>
                                    <LoadingBar active={false}/>
                                    <div className="row">
                                        <div className="col-md-3">
                                            <AdminSummaryCount/>
                                        </div>
                                    </div>
                                </Box>
                                </div>
                            </div>
                        </div>
            </Page>
        )
    }

}

export default withAuth(AdminDash, 'ADMIN');