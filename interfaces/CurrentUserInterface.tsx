

export interface CurrentUserInterface{
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
    hasGlobalPermission: any;
    hasTeamPermission: any;
}