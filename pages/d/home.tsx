import React from "react";
import Page from "../../components/Page";
import { CurrentUser } from "../../lib/userConstructor";
import { PageTitle } from '../../components/Util/Typography/Titles';
import { Box } from '../../components/Util/Layout/Box';
import { LoadingBar } from '../../components/Util/Loading/LoadingBar';
import { VertPadTop } from '../../components/Util/Layout/Separators';
import { AdminSummaryCount } from '../../components/Sums/Admin/AdminSummaryCount';
import getCurrentUser from '../../lib/currentUser';
import { withTeamAuth } from '../../components/Auth/withTeamAuth';

class TeamDash extends React.Component<any>{
    static async getInitialProps({
        ...ctx
    }) {
        const { currentUser } = await getCurrentUser(ctx.apolloClient);
        let nextPage: string = null;

      
        return { currentUser, nextPage };


    }
    render(){
        let currentUser = CurrentUser(this.props);
        return(
            <Page currentUser={currentUser}
            
            >
                <VertPadTop/>

                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <Box>
                                <PageTitle>Team Dashboard</PageTitle>
                                <LoadingBar active={false}/>
                                    Reserved for team level stats.

                            </Box>
                        </div>
                    </div>
                </div>
            </Page>
        )
    }
}

export default withTeamAuth(TeamDash, {team:['TEAM'], global:['ADMIN']});