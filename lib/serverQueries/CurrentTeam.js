import { GET_TEAM_DASHBOARD_QUERY } from '../../components/Queries/TeamDash';

export const GetCurrentTeam = (apolloClient, teamSlug) => 
    apolloClient
    .query({
        query: GET_TEAM_DASHBOARD_QUERY,
        variables: {
            slug: teamSlug
        }
    })
    .then(({ data }) => {
        if(data && data.team){
            return { currentTeam: data.team}
        }
        return { currentTeam: {}}
    })
    .catch((e) => {
        console.log('failing')
        console.log(e)
        return { currentTeam: {} }
    })
