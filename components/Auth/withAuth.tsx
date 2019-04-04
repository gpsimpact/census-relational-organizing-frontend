import * as React from "react";
import getCurrentUser from '../../lib/currentUser';
import { CurrentUser } from '../../lib/userConstructor';

export const withAuth = <T extends object>(C: React.ComponentClass<T>, baseGlobalPermission?: string) => {
    return class AuthComponent extends React.Component<T> {
      static async getInitialProps({
        ...ctx
      }) {
        const { currentUser } = await getCurrentUser(ctx.apolloClient);
        let nextPage: string;
        const userProps:any = {currentUser: currentUser};

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
        return <C {...this.props} />;
      }
    };
  };