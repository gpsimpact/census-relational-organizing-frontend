import _ from "lodash";
import { CurrentUserInterface } from '../interfaces/CurrentUserInterface';

export const CurrentUser = (props) => {
    if(props.currentUser && props.currentUser.me){
        return new UserObject(props.currentUser.me);
    }
    return null;
}

export class UserObject implements CurrentUserInterface {
    id: string;
    name: string;
    email: string;
    active: boolean;
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    zip5: string;
    phone: string;
    teamPermissions: any;
    globalPermissions: any;

    constructor(me){
        this.id = me.id;
        this.name = me.name;
        this.email = me.email;
        this.active = me.active;
        this.firstName = me.firstName;
        this.lastName = me.lastName;
        this.address = me.address;
        this.city = me.city;
        this.state = me.state;
        this.zip5 = me.zip5;
        this.phone = me.phone;
        this.teamPermissions = me.teamPermissions;
        this.globalPermissions = me.globalPermissions;
    }
    hasGlobalPermission(perm:string){
        return _.includes(this.globalPermissions, perm)
    }

    hasTeamPermission(slug:string, perm:string){
        const teamPerms: any = _.find(this.teamPermissions, { team: {slug: slug }} );
        console.log(teamPerms);
        let permArray: string[] = [];
        if(teamPerms && teamPerms.permissions){
            permArray = teamPerms.permissions;
        }
        return _.includes(permArray, perm)
    }

}