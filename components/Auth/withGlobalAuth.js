import React from "react";
import { GetCurrentUser } from '../../lib/serverQueries/CurrentUser';
import { CurrentUser } from '../../lib/constructors/UserConstructor';

export const withGlobalAuth = (Component, baseGlobalPermission) => {
    return class AuthComponent extends React.Component {
      static async getInitialProps({
        ...ctx
      }) {
        const { currentUser } = await GetCurrentUser(ctx.apolloClient);
        let nextPage;
        const userProps = {currentUser: currentUser};

        if(!currentUser || !currentUser.me) {
          nextPage = `/login?next=${ctx.req.url}`;
          return { nextPage };
        }

        let authedUser = CurrentUser(userProps);
        if(baseGlobalPermission && !authedUser.hasGlobalPermission(baseGlobalPermission)){
          nextPage = '/'
        }
    

        return { currentUser, nextPage };
      }
  
      render() {
        return <Component {...this.props} />;
      }
    };
  };