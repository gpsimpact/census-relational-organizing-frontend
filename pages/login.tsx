import React from 'react';
import { CurrentUser } from '../lib/userConstructor';
import getCurrentUser from '../lib/currentUser';
import Page from '../components/Page';
import { routeResponse } from '../lib/routeResponse';
import { Box } from '../components/Util/Layout/Box';
import { MainTitle } from '../components/Util/Typography/Titles';
import LoginForm from '../components/Auth/LoginForm';

class Login extends React.Component<any> {
    static async getInitialProps({
        ...ctx
    }) {
        const { currentUser } = await getCurrentUser(ctx.apolloClient);
        let nextPage: string;


        return { currentUser, nextPage };


    }
    render(){
        let currentUser = CurrentUser(this.props);

        return(
            <Page currentUser={currentUser}>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-md-6">
                             <Box>
                                <MainTitle>Login</MainTitle>
                                <LoginForm routeResponse={routeResponse}/>
                            </Box>           
                            
                            </div>
                        </div>
                    </div>
                     
            </Page>
        )
    }
}

export default Login