import * as React from "react";
import Page from '../components/Page';
import getCurrentUser from '../lib/currentUser';
import { CurrentUser } from '../lib/userConstructor';
import { NonAuthedHome } from '../components/Home/NonAuthedHome';
import { AuthedHome } from "../components/Home/AuthedHome";

class Index extends React.Component<any> {

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
            {currentUser ?  <AuthedHome currentUser={currentUser}/>: <NonAuthedHome/> }

            
            </Page>
        )
    }
}

export default Index;