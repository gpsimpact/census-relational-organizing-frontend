import { gql } from "apollo-boost";

export const UPDATE_TEAM_ADMIN_MUTATION = gql`
    mutation updateTeamAdmin($id: String!, $input: UpdateTeamInput!){
        updateTeam(id: $id, input: $input){
            code
            success
            message
            item {
                id
                name
                slug
                description
            }
        }
    }
`;