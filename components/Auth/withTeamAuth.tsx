import React from "react";
import getCurrentUser from '../../lib/currentUser';
import { CurrentUser } from '../../lib/userConstructor';

interface TeamAuthPermissionsInterface {
    global?: string[];
    team: string[];
}
//
// Note currently only set for OR permissions so any permission pass will allow user through.  Don't yet have a use case for and perms.
//
export const withTeamAuth = <T extends object>(C:React.ComponentClass<T>, permissions:TeamAuthPermissionsInterface) => {
    return class TeamAuthComponent extends React.Component<T> {
        static async getInitialProps({
            ...ctx
        }) {
            const { currentUser } = await getCurrentUser(ctx.apolloClient);
            let nextPage: string;
            let teamSlug: string = ctx.query.teamSlug || null;
            let userProps: any = { currentUser: currentUser };
            let authed:boolean = false; 


            if(!currentUser || !currentUser.me) {
                nextPage = `/login?next=${ctx.req.url}`;
                return { nextPage };
            }


            let authedUser = CurrentUser(userProps);
            if(permissions.team && permissions.team.length > 0){
                permissions.team.forEach((perm) => {
                    if(authedUser && authedUser.hasTeamPermission(teamSlug, perm)){
                        authed = true;
                    };
                });
            };

            if(permissions.global && permissions.global.length > 0){
                permissions.global.forEach((perm) => {
                    if(authedUser && authedUser.hasGlobalPermission(perm)){
                        authed = true;
                    }
                })
            }
            if(authed) {
                return { currentUser };
            } else {
                nextPage='/';
                return { nextPage };
            }
        }
        render(){
            return <C {...this.props}/>;
        }
    };
};