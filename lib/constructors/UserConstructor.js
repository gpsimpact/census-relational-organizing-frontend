import _ from "lodash";

export const CurrentUser = (props) => {
    if(props.currentUser && props.currentUser.me){
        return new UserObject(props.currentUser.me);
    }
    return null;
}

export class UserObject {

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
    hasGlobalPermission(perm){
        return _.includes(this.globalPermissions, perm)
    }

    hasTeamPermission(slug, perm){
        const teamPerms = _.find(this.teamPermissions, { team: {slug: slug }} );
        let permArray = [];
        if(teamPerms && teamPerms.permissions){
            permArray = teamPerms.permissions;
        }
        return _.includes(permArray, perm)
    }

    getTeamIDs(){
        let permsList = [];
        if(this.teamPermissions.length > 0){
            this.teamPermissions.map((perm, idx) => {
                if(perm.team && perm.team.id){
                    permsList.push(perm.team.id);
                }
            })
        }
        return permsList;
    }

}