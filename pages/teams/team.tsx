import * as React from "react";
import Page from '../../components/Page';
import getCurrentUser from '../../lib/currentUser';
import { CurrentUser } from '../../lib/userConstructor';
import { Box } from '../../components/Util/Layout/Box';
import { PageTitle } from '../../components/Util/Typography/Titles';
import { LoadingBar } from '../../components/Util/Loading/LoadingBar';
import { VertPadTop } from '../../components/Util/Layout/Separators';

class PublicTeamDetail extends React.Component<any> {

    static async getInitialProps({
        ...ctx
    }) {
        const { currentUser } = await getCurrentUser(ctx.apolloClient);
        let nextPage: string;

      
        return { currentUser, nextPage };


    }

    render() {
        let currentUser = CurrentUser(this.props);


        return(
            <Page
                currentUser={currentUser}
            >

                <VertPadTop/>

                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <Box>
                                <PageTitle> Register for </PageTitle>
                            </Box>
                        </div>
                    </div>
                </div>

            
            </Page>
        )
    }
}

export default PublicTeamDetail;