import { GET_TEAM_DASHBOARD_QUERY } from '../../components/Queries/TeamDash';

export const GetCurrentTeam = (apolloClient, teamID) => 
    apolloClient
    .query({
        query: GET_TEAM_DASHBOARD_QUERY,
        variables: {
            id: teamID
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
