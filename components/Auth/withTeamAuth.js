import React from "react";
import { GetCurrentUser } from '../../lib/serverQueries/CurrentUser';
import { GetCurrentTeam } from '../../lib/serverQueries/CurrentTeam';
import { CurrentUser } from '../../lib/constructors/UserConstructor';


//
// Note currently only set for OR permissions so any permission pass will allow user through.  Don't yet have a use case for and perms.
//
export const withTeamAuth = (Component, permissions) => {
    return class TeamAuthComponent extends React.Component {
        static async getInitialProps({
            ...ctx
        }) {
            const { currentUser } = await GetCurrentUser(ctx.apolloClient);
         
            let nextPage;
            let teamID = ctx.query.team || null;
            let userProps = { currentUser: currentUser };
            let authed = false; 

            if(!currentUser || !currentUser.me) {
                nextPage = `/?next=${ctx.req.url}`;
                return { nextPage };
            }

            let authedUser = CurrentUser(userProps);
            if(permissions.team && permissions.team.length > 0){
                permissions.team.forEach((perm) => {
                    if(authedUser && authedUser.hasTeamPermission(teamID, perm)){
                        authed = true;
                    };
                });
            };

            if(permissions.global && permissions.global.length > 0){
                permissions.global.forEach((perm) => {
                    if(authedUser && authedUser.hasGlobalPermission(perm)){
                        authed = true;
                    };
                });
            };

            if(authed) {
                let { currentTeam } = await GetCurrentTeam(ctx.apolloClient, teamID);
                if(!currentTeam.active) {
                    nextPage = '/'
                    return { nextPage };
                }
                return { currentUser, currentTeam };
            } else {
                nextPage='/';
                return { nextPage };
            }
        }
        render(){
            return <Component {...this.props}/>;
        }
    };
};