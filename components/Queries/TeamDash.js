import { gql } from "apollo-boost";

export const GET_TEAM_DASHBOARD_QUERY= gql`
    query getTeamDashboard($id: String, $slug: String){
        team(id:$id, slug:$slug){
            id
            name
            description
            active
            slug
            createdAt
            updatedAt
            userPermissionSummaryCounts{
                permission
                count
            }
        }
    }
`;
