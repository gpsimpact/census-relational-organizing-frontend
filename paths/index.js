export const PublicPaths = {
    register: '/register',
    profile: '/profile',
    teams: '/teams',
}

export const AdminPaths = {
    index: '/a',
    teams: {
        index: '/a/teams',
        create: '/a/teams/create',
        detail: '/a/teams/detail',
    },
    users: {
        index: '/a/users',
        create: '/a/users/create',
        detail: '/a/users/detail'
    },
    gtibs: {
        index:'/a/gtibs'
    },
    tibs:{
        questions: '/a/tibs/questions',
        actions: '/a/tibs/actions',
    },
    tasks: {
        index: '/a/tasks',
    }
}

export const DashPaths = {
    
    index: '/dash',
    vols: {
        index: '/dash/messengers',
        denied: '/dash/messengers/denied',
    },
    contacts: {
        index: '/dash/contacts',
        create: '/dash/contacts/create',
        detail: '/dash/contacts/detail',
        all: '/dash/contacts/all'
    },
    tibs:{
        questions: '/dash/tibs/questions',
        actions: '/dash/tibs/actions',
    },
    tasks: {
        index: '/dash/tasks',

    }
}