import * as React from "react";
import Page from '../../components/Page';
import getCurrentUser from '../../lib/currentUser';
import { CurrentUser } from '../../lib/userConstructor';
import { CurrentQuery } from '../../lib/queryConstructor';
import { ErrorMessage } from '../../components/Util/Loading/ErrorMessage';
import { GetTeamsPublicComponent } from '../../generated/apolloComponents';
import { Box } from '../../components/Util/Layout/Box';
import { PageTitle } from '../../components/Util/Typography/Titles';
import { AdminPaths, TeamPaths } from '../../paths/index';
import { LoadingBar } from '../../components/Util/Loading/LoadingBar';
import { VertPadTop } from '../../components/Util/Layout/Separators';
import { QuickSortTeamList } from '../../components/Home/QuickSortTeamList'

class PublicTeam extends React.Component<any> {

    static async getInitialProps({
        ...ctx
    }) {
        const { currentUser } = await getCurrentUser(ctx.apolloClient);
        let nextPage: string;

      
        return { currentUser, nextPage };
    }

    

    render() {
        let currentUser = CurrentUser(this.props);
        let currentQuery = CurrentQuery(this.props);


        return(
            <Page
                currentUser={currentUser}
            >
            {/* NEED LIMIT QUERY HERE? */}
            <GetTeamsPublicComponent variables={
                        {
                            input: {
                                limit: 200,
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
                                <VertPadTop/>

                                <ErrorMessage error={error}/>
                            </div>
                        </div>
                    </div>
                );

                return(
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-8">
                            <VertPadTop/>
                                {data && data.teams && data.teams.items && <QuickSortTeamList teams={data.teams.items} currentUser={currentUser}/>}
                               
                            </div>
                        </div>
                    </div>
                )
            }}
            
            </GetTeamsPublicComponent>

            
            </Page>
        )
    }
}

export default PublicTeam;