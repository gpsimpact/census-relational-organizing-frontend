import * as React from "react";
import Page from '../components/Page';
import getCurrentUser from '../lib/currentUser';
import { CurrentUser } from '../lib/userConstructor';
import { MainTitle } from '../components/Util/Typography/Titles';
import { Box } from '../components/Util/Layout/Box';
import UpdateProfileForm from '../components/Auth/UpdateProfileForm';
import { VertPadTop } from '../components/Util/Layout/Separators';

class Profile extends React.Component<any> {

    static async getInitialProps({
        ...ctx
    }) {
        const { currentUser } = await getCurrentUser(ctx.apolloClient);
        let nextPage: string;
        if(!currentUser || !currentUser.me) {
            nextPage = `/login?next=${ctx.req.url}`;
            return { nextPage };
        }

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
                        <div className="col-md-6">
                        <Box>
                            <MainTitle>Profile</MainTitle>
                            <UpdateProfileForm currentUser={currentUser}/>
                        </Box>
                        </div>
                    </div>
                </div>
            </Page>
        )
    }
}

export default Profile;