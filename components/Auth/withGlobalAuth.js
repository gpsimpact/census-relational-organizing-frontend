import React from "react";
import { GetCurrentUser } from '../../lib/serverQueries/CurrentUser';
import { CurrentUser } from '../../lib/constructors/UserConstructor';
import { GetCurrentTeam } from '../../lib/serverQueries/CurrentTeam';

export const withGlobalAuth = (Component, baseGlobalPermission) => {
    return class AuthComponent extends React.Component {
      static async getInitialProps({
        ...ctx
      }) {
        const { currentUser } = await GetCurrentUser(ctx.apolloClient);
        let nextPage;
        const teamSlug = ctx.query.team || null;
        const userProps = {currentUser: currentUser};

        if(!currentUser || !currentUser.me) {
          nextPage = `/?next=${ctx.req.url}`;
          return { nextPage };
        }

        let authedUser = CurrentUser(userProps);
        if(baseGlobalPermission && !authedUser.hasGlobalPermission(baseGlobalPermission)){
          nextPage = '/'
        }

        if(teamSlug){
          let { currentTeam } = await GetCurrentTeam(ctx.apolloClient, teamSlug);
          return { currentUser, currentTeam, nextPage };
        }
    

        return { currentUser, nextPage, namespacesRequired:['common'] };
      }
  
      render() {
        return <Component {...this.props} />;
      }
    };
  };