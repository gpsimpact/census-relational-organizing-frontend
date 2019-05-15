export const TeamsWhere = [
    {
        value: "name",
        label: "Name",
        type: "StringWhere",
    },
    {
        value: "active",
        label: "Active Team",
        type: "BooleanWhere"
    },
    {
        value: "slug",
        label: "URL Path",
        type: "StringWhere"
    },
    {
        value: "teamPermissions",
        label: "Users",
        type: "TeamPermissionsWhere"
    },
    {
        value: "createdAt",
        label: "Created Date",
        type: "DateTimeWhere"
    }
]

export const TeamsSort = [
    {
        value: "id",
        label: "ID"
    },
    {
        value: "name",
        label: "Name",
    },
    {
        value: "createdAt",
        label: "Created Date",
    }
]