import * as React from "react";
import Page from '../components/Page';
import getCurrentUser from '../lib/currentUser';
import { CurrentUser } from '../lib/userConstructor';
import { MainTitle } from '../components/Util/Typography/Titles';
import { Box } from '../components/Util/Layout/Box';
import { VertPadTop } from '../components/Util/Layout/Separators';

class CheckEmail extends React.Component<any> {
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
                        <div className="col-md-6">
                            <Box>
                                <MainTitle>Welcome</MainTitle>
                                <p>Check your email to complete your login.</p>
                                {this.props && this.props.query && this.props.query.code &&
                                    <>
                                    <h2>Verification Code:  <span>{this.props.query.code}</span> </h2> 
                                        
                                    </>
                                }
                            </Box>
                          
                        </div>
                    </div>
                </div>
            </Page>
        )
    }
}
export default CheckEmail